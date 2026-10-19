export interface DataLoaderOptions<T> {
    key?: (path: string, module: T) => string;
    normalize?: (value: string) => string;
}

const defaultKey = (path: string) =>
    path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? path;

const defaultNormalize = (value: string) => value.toLowerCase();

export function createDataLoader<T>(
    modules: Record<string, T>,
    {
        key = defaultKey,
        normalize = defaultNormalize,
    }: DataLoaderOptions<T> = {},
): (id: string) => T | null {
    const index = new Map<string, T>();

    for (const [path, mod] of Object.entries(modules)) {
        index.set(normalize(key(path, mod)), mod);
    }

    return (id) => index.get(normalize(id)) ?? null;
}
