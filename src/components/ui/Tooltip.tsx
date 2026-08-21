import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
    label: string;
    position?: "top" | "bottom" | "left" | "right";
    disabled?: boolean;
    children: React.ReactNode;
    anchorRef?: React.RefObject<HTMLElement | null>;
}

const GAP = 16;

export function Tooltip({
    label,
    position = "top",
    disabled = false,
    children,
    anchorRef,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const isTop = position === "top";
    const isBottom = position === "bottom";
    const isLeft = position === "left";

    useLayoutEffect(() => {
        if (!isVisible) return;

        const anchor = anchorRef?.current ?? triggerRef.current;

        if (!anchor) return;

        const rect = anchor.getBoundingClientRect();

        if (isTop) {
            setCoords({
                top: rect.top - GAP,
                left: rect.left + rect.width / 2,
            });
        } else if (isBottom) {
            setCoords({
                top: rect.bottom + GAP,
                left: rect.left + rect.width / 2,
            });
        } else if (isLeft) {
            setCoords({
                top: rect.top + rect.height / 2,
                left: rect.left - GAP,
            });
        } else {
            setCoords({
                top: rect.top + rect.height / 2,
                left: rect.right + GAP,
            });
        }
    }, [isVisible, isTop, isBottom, isLeft, anchorRef]);

    useEffect(() => {
        if (!isVisible) return;

        const handleScroll = () => {
            setIsVisible(false);
        };

        window.addEventListener("scroll", handleScroll, true);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [isVisible]);

    const initialOffset = isTop
        ? { y: 4 }
        : isBottom
          ? { y: -4 }
          : isLeft
            ? { x: 4 }
            : { x: -4 };

    const anchorTransform = isTop
        ? "translate(-50%, -100%)"
        : isBottom
          ? "translate(-50%, 0%)"
          : isLeft
            ? "translate(-100%, -50%)"
            : "translate(0%, -50%)";

    return (
        <>
            <div
                ref={triggerRef}
                className="relative inline-flex h-auto"
                onPointerEnter={(e) => {
                    if (e.pointerType === "mouse" && !disabled) {
                        setIsVisible(true);
                    }
                }}
                onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                        setIsVisible(false);
                    }
                }}
            >
                {children}
            </div>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isVisible && !disabled && (
                            <motion.div
                                initial={{ opacity: 0, ...initialOffset }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, ...initialOffset }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                }}
                                style={{
                                    position: "fixed",
                                    top: coords.top,
                                    left: coords.left,
                                }}
                                transformTemplate={(_, generatedTransform) =>
                                    `${anchorTransform} ${generatedTransform}`
                                }
                                className="whitespace-nowrap px-3.5 py-1 rounded-md bg-yellow-200 text-slate-900 text-sm font-bold pointer-events-none z-15000"
                            >
                                {label}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}
