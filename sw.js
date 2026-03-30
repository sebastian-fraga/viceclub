const CACHE_VERSION = "1.0";
const CACHE_NAME = "viceclub-v" + CACHE_VERSION;

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/assets/styles/styles.css",
                "./assets/fonts/GTAArtDecoMedium.ttf",
                "./assets/fonts/GTAArtDecoRegular.ttf",
                "./assets/images/main/background.webp",
                "./assets/images/main/background_III.webp",
                "./assets/images/main/portada_III.webp",
                "./assets/images/main/background_VC.webp",
                "./assets/images/main/portada_VC.webp",
                "./assets/images/main/background_SA.webp",
                "./assets/images/main/portada_SA.webp",
                "./assets/images/main/background_LCS.webp",
                "./assets/images/main/portada_LCS.webp",
                "./assets/images/main/background_VCS.webp",
                "./assets/images/main/portada_VCS.webp",
                "./assets/images/main/background_IV.webp",
                "./assets/images/main/portada_IV.webp",
                "./assets/images/main/background_V.webp",
                "./assets/images/main/portada_V.webp",
                "./assets/images/main/background_VI.webp",
                "./assets/images/main/portada_VI.webp",
                "./assets/images/main/III.webp",
                "./assets/images/main/VC.webp",
                "./assets/images/main/SA.webp",
                "./assets/images/main/LCS.webp",
                "./assets/images/main/VCS.webp",
                "./assets/images/main/IV.webp",
                "./assets/images/main/V.webp",
                "./assets/images/main/VI.webp",
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);


    const accept = event.request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    if (url.pathname.endsWith(".json")) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            });
        })
    );
});