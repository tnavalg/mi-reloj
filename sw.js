self.addEventListener('install', function(event) {
  self.skipWaiting();
  const CACHE_NAME = 'reloj-cache-v3';
  const urlsToCache = [
    './index.html',
    './manifest.json',
    './sw.js',
    './icon.png',
    './beep.mp3'
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  const CACHE_NAME = 'reloj-cache-v3';
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('reloj-cache')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});