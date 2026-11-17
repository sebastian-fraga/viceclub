import Title from "@/components/ui/Title";
import { Tooltip } from "@/components/ui/Tooltip";
import type { GameId } from "@/config/games";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import useT from "@/hooks/useT";
import type { CompletionRewardsData } from "@/types/checklist";
import { IconProgressAlert } from "@tabler/icons-react";
import { motion, type Variants } from "framer-motion";

interface CompletionRewardsProps {
    game: GameId;
    variantId: string;
    rewards: CompletionRewardsData[];
    /** Segundos de espera antes de animar (para entrar después del checklist). */
    startDelay?: number;
}

// Mismo movimiento que el título del ChecklistPanel (opacity + y 12, 0.4s)
const headerVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

// Mismo movimiento que las secciones del checklist (opacity + y 16, 0.35s)
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
    },
};

const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
};

export default function CompletionRewards({
    game,
    variantId,
    rewards,
    startDelay = 0.6,
}: CompletionRewardsProps) {
    const t = useT();
    const i18n = useLocalizedText();

    const sectionVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: startDelay,
            },
        },
    };

    return (
        <motion.section
            className="flex flex-col gap-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div
                className="max-w-fit flex flex-col gap-8"
                variants={headerVariants}
            >
                <Title label={t("checklist.rewards.title")} />
            </motion.div>

            {rewards.length > 0 ? (
                <div className="relative">
                    <motion.div
                        className="relative flex items-center gap-4 pb-4 pt-4 max-mobile:flex-col max-mobile:items-start max-mobile:gap-2"
                        variants={headerVariants}
                    >
                        <p className="text-base text-white/90">
                            {t("checklist.rewards.paragraph")}
                        </p>
                    </motion.div>

                    <motion.ol
                        className="relative flex flex-col gap-4"
                        variants={listVariants}
                    >
                        {rewards.map((reward, index) => {
                            const tooltipText = reward.tooltipText
                                ? i18n(reward.tooltipText)
                                : undefined;

                            return (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative flex items-center gap-5 rounded-2xl px-4 py-3.5 transition-colors duration-400 bg-(--button-bg)/30 hover:bg-(--button-bg-hover)/70 max-mobile:gap-3 cursor-default font-body-condensed shadow-lg shadow-(color:--game-accent)/5"
                                >
                                    <span className="w-6 shrink-0 text-left text-2xl font-bold tabular-nums leading-none text-(--game-accent) opacity-60 font-body transition-opacity duration-400 group-hover:opacity-100 max-mobile:w-8 max-mobile:text-2xl">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="leading-snug text-white/85 transition-colors duration-400 group-hover:text-white">
                                            {i18n(reward.item)}
                                        </span>
                                        {tooltipText && (
                                            <Tooltip
                                                position="bottom"
                                                mobilePosition="top"
                                                label={tooltipText}
                                            >
                                                <button
                                                    type="button"
                                                    className="shrink-0 text-white/40 transition-colors hover:text-white/80 cursor-help"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    aria-label={t(
                                                        "checklist.accessibility.tooltip",
                                                    )}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="flex h-4 w-4 items-center justify-center text-[17px] leading-none"
                                                    >
                                                        <IconProgressAlert />
                                                    </span>
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </motion.li>
                            );
                        })}
                    </motion.ol>
                </div>
            ) : (
                <motion.p
                    className="rounded-2xl bg-(--button-bg)/45 p-4 pl-6 font-body-condensed text-lg text-white/80"
                    variants={itemVariants}
                >
                    {t("checklist.rewards.empty")}
                </motion.p>
            )}
        </motion.section>
    );
}
