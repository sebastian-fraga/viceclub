import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useMarquee(text: string) {
    const ref = useRef<HTMLParagraphElement>(null);
    const [isMarquee, setIsMarquee] = useState(false);
    const [distance, setDistance] = useState(0);

    useLayoutEffect(() => {
        setIsMarquee(false);

        const el = ref.current;
        if (!el) return;

        const raf = requestAnimationFrame(() => {
            if (window.innerWidth > 1980) return;
            if (el.scrollWidth > el.clientWidth) {
                setDistance(el.scrollWidth - el.clientWidth);
                setIsMarquee(true);
            }
        });

        return () => cancelAnimationFrame(raf);
    }, [text]);

    useEffect(() => {
        const onResize = () => {
            const el = ref.current;
            if (!el) return;
            setIsMarquee(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return { ref, isMarquee, distance };
}