const CACHE_VERSION = "1.6.4";
const CACHE_NAME = "viceclub-v" + CACHE_VERSION;

const assets = [
    "/",
    "/index.html",
    "/assets/styles/styles.css",
    "/assets/styles/games/III.css",
    "/assets/styles/games/VC.css",
    "/assets/styles/games/SA.css",
    "/assets/styles/games/LCS.css",
    "/assets/styles/games/VCS.css",
    "/assets/styles/games/IV.css",
    "/assets/styles/games/V.css",
    "/assets/styles/games/VI.css",
    "/assets/fonts/GTAArtDecoMedium.woff2",
    "/assets/fonts/GTAArtDecoRegular.woff2",
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
    "/assets/lang/es.json",
    "/assets/lang/en.json",
    "/assets/lang/fr.json",
    "/assets/lang/pt.json",
];

self.addEventListener("install", (event) => {
    console.log("[SW] installing");

    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);

                for (const asset of assets) {
                    try {
                        await cache.add(asset);
                        console.log("[SW] OK", asset);
                    } catch (e) {
                        console.error("[SW] FAIL", asset, e);
                    }
                }
            } catch (e) {
                console.error("[SW] INSTALL ERROR", e);
            }
        })(),
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

self.addEventListener("message", (event) => {
    if (event.data?.type === "GET_VERSION") {
        event.source?.postMessage({
            type: "CACHE_VERSION",
            version: CACHE_VERSION,
        });
    }
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return;
    }

    const accept = request.headers.get("accept") || "";

    if (accept.includes("text/html")) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
                    });

                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request);

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

    if (url.pathname.startsWith("/assets/lang/")) {
        event.respondWith(
            caches.match(request).then((cached) => cached || fetch(request)),
        );
        return;
    }

    if (url.pathname.endsWith(".json") || url.hostname.includes("s3")) {
        event.respondWith(
            fetch(request).catch(async () => {
                const cached = await caches.match(request);
                return cached || new Response("JSON offline", { status: 503 });
            }),
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;

            return fetch(request)
                .then((response) => {
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    const clone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
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
