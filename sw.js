const CACHE_NAME = "jobcraft-v2"; // version incrémentée pour forcer le remplacement
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
];

// Install: cache all static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => console.warn("Could not cache:", url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: ne jamais intercepter les appels dynamiques
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ✅ Laisser passer sans interception :
  // - Appels au proxy Netlify (/.netlify/functions/...)
  // - Appels directs à Anthropic
  // - Toutes les requêtes POST (jamais de cache sur les POST)
  if (
    url.pathname.startsWith("/.netlify/") ||
    url.hostname === "api.anthropic.com" ||
    event.request.method !== "GET"
  ) {
    return; // le navigateur gère normalement, sans interception
  }

  // Cache-first pour les assets statiques (GET uniquement)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => {
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      });
    })
  );
});
