import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.25,
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

        const handleScrollToTop = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        animationFrame = requestAnimationFrame(raf);

        document.addEventListener("astro:after-swap", handleAfterSwap);
        document.addEventListener("scroll-to-top", handleScrollToTop);

        return () => {
            cancelAnimationFrame(animationFrame);
            document.removeEventListener("astro:after-swap", handleAfterSwap);
            document.removeEventListener("scroll-to-top", handleScrollToTop);
            lenis.destroy();
        };
    }, []);

    return null;
}
