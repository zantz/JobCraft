// JobCraft Service Worker v4 — cache désactivé pour index.html
const CACHE_NAME = "jobcraft-v4";

// Installation — ne cache QUE les assets statiques, jamais index.html
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled([
        cache.add("/icons/icon-192.png"),
        cache.add("/icons/icon-512.png"),
        cache.add("/manifest.json"),
      ])
    ).then(() => self.skipWaiting())
  );
});

// Activation — supprime tous les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch — ne jamais intercepter, tout passe par le réseau
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Laisse toujours passer : Netlify functions, API, POST, et index.html
  if (
    url.pathname.startsWith("/.netlify/") ||
    url.hostname === "api.anthropic.com" ||
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    event.request.method !== "GET"
  ) {
    return; // navigateur gère directement, pas de cache
  }

  // Cache uniquement les icônes et manifest
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
