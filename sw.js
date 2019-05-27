let myCache = 'site-cache-v1';

let myArray = [
  'https://bainsnavneet.github.io/Restaurant-Review/',
  'https://bainsnavneet.github.io/Restaurant-Review/restaurant.html',
  'https://bainsnavneet.github.io/Restaurant-Review/css/styles.css',
  'https://bainsnavneet.github.io/Restaurant-Review/css/myStyles.css',
  'https://bainsnavneet.github.io/Restaurant-Review/data/restaurants.json',
  'https://bainsnavneet.github.io/Restaurant-Review/img/1.jpg',
  'https://bainsnavneet.github.io/Restaurant-Review/img/2.jpg',
  'https://bainsnavneet.github.io/Restaurant-Review/img/3.jpg',
  'https://bainsnavneet.github.io/Restaurant-Review/img/4.jpg',
  'https://bainsnavneet.github.io/Restaurant-Review/manifest.json',
  'https://bainsnavneet.github.io/Restaurant-Review/js/dbhelper.js',
  'https://bainsnavneet.github.io/Restaurant-Review/js/main.js',
  'https://bainsnavneet.github.io/Restaurant-Review/js/restaurant_info.js',
  'https://bainsnavneet.github.io/Restaurant-Review/service-worker.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(myCache).then((cache) => {
      return cache.addAll(myArray)
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((myCache) => {

      return Promise.all(
        myCache.filter((myCache) => {
          return myCache.startsWith('my-cache') &&
            myCache != myCache;
        }).map((myCache) => {
          return cache.delete(myCache);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(myCache).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        })
      });
    })
  );
});
