const CACHE_NAME = 'oghub-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/data.js',
  '/manifest.json',
  // Tailwind is loaded via CDN so it's not cached here (but pages still render)
];

// Install - cache shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

// Activate - cleanup
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

// Fetch - cache-first for navigation and assets
self.addEventListener('fetch', (e) => {
  const req = e.request;
  // For navigation, try network first then fallback to cache then offline fallback
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return res;
      }).catch(()=> caches.match('/index.html'))
    );
    return;
  }

  // For other requests - respond from cache, else network and cache
  e.respondWith(
    caches.match(req).then(cached => {
      if(cached) return cached;
      return fetch(req).then(res => {
        if(!res || res.status !== 200 || res.type === 'opaque') return res;
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy));
        return res;
      }).catch(()=> caches.match('/index.html'))
    })
  );
});