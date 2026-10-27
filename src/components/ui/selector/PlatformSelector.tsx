import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
    variant?: "primary" | "secondary";
    label: string;
    buttonClass: string;
    onOpen?: () => void;
    contentClassName?: string;
    layout?: boolean;
    children: React.ReactNode;
}

const VIEWPORT_MARGIN = 16;

export default function PlatformSelector({
    variant = "secondary",
    label,
    buttonClass,
    onOpen,
    contentClassName,
    layout = false,
    children,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 0,
    });

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);

    const computePosition = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        let left = rect.left;

        const dropdownWidth = dropdownContentRef.current?.offsetWidth ?? 0;
        const maxLeft = window.innerWidth - dropdownWidth - VIEWPORT_MARGIN;

        left = Math.min(left, maxLeft);
        left = Math.max(left, VIEWPORT_MARGIN);

        setDropdownPosition({
            top: rect.bottom + 8,
            left,
        });
    };

    useLayoutEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!isOpen) return;
        computePosition();
    }, [isOpen]);

    useLayoutEffect(() => {
        if (!isOpen) return;

        const handleReposition = () => computePosition();

        window.addEventListener("resize", handleReposition);
        return () => window.removeEventListener("resize", handleReposition);
    }, [isOpen]);

    useClickOutside(
        () => setIsOpen(false),
        [dropdownRef, dropdownContentRef],
        isOpen,
    );

    useLayoutEffect(() => {
        if (!isOpen) return;

        const handleScroll = (e: Event) => {
            const target = e.target as Node;
            if (dropdownContentRef.current?.contains(target)) return;
            setIsOpen(false);
        };

        window.addEventListener("scroll", handleScroll, {
            capture: true,
            passive: true,
        });
        return () =>
            window.removeEventListener("scroll", handleScroll, {
                capture: true,
            });
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen) {
            computePosition();
            onOpen?.();
        }
        setIsOpen((prev) => !prev);
    };

    const buttonClassVariant =
        variant === "primary"
            ? `bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered) hover:drop-shadow-(--game-buttons-primary-hovered) ${
                  isOpen
                      ? "bg-(--game-buttons-primary-hovered) drop-shadow-(--game-buttons-primary-hovered)"
                      : ""
              }`
            : `bg-(--game-buttons-secondary-background) text-(--game-buttons-secondary-text) border border-(--game-buttons-secondary-border) hover:bg-(--game-buttons-secondary-hovered) max-mobile:backdrop-blur-[2px] ${
                  isOpen ? "bg-(--game-buttons-secondary-hovered)" : ""
              }`;

    return (
        <div ref={dropdownRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                className={`${buttonClassVariant} ${buttonClass}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                {label}
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                layout={layout}
                                initial={{
                                    opacity: 0,
                                    y: -6,
                                    scale: 0.98,
                                    pointerEvents: "none",
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    pointerEvents: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -6,
                                    scale: 0.98,
                                    pointerEvents: "none",
                                }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{
                                    position: "fixed",
                                    top: dropdownPosition.top,
                                    left: dropdownPosition.left,
                                }}
                                className={`z-50 rounded-2xl bg-(--button-bg) max-mobile:max-w-[calc(100vw-2rem)] ${contentClassName ?? ""}`}
                                ref={dropdownContentRef}
                            >
                                {children}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}