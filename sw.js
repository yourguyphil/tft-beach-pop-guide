// Auto-generated. Caches the whole site so it works offline once installed.
const PREFIX = "beach-pop-guide-";
const CACHE = PREFIX + "6889d2dfd4";
const PRECACHE = [
"./",
"index.html",
"manifest.json",
"favicon.ico",
"beach-pop-guide.pdf",
"assets/augments/ascension2.png",
"assets/augments/bodyguardstraining_ii.png",
"assets/augments/celestialblessing3.png",
"assets/augments/clearmind2.png",
"assets/augments/cybernetic-uplink-ii.png",
"assets/augments/cybernetic2.png",
"assets/augments/giantandmighty_iii.png",
"assets/augments/hedge-fund.png",
"assets/augments/knowledge-download-ii.png",
"assets/augments/late-game-specialist-i.png",
"assets/augments/levelup3.png",
"assets/augments/living-forge-iii.png",
"assets/augments/portableforge2.png",
"assets/augments/silver-spoon-i.png",
"assets/augments/soloplate_ii.png",
"assets/augments/tank-apprentice.png",
"assets/augments/thebaronslair_iii.png",
"assets/augments/tons-of-stats-ii.png",
"assets/augments/upwardmobility_iii.png",
"assets/icons/apple-touch-icon.png",
"assets/icons/favicon-16.png",
"assets/icons/favicon-32.png",
"assets/icons/favicon-48.png",
"assets/icons/icon-192.png",
"assets/icons/icon-256-rounded.png",
"assets/icons/icon-512.png",
"assets/icons/icon-maskable-512.png",
"assets/instruments/maracas.png",
"assets/instruments/ukelele.png",
"assets/items/adaptivehelm.png",
"assets/items/archangelsstaff.png",
"assets/items/bfsword.png",
"assets/items/bloodthirster.png",
"assets/items/bluebuff.png",
"assets/items/bramblevest.png",
"assets/items/chainvest.png",
"assets/items/crownguard.png",
"assets/items/deathblade.png",
"assets/items/dragonsclaw.png",
"assets/items/frozenheart.png",
"assets/items/fryingpan.png",
"assets/items/gargoylestoneplate.png",
"assets/items/giantsbelt.png",
"assets/items/guardianangel.png",
"assets/items/guinsoosrageblade.png",
"assets/items/hextechgunblade.png",
"assets/items/infinityedge.png",
"assets/items/ionicspark.png",
"assets/items/jeweledgauntlet.png",
"assets/items/krakenslayer.png",
"assets/items/lastwhisper.png",
"assets/items/leviathan.png",
"assets/items/madredsbloodrazor.png",
"assets/items/morellonomicon.png",
"assets/items/needlesslylargerod.png",
"assets/items/negatroncloak.png",
"assets/items/nightharvester.png",
"assets/items/powergauntlet.png",
"assets/items/quicksilver.png",
"assets/items/rabadonsdeathcap.png",
"assets/items/rapidfirecannon.png",
"assets/items/recurvebow.png",
"assets/items/redbuff.png",
"assets/items/sparringgloves.png",
"assets/items/spatula.png",
"assets/items/spearofshojin.png",
"assets/items/spectralgauntlet.png",
"assets/items/spiritvisagerr.png",
"assets/items/steraksgage.png",
"assets/items/tearofthegoddess.png",
"assets/items/thiefsgloves.png",
"assets/items/titansresolve.png",
"assets/items/unstableconcoction.png",
"assets/items/voidstaff.png",
"assets/items/warmogsarmor.png",
"assets/resources/dpei-reroll.jpg",
"assets/resources/ripple-reroll.jpg",
"assets/resources/tftacademy-items.jpg",
"assets/traits/arcanist.svg",
"assets/traits/beachpop.svg",
"assets/traits/choreographer.svg",
"assets/traits/encore.svg",
"assets/traits/frontman.svg",
"assets/traits/illbeats.svg",
"assets/traits/ionicspark.svg",
"assets/traits/juggernaut.svg",
"assets/traits/renegade.svg",
"assets/traits/rock.svg",
"assets/traits/swiftstriker.svg",
"assets/units/annie.webp",
"assets/units/ashe.webp",
"assets/units/aurora.webp",
"assets/units/graves.webp",
"assets/units/illaoi.webp",
"assets/units/renekton.webp",
"assets/units/swain.webp",
"assets/units/syndra.webp",
"assets/units/taliyah.webp",
"assets/units/taric.webp",
"assets/units/yuumi.webp",
"assets/units/zac.webp",
"assets/units/zoe.webp",
"assets/units-sq/annie.png",
"assets/units-sq/ashe.png",
"assets/units-sq/aurora.png",
"assets/units-sq/graves.png",
"assets/units-sq/illaoi.png",
"assets/units-sq/renekton.png",
"assets/units-sq/swain.png",
"assets/units-sq/syndra.png",
"assets/units-sq/taliyah.png",
"assets/units-sq/taric.png",
"assets/units-sq/yuumi.png",
"assets/units-sq/zac.png",
"assets/units-sq/zoe.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k.startsWith(PREFIX)).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Page: network first (fresh content), fall back to cache offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { caches.open(CACHE).then(c => c.put("index.html", r.clone())); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Everything else (images, fonts): cache first, then network + store.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
