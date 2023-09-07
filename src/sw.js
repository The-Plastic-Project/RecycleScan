const CACHE_NAME = `recyclescan-v0`;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Add your initial resources to the cache here
    cache.addAll([
      // Add your list of resources to cache
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

          // Save the resource in the cache and return it.
          // cache.put(request, fetchResponse.clone());
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
