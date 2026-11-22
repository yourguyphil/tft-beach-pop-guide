// Tests the guide's pure logic (copy finder, board trait counts, instruments + empowered units).
// Usage: node tools/test-logic.mjs      (runs the //#region testable block of index.html)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const html = readFileSync(fileURLToPath(new URL("../index.html", import.meta.url)), "utf8");
const m = /\/\/#region testable[^\n]*\n([\s\S]*?)\/\/#endregion testable/.exec(html);
assert.ok(m, "testable region not found in index.html");
const api = new Function(m[1] + "\nreturn {PATCH,U,UK,I,copyOdds,traitCount,parseStage,BV,neighbors,instFor,empowered};")();
const { PATCH, UK, I, copyOdds, traitCount, parseStage, BV, neighbors, instFor, empowered } = api;

let n = 0;
const t = (name, fn) => { try { fn(); n++; } catch (e) { console.error("FAIL", name, "\n ", e.message); process.exitCode = 1; } };

/* ---- patch data sanity ---- */
t("odds rows sum to 100", () => Object.entries(PATCH.odds).forEach(([l, r]) => assert.equal(r.reduce((a, b) => a + b, 0), 100, "level " + l)));
t("Beach Pop breakpoints 3/5/7 with 1/2/2 instruments", () => { assert.deepEqual(PATCH.traits["Beach Pop"], [3, 5, 7]); assert.deepEqual([3, 5, 7].map(b => PATCH.bp[b].inst), [1, 2, 2]); });
t("parseStage", () => { assert.deepEqual(parseStage(" 4-2 "), [4, 2]); assert.equal(parseStage("4"), null); });
t("8 Beach Pop units, Taliyah is the only 5-cost", () => {
  const bp = Object.values(UK).filter(u => u.t.includes("Beach Pop"));
  assert.equal(bp.length, 8); assert.deepEqual(bp.filter(u => u.c === 5).map(u => u.k), ["taliyah"]);
});

/* ---- hex neighbors (odd rows shifted right) ---- */
t("neighbors even row", () => assert.deepEqual(neighbors(2, 5).map(x => x.join()).sort(), ["1,4", "1,5", "2,4", "2,6", "3,4", "3,5"]));
t("neighbors odd row", () => assert.deepEqual(neighbors(1, 4).map(x => x.join()).sort(), ["0,4", "0,5", "1,3", "1,5", "2,4", "2,5"]));
t("neighbors clip at edges", () => { assert.equal(neighbors(0, 0).length, 2); assert.equal(neighbors(3, 6).length, 2); assert.equal(neighbors(1, 3).length, 6); });
t("neighbors are symmetric", () => { for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) neighbors(r, c).forEach(([y, x]) => assert.ok(neighbors(y, x).some(([a, b]) => a === r && b === c), `${r},${c} ↔ ${y},${x}`)); });

/* ---- copy finder ---- */
t("copy finder 2★ Graves at 8", () => { const r = copyOdds({ cost: 4, level: 8, own: 1, seen: 0, taken: 0, target: 3 }); assert.equal(r.need, 2); assert.equal(r.left, 9); assert.ok(Math.abs(r.perShop - 5 * 0.30 * 9 / 219) < 1e-9); });
t("copy finder 3★ goal", () => assert.equal(copyOdds({ cost: 1, level: 5, own: 6, target: 9 }).need, 3));
t("copy finder impossible", () => assert.equal(copyOdds({ cost: 4, level: 8, own: 1, seen: 8, target: 3 }).enough, false));
t("copy finder clamps level + cost", () => { assert.ok(isFinite(copyOdds({ cost: 9, level: 12, own: 1 }).gold)); assert.equal(copyOdds({ cost: 4, level: 3, own: 1 }).perShop, 0); });

/* ---- boards ---- */
const B = id => BV.find(b => b.id === id);
const tc = id => Object.fromEntries(traitCount(B(id).cells.map(c => c[2])).map(x => [x.t, x]));
t("standard: Beach Pop 7, Juggernaut 2, Encore 2", () => { const x = tc("std"); assert.equal(x["Beach Pop"].on, 7); assert.equal(x.Juggernaut.on, 2); assert.equal(x.Encore.on, 2); });
t("Lvl 7 board already hits Beach Pop 7", () => { assert.equal(B("l7").lvl, 7); assert.equal(tc("l7")["Beach Pop"].on, 7); });
t("no Taliyah: Ashe keeps Beach Pop 7", () => assert.equal(tc("notal")["Beach Pop"].on, 7));
t("stage 3 board: Beach Pop 5 + Juggernaut 2 + Arcanist 2", () => { const x = tc("s3"); assert.equal(x["Beach Pop"].on, 5); assert.equal(x.Juggernaut.on, 2); assert.equal(x.Arcanist.on, 2); });
t("frontline: Frontman 2 + Arcanist 2", () => { const x = tc("front"); assert.equal(x.Frontman.on, 2); assert.equal(x.Arcanist.on, 2); });
t("high cap: Illbeats 2 + Frontman 2", () => { const x = tc("cap"); assert.equal(x.Illbeats.on, 2); assert.equal(x.Frontman.on, 2); });
t("boards: unit count = level, valid units/items/hexes, no overlaps", () => BV.forEach(b => {
  assert.equal(b.cells.length, b.lvl, b.id);
  const seen = new Set();
  b.cells.forEach(([r, c, u, st, its]) => { assert.ok(UK[u], u); assert.ok(r >= 0 && r < 4 && c >= 0 && c < 7); assert.ok(st >= 1 && st <= 3); assert.ok(its.length <= 3); its.forEach(i => assert.ok(I[i], i)); assert.ok(!seen.has(r + "-" + c), b.id + " overlap"); seen.add(r + "-" + c); });
}));
t("boards: instrument count matches Beach Pop, never on a unit", () => BV.forEach(b => {
  assert.equal(b.inst.length, instFor(b.cells), b.id);
  const occ = new Set(b.cells.map(c => c[0] + "-" + c[1]));
  b.inst.forEach(([r, c]) => assert.ok(!occ.has(r + "-" + c), b.id + " instrument on a unit"));
}));
t("boards: every item-holding Beach Pop carry touches an instrument", () => BV.forEach(b => {
  const e = empowered(b.cells, b.inst);
  b.cells.filter(c => c[4].length && UK[c[2]].t.includes("Beach Pop") && UK[c[2]].c >= 2 && c[2] !== "zac").forEach(c => assert.ok(e.bp.includes(c[2]), `${b.id}: ${c[2]} not empowered`));
}));
t("no Taliyah board: 1-4 costs already on instrument hexes (add a 5-cost to unlock)", () => assert.deepEqual(empowered(B("notal").cells, B("notal").inst).costs, [1, 2, 3, 4]));
t("every unit trait has breakpoints", () => Object.values(UK).forEach(u => u.t.forEach(tr => assert.ok(PATCH.traits[tr], tr))));

console.log(process.exitCode ? "\nSome tests failed." : `All ${n} tests passed.`);
