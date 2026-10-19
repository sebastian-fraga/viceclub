import { useEffect, useEffectEvent } from "react";

export interface KeyDownOptions {
    enabled?: boolean;
    ignoreWhenTyping?: boolean;
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
