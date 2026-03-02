const CACHE_NAME = 'barista-training-v1';

// Assets to cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/images/logo.png',
    '/images/favicon.png',
    '/images/social-share.jpg',
    '/static/js/lesson.js',
    '/static/js/deeplink.js',
    '/js/schema.js'
];

// Cache static assets on install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Clean up old caches on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Handle requests
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cache successful responses
                if (response.ok) {
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, clonedResponse));
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(event.request)
                    .then(response => {
                        if (response) return response;

                        // Fallback content for lesson pages
                        if (event.request.url.includes('lesson.html')) {
                            return caches.match('/offline.html');
                        }

                        return new Response(
                            'Network error occurred. Please check your connection.',
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            }
                        );
                    });
            })
    );
});