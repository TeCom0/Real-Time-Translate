const CACHE_NAME = 'translate-app-v1';
const urlsToCache = [
  '/Real-Time-Translate/',
  '/Real-Time-Translate/index.html',
  '/Real-Time-Translate/src/main.jsx',
  '/Real-Time-Translate/src/App.jsx',
  '/Real-Time-Translate/src/index.css',
  '/Real-Time-Translate/src/services/SpeechService.js',
  '/Real-Time-Translate/src/services/TranslationService.js',
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