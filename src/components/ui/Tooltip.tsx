import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
    label: string;
    position?: "top" | "bottom" | "left" | "right";
    mobilePosition?: "top" | "bottom" | "left" | "right";
    disabled?: boolean;
    children: React.ReactNode;
    anchorRef?: React.RefObject<HTMLElement | null>;
}

const GAP = 16;
const MOBILE_BREAKPOINT = 660;

export function Tooltip({
    label,
    position = "top",
    mobilePosition,
    disabled = false,
    children,
    anchorRef,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
    });

    const triggerRef = useRef<HTMLDivElement>(null);

    const mobileEnabled = mobilePosition !== undefined;

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT}px)`,
        );

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (isMobile && !mobileEnabled) {
            setIsVisible(false);
        }
    }, [isMobile, mobileEnabled]);

    const effectivePosition =
        isMobile && mobilePosition ? mobilePosition : position;

    const isTop = effectivePosition === "top";
    const isBottom = effectivePosition === "bottom";
    const isLeft = effectivePosition === "left";

    useLayoutEffect(() => {
        if (!isVisible) return;

        const anchor = anchorRef?.current ?? triggerRef.current;

        if (!anchor) return;

        const rect = anchor.getBoundingClientRect();

        const viewportPadding = 16;

        const anchorCenter = rect.left + rect.width / 2;

        const clampedLeft = Math.min(
            Math.max(anchorCenter, viewportPadding),
            window.innerWidth - viewportPadding,
        );

        if (isTop) {
            setCoords({
                top: rect.top - GAP,
                left: clampedLeft,
            });
        } else if (isBottom) {
            setCoords({
                top: rect.bottom + GAP,
                left: clampedLeft,
            });
        } else if (isLeft) {
            setCoords({
                top: rect.top + rect.height / 2,
                left: Math.max(rect.left - GAP, viewportPadding),
            });
        } else {
            setCoords({
                top: rect.top + rect.height / 2,
                left: Math.min(
                    rect.right + GAP,
                    window.innerWidth - viewportPadding,
                ),
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

    useEffect(() => {
        if (!isVisible || !isMobile || !mobileEnabled) {
            return;
        }

        const handleOutsidePointer = (event: PointerEvent) => {
            const target = event.target as Node;

            if (triggerRef.current && !triggerRef.current.contains(target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsidePointer);

        return () => {
            document.removeEventListener("pointerdown", handleOutsidePointer);
        };
    }, [isVisible, isMobile, mobileEnabled]);

    useEffect(() => {
        if (!isVisible || !isMobile || !mobileEnabled) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsVisible(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, isMobile, mobileEnabled]);

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
                style={{isolation: "isolate"}}
                onPointerEnter={(e) => {
                    if (!isMobile && e.pointerType === "mouse" && !disabled) {
                        setIsVisible(true);
                    }
                }}
                onPointerLeave={(e) => {
                    if (!isMobile && e.pointerType === "mouse") {
                        setIsVisible(false);
                    }
                }}
                onPointerDownCapture={() => {
                    if (isMobile && mobileEnabled && !disabled) {
                        setIsVisible((prev) => !prev);
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
                                initial={{
                                    opacity: 0,
                                    ...initialOffset,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    ...initialOffset,
                                }}
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
                                className="pointer-events-none z-15000 w-fit text-center whitespace-normal rounded-md bg-yellow-200 px-3.5 py-1 text-sm font-bold text-slate-900"
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
