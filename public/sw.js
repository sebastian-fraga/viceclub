const CACHE_VERSION = "1.4.3";
const CACHE_NAME = "viceclub-v" + CACHE_VERSION;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/assets/styles/styles.css",
                "/assets/fonts/GTAArtDecoMedium.ttf",
                "/assets/fonts/GTAArtDecoRegular.ttf",
                "/assets/images/main/backgrounds/background.webp",
                "/assets/images/main/backgrounds/background_III.webp",
                "/assets/images/main/boxarts/portada_III.webp",
                "/assets/images/icons/games/logos/III.webp",
                "/assets/images/main/backgrounds/background_VC.webp",
                "/assets/images/main/boxarts/portada_VC.webp",
                "/assets/images/icons/games/logos/VC.webp",
                "/assets/images/main/backgrounds/background_SA.webp",
                "/assets/images/main/boxarts/portada_SA.webp",
                "/assets/images/icons/games/logos/SA.webp",
                "/assets/images/main/backgrounds/background_LCS.webp",
                "/assets/images/main/boxarts/portada_LCS.webp",
                "/assets/images/icons/games/logos/LCS.webp",
                "/assets/images/main/backgrounds/background_VCS.webp",
                "/assets/images/main/boxarts/portada_VCS.webp",
                "/assets/images/icons/games/logos/VCS.webp",
                "/assets/images/main/backgrounds/background_IV.webp",
                "/assets/images/main/boxarts/portada_IV.webp",
                "/assets/images/icons/games/logos/IV.webp",
                "/assets/images/main/backgrounds/background_V.webp",
                "/assets/images/main/boxarts/portada_V.webp",
                "/assets/images/icons/games/logos/V.webp",
                "/assets/images/main/backgrounds/background_VI.webp",
                "/assets/images/main/boxarts/portada_VI.webp",
                "/assets/images/icons/games/logos/VI.webp",
            ]);
        }),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            ),
    );
    self.clients.claim();
});

self.addEventListener("message", async (event) => {
    if (event.data?.type === "GET_VERSION") {
        event.source?.postMessage({
            type: "CACHE_VERSION",
            version: CACHE_VERSION,
        });
    }
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    const accept = event.request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const clone = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, clone));
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(event.request);
                    return (
                        cached ||
                        new Response("Offline", {
                            status: 503,
                            statusText: "Offline",
                        })
                    );
                }),
        );
        return;
    }

    if (url.pathname.endsWith(".json")) {
        event.respondWith(
            fetch(event.request).catch(async () => {
                const cached = await caches.match(event.request);

                return (
                    cached ||
                    new Response("JSON offline", {
                        status: 503,
                        statusText: "Offline",
                    })
                );
            }),
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request)
                .then((response) => {
                    if (
                        !response ||
                        response.status !== 200 ||
                        response.type !== "basic"
                    ) {
                        return response;
                    }

                    const clone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });

                    return response;
                })
                .catch(() => {
                    return new Response("Offline", {
                        status: 503,
                        statusText: "Offline",
                    });
                });
        }),
    );
});
