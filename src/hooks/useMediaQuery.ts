import { useEffect, useState } from "react";

/**
 * Suscribe a una media query y devuelve si coincide.
 *
 * Devuelve `null` hasta que el efecto se ejecuta en el cliente, para evitar
 * desajustes de hidratacion: durante el render del servidor no se sabe el
 * ancho de la ventana, y `null` se comporta como `false` en las comprobaciones
 * de verdad.
 */
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
