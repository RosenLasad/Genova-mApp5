// service-worker.js
const CACHE_NAME = "genova-mapp-2026-08-12-heritage-cards-24";
const OFFLINE_URL = "/";

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// helpers
function networkFirst(req){
  return caches.open(CACHE_NAME).then(cache =>
    fetch(req).then(resp => {
      if (resp && resp.ok) cache.put(req, resp.clone());
      return resp;
    }).catch(() =>
      cache.match(req).then(cached => cached || Response.error())
    )
  );
}

function staleWhileRevalidate(req){
  return caches.open(CACHE_NAME).then(cache =>
    cache.match(req).then(cached => {
      const fetchPromise = fetch(req).then(resp => {
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      }).catch(() => cached || Response.error());

      // se ho cache, rispondo subito; intanto aggiorno in background
      return cached || fetchPromise;
    })
  );
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Ignora domini esterni (tile mappe, font, ecc.)
  if (url.origin !== self.location.origin) return;

  // Login, sessioni e future API utente non devono mai entrare nella cache PWA.
  if (url.pathname.startsWith("/.netlify/identity/") ||
      url.pathname.startsWith("/.netlify/functions/")) return;

  // NON cacheare i video (sennò ti riempi la cache e poi piangi)
  if (url.pathname.match(/\.(mp4|webm|mov)$/i)) return;

  // Navigazioni (HTML): network-first con fallback alla home
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(OFFLINE_URL, copy));
          return response;
        })
        .catch(() =>
          caches.match(OFFLINE_URL).then(resp => resp || Response.error())
        )
    );
    return;
  }

  // Strategia per tipo risorsa
  const dest = req.destination; // 'script','style','image','font', ecc.

  if (dest === "script" || dest === "style") {
    event.respondWith(networkFirst(req));
    return;
  }

  if (dest === "image") {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // fallback: stale-while-revalidate anche per altri asset leggeri
  event.respondWith(staleWhileRevalidate(req));
});
