const preloaded = new Set<string>();
const pending = new Set<string>();

interface PreloadOptions {
    srcSet?: string;
    sizes?: string;
}

export function preloadImage(url: string, options?: PreloadOptions) {
    if (!url || preloaded.has(url) || pending.has(url)) return;

    pending.add(url);

    const image = new Image();
    image.decoding = "async";

    if (options?.srcSet) image.srcset = options.srcSet;
    if (options?.sizes) image.sizes = options.sizes;

    image.addEventListener(
        "load",
        () => {
            pending.delete(url);
            preloaded.add(url);
        },
        { once: true },
    );

    image.addEventListener(
        "error",
        () => {
            pending.delete(url);
        },
        { once: true },
    );

    image.src = url;
}
