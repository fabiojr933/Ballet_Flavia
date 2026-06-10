const CACHE_NAME = 'ballet-app-v1';

// Instala o Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Ativa o Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Intercepta as requisições (obrigatório para o PWA funcionar)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});