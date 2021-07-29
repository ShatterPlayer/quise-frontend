const VERSION = '1'
const CACHE_NAME = `offline-${VERSION}`

self.addEventListener('install', function (evt) {
  console.log('Installing service worker')

  evt.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.add('/offline')
    }),
  )

  self.skipWaiting()
})

self.addEventListener('fetch', function (evt) {
  evt.respondWith(
    fetch(evt.request).catch(function () {
      return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match('/offline')
      })
    }),
  )
  caches.open(CACHE_NAME).then(function (cache) {
    return cache.add('/offline')
  })
})
