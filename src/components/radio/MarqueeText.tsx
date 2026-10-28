import clsx from "clsx";
import { motion, type MotionProps } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

interface MarqueeTextProps {
    children: React.ReactNode;
    className?: string;
}

const marqueeMotion: MotionProps = {
    initial: { x: 0 },
};

export default function MarqueeText({ children, className }: MarqueeTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    useLayoutEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        const measure = () => {
            const d = content.scrollWidth - container.clientWidth;
            const next = prefersReducedMotion || d <= 1 ? 0 : d;

            setDistance((prev) => (prev === next ? prev : next));
        };

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(container);
        ro.observe(content);

        return () => ro.disconnect();
    }, [children, prefersReducedMotion]);

    const duration = Math.max(6, distance / 10);

    const [leftMaskOpacity, setLeftMaskOpacity] = useState(0);
    const [rightMaskOpacity, setRightMaskOpacity] = useState(0);

    return (
        <div
            ref={containerRef}
            className={clsx("relative min-w-0 overflow-hidden", className)}
        >
            <motion.div
                ref={contentRef}
                {...marqueeMotion}
                className="flex w-max min-w-full items-center whitespace-nowrap"
                animate={{
                    x: distance > 0 ? [0, -distance, -distance, 0, 0] : 0,
                }}
                transition={
                    distance > 0
                        ? {
                              duration: duration + 6,
                              times: [
                                  0,
                                  duration / 2 / (duration + 6),
                                  (duration / 2 + 2) / (duration + 6),
                                  (duration + 2) / (duration + 6),
                                  1,
                              ],
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 2,
                          }
                        : { duration: 0 }
                }
                onUpdate={(latest) => {
                    const x = Math.abs(Number(latest.x ?? 0));
                    const atStart = x < 1;
                    const atEnd = Math.abs(x - distance) < 1;

                    setLeftMaskOpacity(distance > 0 && !atStart ? 1 : 0);
                    setRightMaskOpacity(distance > 0 && !atEnd ? 1 : 0);
                }}
            >
                {children}
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[8%]"
                animate={{ opacity: leftMaskOpacity }}
                transition={{ duration: 0.1 }}
                style={{
                    background:
                        "linear-gradient(to right, var(--radio-station-accent), transparent)",
                }}
            />

            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-[8%]"
                animate={{ opacity: rightMaskOpacity }}
                transition={{ duration: 0.1 }}
                style={{
                    background:
                        "linear-gradient(to left, var(--radio-station-accent), transparent)",
                }}
            />
        </div>
    );
}
