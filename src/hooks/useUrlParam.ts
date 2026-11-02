import { useCallback, useState } from "react";

export function useUrlParam<T extends string>(
    param: string,
    allowedValues: readonly T[],
    defaultValue: T,
) {
    const [hasUrlValue, setHasUrlValue] = useState(() => {
        if (typeof window === "undefined") return false;

        const value = new URLSearchParams(window.location.search).get(param);

        return allowedValues.includes(value as T);
    });

    const [value, setValue] = useState<T>(() => {
        if (typeof window === "undefined") return defaultValue;

        const urlValue = new URLSearchParams(window.location.search).get(param);

        return allowedValues.includes(urlValue as T)
            ? (urlValue as T)
            : defaultValue;
    });

    const setUrlValue = useCallback(
        (next: T) => {
            setValue(next);

            const url = new URL(window.location.href);
            url.searchParams.set(param, next);
            url.hash = "";

            history.replaceState(null, "", url);
        },
        [param],
    );

    return [value, setUrlValue, hasUrlValue] as const;
}
