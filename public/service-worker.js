self.addEventListener('install', function (evt) {
  console.log('Installing service worker')

  evt.waitUntil(
    caches.open('test').then(function (cache) {
      cache.add('/offline')
    }),
  )

  self.skipWaiting()
})

self.addEventListener('fetch', function (evt) {
  evt.respondWith(
    fetch(evt.request).catch(function () {
      return caches.open('test').then(function (cache) {
        return cache.match('/offline')
      })
    }),
  )
})
