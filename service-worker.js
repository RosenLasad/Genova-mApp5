// service-worker.js
const CACHE_NAME = "genova-mapp-2026-11-17-documentario-31";
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

  // La sala del documentario richiede rete: non memorizzare pagina o risorse
  // nella cache della mappa, né mostrare la mappa al posto della sala offline.
  if (url.pathname === "/storiedigenova" || url.pathname.startsWith("/storiedigenova/")) {
    if (req.mode === "navigate") {
      event.respondWith(fetch(req).catch(() => new Response(
        '<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Storie di Genova · Connessione richiesta</title><body style="font:20px/1.6 system-ui;padding:8vw;background:#10292e;color:#f3ead8"><h1>Collegati a Internet</h1><p>Per accedere al documentario e collegare la TV serve una connessione. Ricarica la pagina quando sei online.</p><a style="color:#e9bf73" href="/">Torna a Genova mApp</a></body></html>',
        {status:503, headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}}
      )));
    }
    return;
  }

  // Ogni altra pagina HTML ha la propria copia offline. Solo la vera Home
  // aggiorna la voce "/": giochi e altre pagine non possono sostituirla.
  if (req.mode === "navigate") {
    const navigationKey = url.pathname === "/" || url.pathname === "/index.html"
      ? OFFLINE_URL : url.pathname;
    event.respondWith((async () => {
      try {
        const response = await fetch(req);
        if (response.ok && response.type !== "opaque") {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(navigationKey, response.clone());
        }
        return response;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(navigationKey)) || Response.error();
      }
    })());
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
