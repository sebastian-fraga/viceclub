import clsx from "clsx";
import { useEffect, type ReactNode } from "react";

import { useDragToScroll } from "./hooks/useDragToScroll";
import { useHorizontalScrollMask } from "./hooks/useHorizontalScrollMask";

interface ScrollableChipsProps {
    children: ReactNode;
    contentKey: unknown;
    className?: string;
}

export function ScrollableChips({
    children,
    contentKey,
    className,
}: ScrollableChipsProps) {
    const scroll = useHorizontalScrollMask<HTMLDivElement>();
    const drag = useDragToScroll<HTMLDivElement>();

    useEffect(() => {
        scroll.updateScrollState();
    }, [contentKey]);

    return (
        <div
            ref={scroll.scrollRef}
            onScroll={scroll.handleScroll}
            {...drag}
            className={clsx(
                "flex flex-wrap gap-2 w-full min-w-0 max-mobile:pr-2",
                "@max-2xl:flex-nowrap @max-2xl:overflow-x-auto scrollbar-hide @max-2xl:cursor-grab @max-2xl:select-none @max-2xl:overscroll-x-contain",
                className,
            )}
            style={{
                maskImage: scroll.maskImage,
                WebkitMaskImage: scroll.maskImage,
            }}
        >
            {children}
        </div>
    );
}
