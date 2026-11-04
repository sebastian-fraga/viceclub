import { useEffect, useState } from "react";

export function useIsAtBottom(offset = 75) {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - offset;

            setIsAtBottom(isBottom);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [offset]);

    return isAtBottom;
}
