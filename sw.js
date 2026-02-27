// const CACHE_NAME = "viceclub-v4";

// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(cache => {
//             return cache.addAll([
//                 "/",
//                 "/index.html",
//                 "./assets/styles/styles.css",
//             ]);
//         })
//     );
//     self.skipWaiting(); 
// });

// self.addEventListener("activate", event => {
//     event.waitUntil(
//         caches.keys().then(keys =>
//             Promise.all(
//                 keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)) 
//             )
//         )
//     );
//     self.clients.claim();
// });

// self.addEventListener("fetch", event => {
//     const url = new URL(event.request.url);

//     if (event.request.headers.get("accept").includes("text/html")) {
//         event.respondWith(
//             fetch(event.request)
//                 .then(response => {
//                     const clone = response.clone();
//                     caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
//                     return response;
//                 })
//                 .catch(() => caches.match(event.request)) 
//         );
//         return;
//     }
//     if (url.pathname.endsWith(".json")) {
//         event.respondWith(fetch(event.request));
//         return;
//     }
//     event.respondWith(
//         caches.match(event.request).then(response => response || fetch(event.request))
//     );
// });