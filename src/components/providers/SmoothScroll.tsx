import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.addEventListener("astro:after-swap", () => {
            lenis.scrollTo(0, { immediate: true });
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
