import useT from "@/hooks/useT";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import YouTubeIcon from "@/components/icons/YouTubeIcon";

import { IconArrowUpRight } from "@tabler/icons-react";

interface Trailer {
    name: string;
    link: string;
}

interface Props {
    gameId: string;
    trailers: Trailer[];
    buttonClass: string;
}

const VIEWPORT_MARGIN = 16;

export default function TrailerDropdown({
    gameId,
    trailers,
    buttonClass,
}: Props) {
    const t = useT();
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

    useLayoutEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                dropdownRef.current?.contains(target) ||
                dropdownContentRef.current?.contains(target)
            ) {
                return;
            }
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

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
        if (!isOpen) computePosition();
        setIsOpen((prev) => !prev);
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                className={`bg-(--game-buttons-secondary-background) text-(--game-buttons-secondary-text) border border-(--game-buttons-secondary-border) hover:bg-(--game-buttons-secondary-hovered) ${
                    isOpen ? "bg-(--game-buttons-secondary-hovered)" : ""
                } ${buttonClass}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                {t("home.buttons.trailers")}
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
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
                                className="z-50 max-w-120 rounded-2xl bg-black pt-2 max-mobile:max-w-[calc(100vw-2rem)]"
                                ref={dropdownContentRef}
                            >
                                <div className="flex items-center gap-3 px-6 border-b pb-2 pt-1 border-white/10 max-mobile:gap-2 max-mobile:px-4">
                                    <div className="w-6 max-mobile:w-5">
                                        <YouTubeIcon />
                                    </div>
                                    <span className="font-black text-base max-mobile:text-sm">
                                        YouTube
                                    </span>
                                </div>
                                <div
                                    className="flex flex-col gap-0.5 max-h-50 overflow-y-auto scroll-home-dropdown max-mobile:max-h-40"
                                    data-lenis-prevent
                                >
                                    {trailers.map((trailer, index) => {
                                        const isLast =
                                            index === trailers.length - 1;

                                        return (
                                            <motion.a
                                                key={trailer.link}
                                                href={trailer.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                whileHover="hover"
                                                whileTap="hover"
                                                variants={{
                                                    hidden: {
                                                        opacity: 0,
                                                        y: 4,
                                                    },
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                    },
                                                    exit: { opacity: 0, y: -4 },
                                                }}
                                                transition={{ duration: 0.15 }}
                                                className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-thin transition-all hover:bg-white/10 max-mobile:px-3 max-mobile:py-2.5 max-mobile:text-xs ${
                                                    isLast
                                                        ? "pb-4 rounded-b-2xl max-mobile:pb-3"
                                                        : ""
                                                }`}
                                            >
                                                <span className="text-white/40 text-xs font-mono w-4 max-mobile:w-3.5 max-mobile:text-[11px]">
                                                    {index + 1}
                                                </span>

                                                <span
                                                    className="truncate"
                                                    title={t(
                                                        `home.${gameId.toLocaleLowerCase()}.trailers.${trailer.name}`,
                                                    )}
                                                >
                                                    {t(
                                                        `home.${gameId.toLocaleLowerCase()}.trailers.${trailer.name}`,
                                                    )}
                                                </span>

                                                <motion.div
                                                    variants={{
                                                        hidden: {
                                                            opacity: 0,
                                                            x: 8,
                                                        },
                                                        visible: {
                                                            opacity: 0,
                                                            x: 8,
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            x: 8,
                                                        },
                                                        hover: {
                                                            opacity: 1,
                                                            x: 0,
                                                        },
                                                    }}
                                                    className="ml-auto"
                                                >
                                                    <IconArrowUpRight className="size-4 max-mobile:size-3.5" />
                                                </motion.div>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}
