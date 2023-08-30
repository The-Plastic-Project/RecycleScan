const CACHE_NAME = `recyclescan-v0`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/html/home.html',
      '/html/login.html',
      '/html/scan.html',
      '/html/error.html',
      '/js/auth.js',
      '/js/detect.js',
      '/js/main.js',
      '/js/track.js',
      '/js/webcam.js',
      'app.auth.js',
      '/imgs/arrow.png',
      '/imgs/bin-icon.png',
      '/imgs/box-graphic.png',
      '/imgs/check-icon.png',
      '/imgs/fake-img.png',
      '/imgs/filled-check-icon.png',
      '/imgs/gold-graphic.png',
      '/imgs/hammer-icon.png',
      '/imgs/highlight-box.png',
      '/imgs/leaf.png',
      '/imgs/log-icon.png',
      '/imgs/log-in-lg.png',
      '/imgs/logo.png',
      '/imgs/map.png',
      '/imgs/metal-graphic.png',
      '/imgs/plastic-graphic.png',
      '/imgs/robot-graphic.png',
      '/imgs/sign-up-lg.png',
      '/imgs/silver-graphic.png',
      '/imgs/take-img-button.png',
      '/imgs/verify-lg.png',
      '/imgs/homegrown.jpeg',
      '/imgs/maria-cleaning-bg.jpg',
      '/imgs/maria-cleaning-logo.jpg',
      '/imgs/metamorphic-logo.png',
      '/imgs/metamorphic.jpeg',
      '/imgs/mimis-logo.jpeg',
      '/imgs/mimis.jpeg',
      '/imgs/PCC-bg.jpg',
      '/imgs/PCC-logo.png',
      '/imgs/tamales-logo.png',
      '/imgs/tamales.jpeg',
      '/imgs/zoka-coffee-bg.jpg',
      '/imgs/zoka-coffee-logo.jpg'
    ]);
  })());
});


self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // The network failed.
        window.location.href = "error.html";
      }
    }
  })());
});