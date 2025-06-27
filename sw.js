self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('reloj-cache').then(function(cache) {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './sw.js',
        './icon.png',
        './beep.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
