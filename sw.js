// Repwerk Service Worker: macht die App offline-fähig.
// Bei jeder Änderung an den App-Dateien VERSION erhöhen, damit Handys das Update laden.
const VERSION = "repwerk-v7";
const CORE = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", (e) => {
  // cache:"reload" umgeht den Browser-Cache, damit eine neue Version wirklich die neuen Dateien bekommt
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: "reload" })))));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Schriften von Google: einmal laden, danach aus dem Cache (auch offline)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(VERSION + "-fonts").then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          c.put(req, res.clone());
          return res;
        } catch (err) {
          return new Response("", { status: 504 });
        }
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // App-Dateien: zuerst Cache, im Hintergrund aktualisieren
  e.respondWith(
    caches.open(VERSION).then(async (c) => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then((res) => {
        if (res.ok) c.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (hit) return hit;
      const res = await net;
      return res || (req.mode === "navigate" ? c.match("./index.html") : new Response("", { status: 504 }));
    })
  );
});
