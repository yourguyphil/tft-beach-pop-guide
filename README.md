# Beach Pop Fast 8 Guide · TFT Set 19

An illustrated playbook for **Beach Pop** as a **fast 8** comp in Teamfight Tactics Set 19 *Prismatic Tour* (PBE, Nov 2026; live with patch 19.1 around Dec 2). No rerolling: level on schedule, roll down at Lvl 8. Built with the `tft-force-guide` skill.

**The system:** econ to 50, Lvl 6 at 3-2, Lvl 7 at 4-1, **Lvl 8 at 4-2 and roll down** for 2★ Graves + 2★ Zac. Items pick the carry:
- **AD items → Graves** (preferred): Bloodthirster · Titan's Resolve · Sterak's Gage (backup Quicksilver)
- **AP / Tear items → Syndra** (JG · Void Staff · Blue Buff), then **Taliyah** at 8–9 (JG · Shojin · Rabadon's, backup Morello)
- **Tank → Zac**: Gargoyle Stoneplate · Warmog's · Spirit Visage (backup Dragon's Claw)
- Final board: Beach Pop 7 (Taric, Zoe, Renekton, Syndra, Graves, Zac, Taliyah) + Yuumi; Lvl 9 adds Illaoi.

## What's on the page
- **Quick reference:** rules, unlock path (Ashe → Syndra → Zac → Taliyah, each with earliest / aim / how / common mistake), instruments, Beach Pop breakpoints, units, stage plan + **checkpoints** at 3-2, 4-1, 4-2, 5-1, **When the plan breaks**, six final boards (stage 3 → Lvl 9) with instruments drawn on the board, computed trait counts and who's empowered, Item Cheat Sheet, Quick Ref dock
- **Decision tools:** Item Advisor (main-carry toggle + **What am I missing?**), augments by stage (2-1 / 3-2 / 4-2) with take/avoid, positioning by matchup
- **Learn + review:** shop odds + pool, copy finder (2★ or 3★ goal), instruments, contests, Beach Pop emblems, when to go Lvl 9, Top Cut mindset, **Match log** (localStorage, JSON/CSV export + import)
- **Golden Rules** at the bottom: item, rolling and tempo advice from Frodan (TFT Academy), dpei and Ripple (TFT Academy), each tied to this comp

## Patch numbers + tests
Patch-sensitive numbers (shop odds, pool sizes, Beach Pop instrument numbers, unlock counts, trait breakpoints) live in one `PATCH` object in `index.html`. Change them there; every section reads from it.

```bash
node tools/test-logic.mjs   # hex neighbors, instruments + empowered units, board trait counts, copy finder
```

## Rebuild
```bash
python tools/build-pdf.py          # print/outline.md -> beach-pop-guide.pdf (4 pages)
python tools/build-sw.py .         # offline cache list (rerun after any change)
python tools/build-standalone.py . # beach-pop-guide.html, one file with every image embedded
python tools/build-icons.py . --carry graves --tank zac --glyph tools/beachpop-glyph.png --colors 3ff0c8 ff8a5b --carry-align 1.0
```

## Live site
Live at **https://yourguyphil.github.io/tft-beach-pop-guide/**: every push to `main` redeploys it. On your phone: Share → Add to Home Screen (iPhone) or ⋮ → Install app (Android).

## Sources
Checked Nov 22 2026:
- **Board + items + stats** (B tier, Consistent, 4.09 avg, 59.3% top 4): tft.ninja PBE comps, "Vertical Beach Pop (Taliyah)"
- **Units, traits, abilities, augments:** tft.ninja Set 19 pages (Riot Dev Drop, Nov 15 2026)
- **Beach Pop numbers** (2% HP / 3s, +25/40% AS, 5/8 Mana, breeze 20% + 40 Mana / 10s) and **unlocks** (Ashe 2 items, Zac Lvl 7 + 5 unique): tftflow (patch 19.1b)
- **Leveling** (4 at 2-1, 5 at 2-5, 6 at 3-2, 7 at 4-1, 8 at 4-2), traits 7 Beach Pop + 2 Juggernaut/Illbeats/Frontman/Encore, carousel parts: Mobalytics (search snippets; the page blocks automated fetches)
- **Openers, flex units (Swain, Illaoi, Aurora), Portable Forge, 679-game stats:** Blitz "Beach Pop Zac" (5.13 avg, 36% top 4: weaker than the Taliyah version)
- **Alt items** (Graves Hand of Justice / Quicksilver, Taliyah Void Staff / Morello): TFT Academy "Beach Rock" (C tier, marked out of meta) and "Beach Spark" (B)
- **Taliyah unlock** "1- to 5-cost on Beach Pop hexes": Mobalytics + MetaTFT wording

**My heuristics, not sourced:** HP/gold lines in the checkpoints, instrument placement, positioning by matchup, augment take/avoid notes, Ashe/Annie as item holders.
**Not published yet / my reading:** Syndra's exact unique-star-level count; that "Beach Pop hexes" means the hexes next to an instrument; what each instrument type does differently.

[tft.ninja PBE comps](https://tft.ninja/comps?e=pbe) · [Beach Pop trait](https://tft.ninja/sets/19/traits/beach-pop) · [tftflow Beach Pop table](https://tftflow.com/tables/set19/beach-pop) · [tftflow unlocks](https://tftflow.com/how-to-unlock-every-champion-set19) · [Mobalytics · Beach Pop](https://mobalytics.gg/tft/set19/comps-guide/beach-pop-3M8vzHDzFfxdXftyX1QdRXgHMYu) · [Blitz · Beach Pop Zac](https://app.blitz.gg/tft/set19/comps/c_lmn4ss6z) · [TFT Academy · Beach Rock](https://tftacademy.com/tierlist/comps/set-19-beach-rock)
