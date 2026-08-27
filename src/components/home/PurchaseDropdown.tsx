import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { AnimatePresence, motion } from "framer-motion";

import {
    getPlatformFamily,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";
import type { Game } from "@/types/game";

import AndroidIcon from "@/components/icons/AndroidIcon";
import AppleIcon from "@/components/icons/AppleIcon";
import PlayStationIcon from "@/components/icons/PlayStationIcon";
import SwitchIcon from "@/components/icons/SwitchIcon";
import WindowsIcon from "@/components/icons/WindowsIcon";
import XboxIcon from "@/components/icons/XboxIcon";

import AppStoreIcon from "@/components/icons/AppStoreIcon";
import GooglePlayIcon from "@/components/icons/GooglePlayIcon";
import NintendoEShopIcon from "@/components/icons/NintendoEShopIcon";
import PlayStationStoreIcon from "@/components/icons/PlayStationStoreIcon";
import RockstarIcon from "@/components/icons/RockstarIcon";
import SteamIcon from "@/components/icons/SteamIcon";

import { Tooltip } from "@/components/ui/Tooltip";
import { IconExternalLink, IconMoodPuzzled } from "@tabler/icons-react";

interface Props {
    purchase: Game["purchase"];
    buttonClass: string;
    preferredPlatform: Platform | "default";
    preferredPlatformFamily: PlatformFamily | "default";
}

const platformIcons = {
    pc: WindowsIcon,
    playstation: PlayStationIcon,
    xbox: XboxIcon,
    nintendo: SwitchIcon,
    android: AndroidIcon,
    ios: AppleIcon,
};
const storeIcons = {
    rgl: RockstarIcon,
    steam: SteamIcon,
    playstation: PlayStationStoreIcon,
    xbox: XboxIcon,
    switch: NintendoEShopIcon,
    android: GooglePlayIcon,
    ios: AppStoreIcon,
};

const editionLabels: Record<string, string> = {
    "10th": "10th",
    DE: "DE",
    E: "E",
    L: "L",
    "E&E": "E&E",
};

const VIEWPORT_MARGIN = 16;

export default function PurchaseDropdown({
    purchase,
    buttonClass,
    preferredPlatform,
    preferredPlatformFamily,
}: Props) {
    const familyFromPlatform =
        preferredPlatform !== "default"
            ? getPlatformFamily(preferredPlatform)
            : "default";

    const resolvedFamily =
        familyFromPlatform !== "default"
            ? familyFromPlatform
            : preferredPlatformFamily;

    const [selectedPlatform, setSelectedPlatform] = useState(
        purchase.find((platform) => platform.platform === resolvedFamily)
            ?.platform ?? purchase[0]?.platform,
    );
    const selectedPlatformData = purchase.find(
        (platform) => platform.platform === selectedPlatform,
    );
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 0,
    });

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

    const handleToggle = () => {
        if (!isOpen) computePosition();
        setIsOpen((previous) => !previous);
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

    return (
        <div ref={dropdownRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                className={`bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered) hover:drop-shadow-(--game-buttons-primary-hovered) ${buttonClass}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                {t("home.buttons.purchase")}
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                            layout
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
                                className="z-50 max-w-80 w-full rounded-2xl bg-zinc-950 border border-black/40 pt-4 max-mobile:max-w-[calc(100vw-2rem)] max-mobile:pt-3"
                                ref={dropdownContentRef}
                            >
                                <div
                                    className={`flex items-center gap-6 px-6 pb-2 max-mobile:gap-4 max-mobile:px-4 ${
                                        purchase.length > 0
                                            ? "border-b border-white/10"
                                            : ""
                                    }`}
                                >
                                    {purchase.map((platform) => {
                                        const Icon =
                                            platformIcons[platform.platform];

                                        return (
                                            <button
                                                key={platform.platform}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedPlatform(
                                                        platform.platform,
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                <Tooltip
                                                    position="top"
                                                    label={platform.label}
                                                >
                                                    <Icon
                                                        className={`size-5 transition-all max-mobile:size-4 ${
                                                            platform.platform !==
                                                            selectedPlatform
                                                                ? "grayscale-100 opacity-50 hover:grayscale-70 hover:opacity-80"
                                                                : ""
                                                        }`}
                                                    />
                                                </Tooltip>
                                            </button>
                                        );
                                    })}
                                </div>

                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={selectedPlatform}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{
                                            duration: 0.15,
                                            ease: "easeOut",
                                        }}
                                        className="flex flex-col gap-0.5"
                                    >
                                        {selectedPlatformData?.stores
                                            ?.length ? (
                                            selectedPlatformData.stores.map(
                                                (store, index) => {
                                                    const isLast =
                                                        index ===
                                                        selectedPlatformData
                                                            .stores.length -
                                                            1;

                                                    const Icon =
                                                        storeIcons[store.icon];

                                                    const link = (
                                                        <motion.a
                                                            href={store.link}
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
                                                                exit: {
                                                                    opacity: 0,
                                                                    y: -4,
                                                                },
                                                            }}
                                                            transition={{
                                                                duration: 0.15,
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:bg-white/10 max-mobile:px-3 max-mobile:py-2.5 max-mobile:text-xs ${
                                                                isLast
                                                                    ? "pb-4 rounded-b-2xl max-mobile:pb-3"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <Icon className="size-5 max-mobile:size-4" />

                                                            <span className="flex items-center gap-1.5">
                                                                {store.name}

                                                                {store.extra && (
                                                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-white/50 bg-white/10 px-1.5 py-0.5 rounded">
                                                                        {
                                                                            store.extra
                                                                        }
                                                                    </span>
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
                                                                <IconExternalLink className="size-4" />
                                                            </motion.div>
                                                        </motion.a>
                                                    );

                                                    return store.extra ? (
                                                        <Tooltip
                                                            key={store.link}
                                                            position="right"
                                                            label={
                                                                editionLabels[
                                                                    store.extra
                                                                ]
                                                                    ? t(
                                                                          `common.editionLabels.${store.extra}`,
                                                                      )
                                                                    : store.extra
                                                            }
                                                        >
                                                            {link}
                                                        </Tooltip>
                                                    ) : (
                                                        <div key={store.link}>
                                                            {link}
                                                        </div>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <div className="px-6 pt-0 pb-5 text-sm flex flex-col items-center gap-3 max-mobile:px-4 max-mobile:pb-4 max-mobile:text-xs">
                                                <IconMoodPuzzled className="text-white/80" />
                                                <span className="text-white">
                                                    {t(
                                                        "home.buttons.notAvailable",
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}
