const CACHE_NAME = 'birthday-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/script.js',
    '/Assets/Images/Scene2/Buddhu_Ki_Pyaari/1.jpeg',
    '/Assets/Images/Scene2/Buddhu_Ki_Pyaari/2.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
