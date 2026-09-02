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

        let animationFrame: number;

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
        };

        const handleAfterSwap = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        animationFrame = requestAnimationFrame(raf);
        document.addEventListener("astro:after-swap", handleAfterSwap);

        return () => {
            cancelAnimationFrame(animationFrame);
            document.removeEventListener("astro:after-swap", handleAfterSwap);
            lenis.destroy();
        };
    }, []);

    return null;
}
