importScripts('version.js');
const V = 'releve-' + self.APP_VERSION, EXT = 'releve-ext';
const CORE = ['./', 'index.html', 'signalsmith-stretch.js', 'version.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(V).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' }))))
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('releve-') && k !== V && k !== EXT).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {            // l'application : cache d'abord (version installée)
    e.respondWith(caches.match(r, { ignoreSearch: true }).then(m => m || fetch(r)));
  } else if (u.hostname === 'surikov.github.io') { // lecteur et instruments WebAudioFont : mis en cache à la première utilisation
    e.respondWith(caches.open(EXT).then(async c => {
      const m = await c.match(r.url);
      if (m) return m;
      try { const x = await fetch(r.url, { mode: 'cors' }); if (x.ok) c.put(r.url, x.clone()); return x; }
      catch (_) { return fetch(r); }
    }));
  }
});
