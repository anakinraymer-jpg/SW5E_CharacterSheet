// Offline support. vite.config.ts fills in __FILES__ (every built file) and __VERSION__ (a hash of
// that list) and emits this as dist/sw.js. Installing saves the whole app in one cache; a new
// deploy gives a new version that waits until the page asks it to take over (the "Update
// available" banner), so an open sheet never mixes old and new files.
const VERSION = "97b189143993";
const CACHE = `sw5e-app-${VERSION}`;
const FILES = ["assets/CharacterSheet-88AEGJYJ.js","assets/enhancedItems-B8ESRYYc.js","assets/index-B1oD412c.js","assets/index-GxUSQiYC.css","favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(["./", ...FILES])));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("sw5e-app-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // Pages: always this version's saved copy, so they match its saved scripts (new versions arrive
  // through the update banner). Everything else: saved copy first, then the network.
  if (req.mode === "navigate") {
    event.respondWith(caches.open(CACHE).then((cache) => cache.match("./", { ignoreVary: true }).then((hit) => hit || fetch(req))));
    return;
  }
  // ignoreVary: the page's crossorigin script tags send an Origin header the saved copies lack.
  event.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)));
});
