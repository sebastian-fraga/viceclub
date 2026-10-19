import { useKeyDown } from "@/hooks/useKeyDown";

/**
 * Ejecuta `onEscape` al pulsar Escape.
 *
 * Atajo de uso comun: overlays (tooltip, modal, pantalla completa) que se
 * cierran con la tecla Escape.
 */
export function useEscapeKey(onEscape: () => void, enabled = true) {
    useKeyDown(
        (event) => {
            if (event.key === "Escape") onEscape();
        },
        { enabled },
    );
}
