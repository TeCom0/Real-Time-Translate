const CACHE_NAME = 'translate-app-v1';
const urlsToCache = [
  '/Real-Time-Translate/',
  '/Real-Time-Translate/index.html',
  '/Real-Time-Translate/assets/index.js',
  '/Real-Time-Translate/assets/index.css',
  '/Real-Time-Translate/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
}); 