/**
 * Prefetch de las islas de Astro.
 *
 * El prefetch nativo de Astro (activo por defecto con <ClientRouter />)
 * solo calienta el HTML del destino: los chunks JS de las islas se
 * descargan DESPUES del swap, y eso es lo que ralentiza la navegacion
 * (~540 ms de los ~713 ms que costaba cambiar de pagina).
 *
 * Aqui se hace el pre-fetch completo: al pasar el raton por encima de un
 * enlace interno se descarga el HTML del destino, se parsea y se insertan
 * <link rel="modulepreload"> para cada isla, de forma que el import()
 * dinamico que hace Astro al hidratar resuelve desde el module map y no
 * tiene que volver a la red.
 *
 * Sustituye al prefetch de Astro (prefetch: false en astro.config.mjs) para
 * no descargar el HTML dos veces.
 */

const HOVER_DELAY_MS = 300;
const SAME_PATH_MAX_AGE_MS = 5 * 60 * 1000;

const preloadedChunks = new Set<string>();
const prefetchedPaths = new Map<string, number>();
const timers = new Map<string, number>();
const inFlight = new Set<string>();

function isInternalLink(link: HTMLAnchorElement): boolean {
    if (link.origin !== location.origin) return false;
    if (link.hasAttribute("download")) return false;

    const protocol = link.protocol;
    if (protocol !== "http:" && protocol !== "https:") return false;

    return true;
}

function shouldSkip(link: HTMLAnchorElement): boolean {
    if (link.dataset.astroPrefetch === "false") return true;
    if (link.dataset.astroPrefetch === "off") return true;
    if (!isInternalLink(link)) return true;

    const url = new URL(link.href);
    if (url.pathname === location.pathname && !url.hash) return true;

    return false;
}

function isSlowConnection(): boolean {
    const connection = (
        navigator as Navigator & {
            connection?: {
                saveData?: boolean;
                effectiveType?: string;
            };
        }
    ).connection;

    if (!connection) return false;
    if (connection.saveData) return true;

    return (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
    );
}

function preloadChunk(url: string) {
    if (preloadedChunks.has(url)) return;

    preloadedChunks.add(url);

    const link = document.createElement("link");
    link.rel = "modulepreload";
    link.href = url;
    document.head.appendChild(link);
}

async function prefetchIslands(href: string) {
    if (inFlight.has(href)) return;

    inFlight.add(href);

    try {
        const response = await fetch(href, { priority: "low" });

        if (!response.ok) return;

        const html = await response.text();
        const parsed = new DOMParser().parseFromString(html, "text/html");

        for (const island of parsed.querySelectorAll(
            "astro-island[component-url]",
        )) {
            const componentUrl = island.getAttribute("component-url");
            if (!componentUrl) continue;

            preloadChunk(new URL(componentUrl, location.href).href);
        }
    } catch {
        // El prefetch es una optimizacion: si falla, la navegacion normal
        // se encarga de descargar lo que falte.
    } finally {
        inFlight.delete(href);
    }
}

function schedulePrefetch(link: HTMLAnchorElement) {
    if (shouldSkip(link)) return;
    if (isSlowConnection()) return;

    const href = link.href;
    const cachedAt = prefetchedPaths.get(href);

    if (cachedAt !== undefined && Date.now() - cachedAt < SAME_PATH_MAX_AGE_MS) {
        return;
    }

    const existing = timers.get(href);
    if (existing !== undefined) {
        window.clearTimeout(existing);
    }

    timers.set(
        href,
        window.setTimeout(() => {
            timers.delete(href);
            prefetchedPaths.set(href, Date.now());
            void prefetchIslands(href);
        }, HOVER_DELAY_MS),
    );
}

function findLink(target: EventTarget | null): HTMLAnchorElement | null {
    if (!(target instanceof Element)) return null;

    const link = target.closest("a");
    return link instanceof HTMLAnchorElement ? link : null;
}

function init() {
    if (!navigator.onLine) return;

    document.addEventListener("pointerover", (event) => {
        const link = findLink(event.target);
        if (link) schedulePrefetch(link);
    });

    document.addEventListener("focusin", (event) => {
        const link = findLink(event.target);
        if (link) schedulePrefetch(link);
    });

    document.addEventListener("pointerdown", (event) => {
        const link = findLink(event.target);
        if (!link || shouldSkip(link)) return;

        const existing = timers.get(link.href);
        if (existing !== undefined) {
            window.clearTimeout(existing);
            timers.delete(link.href);
        }

        void prefetchIslands(link.href);
    });
}

init();
