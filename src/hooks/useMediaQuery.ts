import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean | null {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handleChange = () => {
            setMatches(mediaQuery.matches);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}
