import {
    GAME_SECTIONS,
    SECTIONS_METADATA,
    UNFINISHED_SECTIONS,
} from "@/config/games";
import { useGameChecklistProgress } from "@/hooks/useGameChecklistProgress";
import type { Game } from "@/types/game";
import { IconArrowUpRight, IconTools } from "@tabler/icons-react";
import { motion } from "framer-motion";
import useT from "@/hooks/useT";
import Title from "../ui/Title";

interface Props {
    game: Game;
}

const BENTO_PATTERN = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
];

function getBentoClasses(index: number) {
    const pattern = BENTO_PATTERN[index % BENTO_PATTERN.length];
    const isLarge = pattern.includes("col-span-2 row-span-2");
    const isWide = pattern.includes("col-span-2 row-span-1");

    return { pattern, isLarge, isWide };
}

export default function ExploreSections({ game }: Props) {
    const t = useT();
    const checklistProgress = useGameChecklistProgress(game.id);

    const sections = GAME_SECTIONS[game.id]
        .filter((id) => id !== "inicio")
        .map((id) => ({
            id,
            ...SECTIONS_METADATA[id],
        }));

    return (
        <section className="flex flex-col gap-3">
            <div className="max-w-fit">
                <Title label="home.titles.exploreSections" />
            </div>

            <div className="mt-8 grid grid-cols-2 auto-rows-25 grid-flow-dense gap-3 sm:grid-cols-4 sm:auto-rows-30 max-mobile:mt-5 max-mobile:gap-2">
                {sections.map((section, index) => {
                    const IconComponent = section.icon;
                    const isUnderConstruction =
                        UNFINISHED_SECTIONS[game.id]?.includes(section.id) ??
                        false;
                    const isChecklist = section.id === "100";

                    const { pattern, isLarge, isWide } = getBentoClasses(index);
                    const featured = isLarge || isWide;
                    const iconSize = isLarge ? 30 : isWide ? 26 : 22;

                    return (
                        <motion.a
                            key={section.id}
                            href={
                                isUnderConstruction
                                    ? undefined
                                    : `/${game.id}/${section.id}`
                            }
                            aria-disabled={isUnderConstruction}
                            tabIndex={isUnderConstruction ? -1 : 0}
                            onClick={(e) => {
                                if (isUnderConstruction) e.preventDefault();
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
                            className={`${pattern} max-mobile:row-span-1 group relative flex flex-col overflow-hidden rounded-md border p-4 transition-colors max-mobile:p-3 ${
                                isUnderConstruction
                                    ? "cursor-not-allowed border-neutral-400/10 bg-neutral-900/50 opacity-55"
                                    : "cursor-pointer border-neutral-600/50 hover:border-(--game-buttons-primary-hovered)/80 hover:bg-zinc-950/60 bg-neutral-950"
                            } ${
                                featured
                                    ? "justify-end items-start gap-2 text-left"
                                    : "items-center justify-center gap-2 text-center"
                            }`}
                        >
                            {isLarge && (
                                <IconComponent
                                    size={200}
                                    stroke={1}
                                    className="pointer-events-none absolute -bottom-8 -right-8 text-neutral-100/4"
                                />
                            )}

                            {!isUnderConstruction && (isLarge || isWide) && (
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

                            {isChecklist &&
                                !isUnderConstruction &&
                                checklistProgress !== null && (
                                    <span className="absolute left-4 top-4 z-10 rounded-2xl bg-(--game-accent)/80 px-3 py-1 text-[10px] font-black tabular-nums text-(--game-buttons-primary-text)/90 max-mobile:right-4 max-mobile:left-auto max-mobile:text-[8px]">
                                        {checklistProgress.pct}%
                                    </span>
                                )}

                            <IconComponent
                                size={iconSize}
                                stroke={1.6}
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
                                } ${
                                    isLarge
                                        ? "text-lg"
                                        : featured
                                          ? "text-base"
                                          : "text-sm"
                                }`}
                            >
                                {t(section.label)}
                            </span>

                            {isChecklist &&
                                !isUnderConstruction &&
                                checklistProgress !== null &&
                                (isLarge || isWide) && (
                                    <div className="relative mt-1 h-1 w-full max-w-42 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-(--game-accent)"
                                            style={{
                                                width: `${checklistProgress.pct}%`,
                                            }}
                                        />
                                    </div>
                                )}

                            {!isUnderConstruction && (
                                <motion.span
                                    initial={{ opacity: 0, height: 0 }}
                                    variants={{
                                        hover: { opacity: 1, height: "auto" },
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
