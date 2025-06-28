self.addEventListener('install', function(event) {
  const CACHE_NAME = 'reloj-cache-v3'; // Incrementa este número cada vez que actualices la app
  const urlsToCache = [
    './index.html',
    './manifest.json',
    './sw.js',
    './icon.png',
    './beep.mp3'
  ];

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('Failed to open cache or add URLs:', error);
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

self.addEventListener('activate', function(event) {
  const CACHE_NAME = 'reloj-cache-v3'; // Asegúrate de que coincida con el nombre de la caché en 'install'
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Elimina cachés antiguas que no sean la actual y que comiencen con 'reloj-cache'
          if (cacheName !== CACHE_NAME && cacheName.startsWith('reloj-cache')) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
