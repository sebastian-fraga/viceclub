import { useEffect, useEffectEvent } from "react";

export interface KeyDownOptions {
    /** Activa o desactiva la escucha. */
    enabled?: boolean;
    /** Desactiva el atajo mientras el usuario escribe en un campo. */
    ignoreWhenTyping?: boolean;
    /** Elemento al que se suscribe. Por defecto, `window`. */
    target?: EventTarget | null;
}

function isTypingContext(target: EventTarget | null): boolean {
    const element = target as HTMLElement | null;

    return (
        element?.tagName === "INPUT" ||
        element?.tagName === "TEXTAREA" ||
        element?.isContentEditable === true
    );
}

/**
 * Escucha una tecla mientras el componente esta montado.
 *
 * Centraliza los atajos de teclado que cada overlay repetia por su cuenta.
 * El manejador se guarda en un *effect event*, de modo que la suscripcion no
 * se rehace en cada render aunque el manejador sea una funcion nueva.
 */
export function useKeyDown(
    handler: (event: KeyboardEvent) => void,
    {
        enabled = true,
        ignoreWhenTyping = false,
        target,
    }: KeyDownOptions = {},
) {
    const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
        if (ignoreWhenTyping && isTypingContext(event.target)) return;

        handler(event);
    });

    useEffect(() => {
        if (!enabled) return;

        const element = target ?? window;
        const listener = onKeyDown as EventListener;

        element.addEventListener("keydown", listener);

        return () => {
            element.removeEventListener("keydown", listener);
        };
    }, [enabled, onKeyDown, target]);
}
