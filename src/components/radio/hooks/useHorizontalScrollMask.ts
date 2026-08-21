import { useRef, useState } from "react";

export function useHorizontalScrollMask<T extends HTMLElement>() {
    const scrollRef = useRef<T>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    const handleScroll = () => updateScrollState();

    const maskParts = [
        canScrollLeft ? "transparent 0%, black 8%" : "black 0%",
        canScrollRight ? "black 92%, transparent 100%" : "black 100%",
    ];
    const maskImage = `linear-gradient(to right, ${maskParts.join(", ")})`;

    return { scrollRef, handleScroll, updateScrollState, maskImage };
}