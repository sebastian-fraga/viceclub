export interface DataLoaderOptions<T> {
    /**
     * Extrae la clave de cada modulo. Por defecto, el nombre del archivo sin
     * extension.
     */
    key?: (path: string, module: T) => string;
    /**
     * Normaliza la clave antes de indexar y de buscar, para que las
     * busquedas no dependan de mayusculas.
     */
    normalize?: (value: string) => string;
}

const defaultKey = (path: string) =>
    path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? path;

const defaultNormalize = (value: string) => value.toLowerCase();

/**
 * Crea un cargador de datos por clave a partir de los modulos de
 * `import.meta.glob`.
 *
 * El patron de `import.meta.glob` tiene que ser literal para que Vite lo
 * pueda transformar, asi que cada consumidor mantiene su propia llamada y
 * aqui solo se centraliza el indexado: se construye un mapa una sola vez en
 * lugar de hacer un `find` lineal sobre las rutas en cada consulta.
 *
 * @example
 * const modules = import.meta.glob<Data>("../data/datos/*.json", {
 *     eager: true,
 *     import: "default",
 * });
 * const load = createDataLoader(modules);
 * load("III");
 */
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
