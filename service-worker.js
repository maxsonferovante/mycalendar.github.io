var CACHE_NAME = 'MyCalendar-v1';
var urlsToCache = [
  'index.html',
  
  'styles/main.css',
  
  'scripts/main.js',
  'scripts/jquery.min.js',
  'scripts/calendar.js',
  
  'images/icon/icon-256x256.png'
];

self.addEventListener('install', function(event) {
  // perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
