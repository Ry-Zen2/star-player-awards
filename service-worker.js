const CACHE = "blacfox-starplayer-v2";
const ASSETS = ["./","index.html","logo.png","manifest.json","blacfox-watermark.png","404.html"];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e=>{
  const req = e.request;
  // network-first for HTML, cache-first for others
  if(req.mode === "navigate"){
    e.respondWith(fetch(req).catch(()=>caches.match("index.html")));
  }else{
    e.respondWith(caches.match(req).then(res=>res || fetch(req)));
  }
});
