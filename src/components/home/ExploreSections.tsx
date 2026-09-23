import { getGameMapData } from "@/components/maps/types";
import { getTypeMeta } from "@/components/maps/types/categories";
import {
    GAME_SECTIONS,
    SECTIONS_METADATA,
    UNFINISHED_SECTIONS,
} from "@/config/games";
import { MAP_MARKERS } from "@/data/maps/markers";
import { useGameChecklistProgress } from "@/hooks/useGameChecklistProgress";
import { useGameMapProgress } from "@/hooks/useGameMapProgress";
import useT from "@/hooks/useT";
import type { Game } from "@/types/game";
import { IconArrowUpRight, IconTools } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Title from "../ui/Title";

interface Props {
    game: Game;
    variantId: string;
}

const LARGE_SECTION_IDS = ["100", "mapa"];

function isChecklistId(sectionId: string) {
    return sectionId === "100" || sectionId.includes("checklist");
}

function isMobileWide(sectionId: string) {
    return isChecklistId(sectionId) || sectionId === "mapa";
}

function getBentoClasses(sectionId: string) {
    const isLarge = LARGE_SECTION_IDS.includes(sectionId);

    return {
        pattern: isLarge
            ? "sm:col-span-2 sm:row-span-2"
            : "sm:col-span-1 sm:row-span-1",
        isLarge,
    };
}

export default function ExploreSections({ game, variantId }: Props) {
    const t = useT();
    const checklistProgress = useGameChecklistProgress(game.id, variantId);
    const completedMapIds = useGameMapProgress(game.id, variantId);
    const mapData = getGameMapData(game.id, variantId);

    const mapProgress = [
        ...Object.entries(mapData?.collectibles ?? {}),
        ...Object.entries(mapData?.sideMissions ?? {}),
        ...Object.entries(mapData?.challenges ?? {}),
    ].map(([type, items]) => {
        const total = items.length;

        const completed = items.filter((item) =>
            completedMapIds.has(`${type}_${item.id}`),
        ).length;

        return {
            type,
            completed,
            total,
            pct: total > 0 ? Math.round((completed / total) * 100) : 0,
            icon: (
                MAP_MARKERS[game.id as keyof typeof MAP_MARKERS] as
                    | Record<string, { icon: string }>
                    | undefined
            )?.[type]?.icon,
            meta: getTypeMeta(type),
        };
    });

    const pctValue = checklistProgress?.pct ?? 0;

    const [activeMapProgress, setActiveMapProgress] = useState(0);

    useEffect(() => {
        if (mapProgress.length <= 1) return;

        const interval = setInterval(() => {
            setActiveMapProgress(
                (current) => (current + 1) % mapProgress.length,
            );
        }, 4500);

        return () => clearInterval(interval);
    }, [mapProgress.length]);

    const sections = GAME_SECTIONS[game.id]
        .filter((id) => id !== "inicio")
        .map((id) => ({
            id,
            ...SECTIONS_METADATA[id],
        }));

    const totalMobileUnits = sections.reduce(
        (acc, section) => acc + (isMobileWide(section.id) ? 2 : 1),
        0,
    );

    const hasOrphanRow = totalMobileUnits % 2 !== 0;

    return (
        <section className="flex flex-col gap-3">
            <div className="max-w-fit">
                <Title label="home.titles.exploreSections" align="left" />
            </div>

            <div className="mt-8 grid grid-cols-2 auto-rows-auto grid-flow-dense gap-3 sm:grid-cols-4 sm:auto-rows-30 max-mobile:mt-5 max-mobile:gap-2">
                {sections.map((section, index) => {
                    const IconComponent = section.activeIcon ?? section.icon;

                    const isUnderConstruction =
                        UNFINISHED_SECTIONS[game.id]?.includes(section.id) ??
                        false;

                    const isChecklist = isChecklistId(section.id);

                    const isMap = section.id === "mapa";

                    const activeProgress = isMap
                        ? mapProgress[activeMapProgress]
                        : undefined;

                    const isLastItem = index === sections.length - 1;

                    const isLastOrphan =
                        isLastItem && !isMobileWide(section.id) && hasOrphanRow;

                    const mobileWide = isMobileWide(section.id) || isLastOrphan;

                    const { pattern, isLarge } = getBentoClasses(section.id);

                    const hasBadge =
                        (isChecklist || isMap) && !isUnderConstruction;

                    const iconSize = isLarge ? 30 : 22;

                    const progressPercentage = isChecklist
                        ? pctValue
                        : activeProgress && activeProgress.total > 0
                          ? (activeProgress.completed / activeProgress.total) *
                            100
                          : 0;

                    const bentoBadge =
                        "absolute left-4 top-4 max-mobile:left-3 max-mobile:top-3 z-20 flex gap-px rounded-2xl bg-(--game-accent)/80 px-6 py-1.5 text-[12px] font-black tabular-nums text-(--game-buttons-primary-text)/90 font-body-condensed tracking-wide";

                    const hasVariants = Boolean(game.variants?.length);

                    const sectionHref =
                        hasVariants &&
                        (section.id === "100" || section.id === "mapa")
                            ? `/${game.id}/${section.id}?variant=${variantId}`
                            : `/${game.id}/${section.id}`;
                    return (
                        <motion.a
                            key={section.id}
                            href={isUnderConstruction ? undefined : sectionHref}
                            aria-disabled={isUnderConstruction}
                            tabIndex={isUnderConstruction ? -1 : 0}
                            onClick={(e) => {
                                if (isUnderConstruction) {
                                    e.preventDefault();
                                }
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.06,
                                ease: "easeOut",
                            }}
                            variants={{
                                hover: isUnderConstruction
                                    ? {}
                                    : { scale: 1.015 },
                            }}
                            whileHover="hover"
                            whileTap={isUnderConstruction ? undefined : "hover"}
                            className={`${pattern} ${
                                mobileWide ? "col-span-2" : "col-span-1"
                            } min-h-28 sm:min-h-0 group relative flex flex-col overflow-hidden rounded-md border p-4 gap-2 transition-colors max-mobile:p-3 ${
                                hasBadge ? "pt-12 max-mobile:pt-16 sm:pt-4" : ""
                            } ${
                                isUnderConstruction
                                    ? "cursor-not-allowed border-neutral-400/10 bg-neutral-900/50 opacity-55"
                                    : "cursor-pointer border-neutral-600/50 hover:border-(--game-buttons-primary-hovered)/80 hover:bg-zinc-950/60 bg-neutral-950"
                            } ${
                                isLarge
                                    ? "justify-end items-start text-left"
                                    : "items-center justify-center text-center"
                            }`}
                        >
                            {isLarge && (
                                <IconComponent
                                    size={200}
                                    stroke={1}
                                    className="pointer-events-none absolute -bottom-8 -right-8 text-neutral-100/4 max-mobile:size-32"
                                />
                            )}

                            {!isUnderConstruction && isLarge && (
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-15"
                                    style={{
                                        background:
                                            "radial-gradient(120% 100% at 100% 0%, var(--game-accent, transparent) 0%, transparent 60%)",
                                    }}
                                />
                            )}

                            {isUnderConstruction && (
                                <span className="absolute right-2 top-2 z-10 rounded-2xl border border-red-800/50 bg-red-950/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-300/80 max-mobile:text-[8px] flex items-center gap-2">
                                    <IconTools size={12} />
                                    {t("common.buttons.underConstruction")}
                                </span>
                            )}

                            {isChecklist && !isUnderConstruction && (
                                <span className={bentoBadge}>{pctValue}%</span>
                            )}

                            {isMap &&
                                !isUnderConstruction &&
                                activeProgress && (
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.span
                                            key={activeProgress.type}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeOut",
                                            }}
                                            className={bentoBadge}
                                        >
                                            <span className="">
                                                {activeProgress.completed}
                                            </span>
                                            <span className="opacity-85">
                                                /
                                            </span>
                                            <span>{activeProgress.total}</span>
                                        </motion.span>
                                    </AnimatePresence>
                                )}

                            <IconComponent
                                size={iconSize}
                                stroke={2}
                                className={`relative max-mobile:size-4.5 ${
                                    isUnderConstruction
                                        ? "text-neutral-500"
                                        : "text-(--game-buttons-primary-background)"
                                }`}
                            />

                            <span
                                className={`relative font-medium max-mobile:text-xs ${
                                    isUnderConstruction
                                        ? "text-neutral-400"
                                        : "text-neutral-100"
                                } ${isLarge ? "text-lg" : "text-sm"}`}
                            >
                                {t(section.label)}
                            </span>

                            {isMap &&
                                !isUnderConstruction &&
                                activeProgress && (
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.div
                                            key={activeProgress.type}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: "easeOut",
                                            }}
                                            className="relative my-2 flex items-center gap-2.5 text-sm text-neutral-500"
                                        >
                                            {activeProgress.icon && (
                                                <span
                                                    className="flex size-7 shrink-0 items-center justify-center rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            activeProgress.meta
                                                                ?.color,
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            activeProgress.icon
                                                        }
                                                        alt=""
                                                        className="size-5 object-contain"
                                                    />
                                                </span>
                                            )}

                                            <span className="font-body-condensed text-white/80">
                                                {t(
                                                    activeProgress.meta
                                                        ?.label ?? "",
                                                )}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                )}

                            {(isChecklist || isMap) && !isUnderConstruction && (
                                <div className="relative mt-1 h-1.5 w-full max-w-42">
                                    <div className="absolute inset-0 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-(--game-accent) transition-all duration-300 ease-out"
                                            style={{
                                                width: `${progressPercentage}%`,
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out"
                                        style={{
                                            left: `${progressPercentage}%`,
                                        }}
                                    />
                                </div>
                            )}

                            {!isUnderConstruction && (
                                <motion.span
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                    }}
                                    variants={{
                                        hover: {
                                            opacity: 1,
                                            height: "auto",
                                        },
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="relative flex items-center gap-2 overflow-hidden text-[11px] text-neutral-500 lowercase max-mobile:text-[10px]"
                                >
                                    {t("home.buttons.goToSection")}
                                    <IconArrowUpRight size={12} />
                                </motion.span>
                            )}
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
}
