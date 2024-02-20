const CACHE_NAME = `feb-19-updates`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      "error.html",
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const request = event.request;

    if (request.method === 'GET') {
      // Check if the resource is in the cache.
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        // Return the cached response if found.
        return cachedResponse;
      } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(request);

          return fetchResponse;
        } catch (e) {
          // The network failed, you can handle this error as needed.
          // For example, you can redirect to an error page.
          return caches.match('error.html');
        }
      }
    } else {
      // For non-GET requests, you can handle them differently or skip caching.
      // Here, we're just passing the request through to the network.
      return fetch(request);
    }
  })());
});
