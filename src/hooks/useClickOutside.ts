import { useEffect, useRef, type RefObject } from "react";

type ClickOutsideRef = RefObject<HTMLElement | null>;

/**
 * Llama a `onOutside` cuando se hace pointerdown fuera de los refs indicados.
 *
 * Centraliza el listener que cada dropdown, tooltip y panel repetia por su
 * cuenta, ademas con eventos distintos: unos usaban `pointerdown` y otros
 * `mousedown` (que no se dispara en dispositivos tactiles).
 */
export function useClickOutside(
    onOutside: () => void,
    targets: (ClickOutsideRef | null | undefined)[],
    enabled = true,
) {
    const onOutsideRef = useRef(onOutside);
    const targetsRef = useRef(targets);

    useEffect(() => {
        onOutsideRef.current = onOutside;
        targetsRef.current = targets;
    });

    useEffect(() => {
        if (!enabled) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;

            if (!target) return;

            const isInside = targetsRef.current.some((ref) =>
                ref?.current?.contains(target),
            );

            if (!isInside) onOutsideRef.current();
        };

        document.addEventListener("pointerdown", handlePointerDown, {
            capture: true,
        });

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, {
                capture: true,
            });
        };
    }, [enabled]);
}
