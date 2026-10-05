import { useCallback, useEffect, useState } from "react";

const PARAM = "mod";

function readParam(): string | null {
    return new URLSearchParams(window.location.search).get(PARAM);
}

function writeParam(id: string | null) {
    const url = new URL(window.location.href);

    if (id) url.searchParams.set(PARAM, id);
    else url.searchParams.delete(PARAM);

    window.history.replaceState(window.history.state, "", url);
}

export function useModParam() {
    const [modId, setModId] = useState<string | null>(null);

    useEffect(() => {
        setModId(readParam());

        const onPopState = () => setModId(readParam());
        window.addEventListener("popstate", onPopState);

        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const open = useCallback((id: string) => {
        writeParam(id);
        setModId(id);
    }, []);

    const close = useCallback(() => {
        writeParam(null);
        setModId(null);
    }, []);

    return { modId, open, close };
}
