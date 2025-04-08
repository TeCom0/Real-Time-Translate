const s = "translate-app-v1", t = [
  "/Real-Time-Translate/",
  "/Real-Time-Translate/index.html",
  "/Real-Time-Translate/src/main.jsx",
  "/Real-Time-Translate/src/App.jsx",
  "/Real-Time-Translate/src/index.css",
  "/Real-Time-Translate/src/services/SpeechService.js",
  "/Real-Time-Translate/src/services/TranslationService.js",
  "/Real-Time-Translate/manifest.json"
];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(s).then((a) => a.addAll(t))
  );
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((a) => a || fetch(e.request))
  );
});
//# sourceMappingURL=sw.js.map
