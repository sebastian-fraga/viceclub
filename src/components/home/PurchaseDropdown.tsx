import useT from "@/hooks/useT";
import { useLayoutEffect, useState } from "react";

import { AnimatePresence, motion, type Variants } from "framer-motion";

import {
    getPlatformFamily,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";
import type { Game } from "@/types/game";

import SwitchIcon from "@/components/icons/nintendo/SwitchIcon";
import WindowsIcon from "@/components/icons/pc/WindowsIcon";
import AndroidIcon from "@/components/icons/phones/AndroidIcon";
import AppleIcon from "@/components/icons/phones/AppleIcon";
import PlayStationIcon from "@/components/icons/playstation/PlayStationIcon";
import XboxIcon from "@/components/icons/xbox/XboxIcon";

import NintendoEShopIcon from "@/components/icons/nintendo/NintendoEShopIcon";
import RockstarIcon from "@/components/icons/pc/RockstarIcon";
import SteamIcon from "@/components/icons/pc/SteamIcon";
import AppStoreIcon from "@/components/icons/phones/AppStoreIcon";
import GooglePlayIcon from "@/components/icons/phones/GooglePlayIcon";
import PlayStationStoreIcon from "@/components/icons/playstation/PlayStationStoreIcon";

import NotFoundContent from "@/components/ui/NotFoundContent";
import { Tooltip } from "@/components/ui/Tooltip";
import { IconArrowUpRight } from "@tabler/icons-react";

import PlatformSelector from "@/components/ui/selector/PlatformSelector";

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

const STAGGER = 0.045;
const SLIDE = 16;

interface ItemCustom {
    index: number;
    direction: number;
}

const itemVariants: Variants = {
    hidden: ({ direction }: ItemCustom) => ({
        opacity: 0,
        x: direction * SLIDE,
        y: direction === 0 ? 6 : 0,
    }),
    visible: ({ index }: ItemCustom) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.22,
            ease: "easeOut" as const,
            delay: 0.06 + index * STAGGER,
        },
    }),
};

const listVariants: Variants = {
    exit: (direction: number) => ({
        opacity: 0,
        x: direction * -SLIDE,
        transition: { duration: 0.12, ease: "easeIn" as const },
    }),
};

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
    const [direction, setDirection] = useState(0);

    const selectedPlatformData = purchase.find(
        (platform) => platform.platform === selectedPlatform,
    );

    const hasPlatforms = purchase.length > 0;
    const stores = selectedPlatformData?.stores ?? [];
    const hasStores = stores.length > 0;

    useLayoutEffect(() => {
        const preferred = purchase.find(
            (platform) => platform.platform === resolvedFamily,
        );

        setDirection(0);
        setSelectedPlatform(preferred?.platform ?? purchase[0]?.platform);
    }, [purchase, resolvedFamily]);

    const t = useT();

    const handleSelectPlatform = (platform: typeof selectedPlatform) => {
        if (platform === selectedPlatform) return;

        const fromIndex = purchase.findIndex(
            (item) => item.platform === selectedPlatform,
        );
        const toIndex = purchase.findIndex(
            (item) => item.platform === platform,
        );

        setDirection(toIndex > fromIndex ? 1 : -1);
        setSelectedPlatform(platform);
    };

    const listClassName = hasStores
        ? "flex flex-col gap-0.5 pb-2"
        : hasPlatforms
          ? "px-3 pb-3 pt-2 max-mobile:px-2.5 max-mobile:pb-2.5"
          : "p-3 max-mobile:p-2.5";

    return (
        <PlatformSelector
            variant="primary"
            label={t("home.buttons.purchase")}
            buttonClass={buttonClass}
            onOpen={() => setDirection(0)}
            layout
            contentClassName={`max-w-80 w-full shadow-2xl shadow-black/60 ${
                hasPlatforms ? "pt-4" : ""
            }`}
        >
            {hasPlatforms && (
                <div className="flex items-center gap-6 border-b border-white/10 px-6 pb-2 max-mobile:gap-4 max-mobile:px-4">
                    {purchase.map((platform) => {
                        const Icon = platformIcons[platform.platform];

                        return (
                            <button
                                key={platform.platform}
                                type="button"
                                onClick={() =>
                                    handleSelectPlatform(platform.platform)
                                }
                                className="cursor-pointer"
                            >
                                <Tooltip position="top" label={platform.label}>
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
            )}

            <motion.div layout className="overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    {/* El wrapper define el espacio: cada estado tiene el suyo */}
                    <motion.div
                        key={selectedPlatform}
                        variants={listVariants}
                        exit="exit"
                        className={listClassName}
                    >
                        {hasStores ? (
                            stores.map((store, index) => {
                                const Icon = storeIcons[store.icon];

                                const link = (
                                    <motion.a
                                        href={store.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={itemVariants}
                                        custom={{ index, direction }}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        whileTap="hover"
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 max-mobile:px-3 max-mobile:py-2.5 max-mobile:text-xs"
                                    >
                                        <Icon className="size-5 max-mobile:size-4" />
                                        <span className="flex items-center gap-1.5">
                                            {store.name}
                                            {store.extra && (
                                                <span className="text-[10px] font-semibold uppercase tracking-wide text-white/50 bg-white/10 px-1.5 py-0.5 rounded">
                                                    {store.extra}
                                                </span>
                                            )}
                                        </span>
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, x: 8 },
                                                visible: { opacity: 0, x: 8 },
                                                exit: { opacity: 0, x: 8 },
                                                hover: { opacity: 1, x: 0 },
                                            }}
                                            className="ml-auto"
                                        >
                                            <IconArrowUpRight className="size-4" />
                                        </motion.div>
                                    </motion.a>
                                );

                                return store.extra ? (
                                    <Tooltip
                                        key={store.link}
                                        position="right"
                                        label={t(
                                            `common.editionLabels.${store.extra}`,
                                            { defaultValue: store.extra },
                                        )}
                                    >
                                        {link}
                                    </Tooltip>
                                ) : (
                                    <div key={store.link}>{link}</div>
                                );
                            })
                        ) : (
                            <motion.div
                                custom={{ index: 0, direction }}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className=""
                            >
                                <NotFoundContent className="from-(--button-bg-hover) to-[color-mix(in_oklch,var(--button-bg-hover)_55%,var(--button-bg))]" />
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </PlatformSelector>
    );
}
