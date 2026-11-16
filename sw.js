// Guarda os arquivos do app para funcionar sem internet.
// Ao mudar qualquer arquivo do app, aumente o número da versão abaixo.
const CACHE = "coral-cidada-v1";
const ARQUIVOS = ["./", "index.html", "config.js", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(chaves => Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Rede primeiro (para pegar atualizações); sem internet, usa a cópia guardada.
  e.respondWith(
    fetch(req).then(resp => {
      const copia = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copia));
      return resp;
    }).catch(() => caches.match(req).then(r => r || caches.match("index.html")))
  );
});
