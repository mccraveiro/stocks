function getCacheName () {
  // We use this to invalidate the cache every 15min
  // as we can't use the date header because of cors

  const time = (Date.now() / (15 * 60 * 1000)).toFixed()
  return `alphavantage.co-${time}`;
}

function cleanupCaches () {
  const cacheName = getCacheName()

  const deleteKey = key =>
    key === cacheName ? Promise.resolve() : caches.delete(key)

  return caches
    .keys()
    .then(keys => Promise.all(keys.map(deleteKey)))
}

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');
});

self.addEventListener('activate', function (evt) {
  console.log('Service Worker activating.');
  evt.waitUntil(cleanupCaches())
});

self.addEventListener('fetch', function (evt) {
  if (evt.request.url.includes('chrome-extension')) {
    return
  }

  evt.respondWith(
    fromCache(evt.request)
      .catch(() => fromNetwork(evt.request))
  );
});

function fromCache (request) {
  if (!request.url.includes('alphavantage.co')) {
    return Promise.reject('not-using-cache')
  }

  return caches
    .open(getCacheName())
    .then(cache =>
      cache
        .match(request)
        .then(response => response || Promise.reject('no-match'))
    );
}


function fromNetwork (request) {
  return caches
    .open(getCacheName())
    .then(cache =>
      fetch(request)
        .then(response =>
          cache
            .put(request, response.clone())
            .then(() => response)
        )
    )
}
