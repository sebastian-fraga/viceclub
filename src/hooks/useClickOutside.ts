import { useEffect, useRef, type RefObject } from "react";

type ClickOutsideRef = RefObject<HTMLElement | null>;

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
