const preloaded = new Set<string>();

interface PreloadOptions {
    srcSet?: string;
    sizes?: string;
}

export function preloadImage(url: string, options?: PreloadOptions) {
    if (!url || preloaded.has(url)) return;

    preloaded.add(url);

    const image = new Image();
    image.decoding = "async";

    if (options?.srcSet) image.srcset = options.srcSet;
    if (options?.sizes) image.sizes = options.sizes;

    image.src = url;
}
