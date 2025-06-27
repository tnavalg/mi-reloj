self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open('reloj-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './sw.js',
        './icon.png',
        './beep.mp3'
      ]);
    })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== 'reloj-cache') {
            return caches.delete(key);
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