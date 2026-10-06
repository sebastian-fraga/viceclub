import { useEffect, useRef } from "react";

import useSettings from "@/hooks/useSettings";

const EASE = 0.021; // cursor tracking smoothness. lower value = slower

export default function CursorGlow() {
    const { getSetting } = useSettings();
    const enabled = getSetting("enable-cursor-glow") !== false;
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = glowRef.current;
        if (!el || !enabled) return;

        const reducedMotionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const finePointerQuery = window.matchMedia("(pointer: fine)");

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;
        let hasMoved = false;
        let rafId = 0;
        let running = false;

        const onPointerMove = (e: PointerEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
            if (!hasMoved) {
                currentX = targetX;
                currentY = targetY;
                hasMoved = true;
            }
            el.style.opacity = "1";
        };

        const onPointerLeave = () => {
            el.style.opacity = "0";
        };

        const tick = () => {
            currentX += (targetX - currentX) * EASE;
            currentY += (targetY - currentY) * EASE;
            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            rafId = requestAnimationFrame(tick);
        };

        const start = () => {
            if (running) return;
            running = true;
            hasMoved = false;
            window.addEventListener("pointermove", onPointerMove, {
                passive: true,
            });
            document.addEventListener("pointerleave", onPointerLeave);
            rafId = requestAnimationFrame(tick);
        };

        const stop = () => {
            if (!running) return;
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerleave", onPointerLeave);
            el.style.opacity = "0";
        };

        const evaluate = () => {
            if (reducedMotionQuery.matches || !finePointerQuery.matches) {
                stop();
            } else {
                start();
            }
        };

        evaluate();
        reducedMotionQuery.addEventListener("change", evaluate);
        finePointerQuery.addEventListener("change", evaluate);

        return () => {
            reducedMotionQuery.removeEventListener("change", evaluate);
            finePointerQuery.removeEventListener("change", evaluate);
            stop();
        };
    }, [enabled]);

    return (
        <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-9999 -mt-312.5 -ml-312.5 size-[2500px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-600 will-change-transform"
            style={{
                background:
                    "radial-gradient(circle, rgba(52,45,126,0.18) 0%, rgba(52,45,126,0.11) 30%, rgba(52,45,126,0.05) 55%, rgba(52,45,126,0) 72%)",
            }}
        />
    );
}
