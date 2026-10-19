import { useEffect } from "react";

interface ScrollLockOptions {
    touchAction?: boolean;
}

interface SavedStyles {
    html: string;
    body: string;
    touchAction: string;
}

let lockCount = 0;
let touchLockCount = 0;
let saved: SavedStyles | null = null;

function acquire(wantTouchAction: boolean) {
    if (typeof document === "undefined") return;

    if (lockCount === 0) {
        saved = {
            html: document.documentElement.style.overflow,
            body: document.body.style.overflow,
            touchAction: document.body.style.touchAction,
        };
    }

    lockCount += 1;
    if (wantTouchAction) touchLockCount += 1;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (touchLockCount > 0) {
        document.body.style.touchAction = "none";
    }
}

function release(wantTouchAction: boolean) {
    if (typeof document === "undefined" || lockCount === 0) return;

    lockCount -= 1;
    if (wantTouchAction) touchLockCount = Math.max(0, touchLockCount - 1);

    if (lockCount > 0) {
        if (touchLockCount === 0 && saved) {
            document.body.style.touchAction = saved.touchAction;
        }
        return;
    }

    if (saved) {
        document.documentElement.style.overflow = saved.html;
        document.body.style.overflow = saved.body;
        document.body.style.touchAction = saved.touchAction;
    }

    saved = null;
    touchLockCount = 0;
}


export function useScrollLock(
    enabled: boolean,
    options?: ScrollLockOptions,
) {
    const touchAction = options?.touchAction ?? false;

    useEffect(() => {
        if (!enabled) return;

        acquire(touchAction);

        return () => {
            release(touchAction);
        };
    }, [enabled, touchAction]);
}
