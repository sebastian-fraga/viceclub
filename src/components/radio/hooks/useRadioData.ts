import { useEffect, useState } from "react";
import type { RadioDataMap } from "../types/types";

export function useRadioData(game: string) {
    const [radioData, setRadioData] = useState<RadioDataMap>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        const url = `https://viceclub.s3.us-east-1.amazonaws.com/${game}/radio.json`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: RadioDataMap) => {
                if (!cancelled) setRadioData(data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
                console.error("Error cargando radios:", err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [game]);

    return { radioData, loading, error };
}