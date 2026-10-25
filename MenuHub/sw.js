const CACHE_VERSION = 'menuhub-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Pre-cache the shell on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Clean old caches on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for HTML, stale-while-revalidate for CDN assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin Firebase/analytics
  if (request.method !== 'GET') return;
  if (url.hostname.includes('firebaseio') || url.hostname.includes('googleapis.com/identitytoolkit')) return;

  // HTML pages: network first, fall back to cache
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // CDN assets (fonts, CSS, JS): stale-while-revalidate
  event.respondWith(
    caches.match(request).then(cached => {
      const fetching = fetch(request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => cached);

      return cached || fetching;
    })
  );
});
