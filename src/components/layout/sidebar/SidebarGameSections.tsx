import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { SECTIONS_METADATA, type GameId, type SectionId } from "@/config/games";
import { Tooltip } from "@/components/ui/Tooltip";

type SidebarGameSectionsProps = {
    gameId: GameId;
    sections: SectionId[];
    isOpen: boolean;
    isActiveGame: boolean;
    activeSection: SectionId | null;
    showLabels: boolean;
};

function gameHref(gameId: GameId, sectionId: SectionId) {
    return `/${gameId.toUpperCase()}/${sectionId}`;
}

function SidebarGameSections({
    gameId,
    sections,
    isOpen,
    isActiveGame,
    activeSection,
    showLabels,
}: SidebarGameSectionsProps) {
    const { t } = useTranslation();

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="sections"
                    initial={{
                        height: 0,
                        opacity: 0,
                    }}
                    animate={{
                        height: "auto",
                        opacity: 1,
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className={clsx(
                        "flex flex-col gap-0.5 overflow-hidden",
                        showLabels ? "ml-2 pl-2" : "pl-0",
                    )}
                >
                    {sections.map((sectionId) => {
                        const meta = SECTIONS_METADATA[sectionId];

                        const active =
                            isActiveGame && activeSection === sectionId;

                        const Icon = active
                            ? (meta.activeIcon ?? meta.icon)
                            : meta.icon;

                        return (
                            <Tooltip
                                key={sectionId}
                                label={t(meta.label)}
                                position="right"
                                disabled={showLabels}
                            >
                                {active ? (
                                    <span
                                        aria-current="page"
                                        className={clsx(
                                            "flex items-center gap-2 max-mobile:gap-3 rounded-full px-2 py-1.5 max-mobile:p-3 w-full",
                                            showLabels
                                                ? "justify-start"
                                                : "justify-center",
                                            "bg-indigo-500/10 text-indigo-300 font-medium cursor-default",
                                        )}
                                    >
                                        <Icon
                                            size={16}
                                            className="shrink-0 max-mobile:size-5"
                                        />

                                        {showLabels && (
                                            <span className="text-xs">
                                                {t(meta.label)}
                                            </span>
                                        )}
                                    </span>
                                ) : (
                                    <a
                                        data-game-id={gameId}
                                        href={gameHref(gameId, sectionId)}
                                        className={clsx(
                                            "flex items-center gap-2 max-mobile:gap-3 rounded-full px-2 py-1.5 max-mobile:p-3 w-full transition",
                                            showLabels
                                                ? "justify-start"
                                                : "justify-center",
                                            "text-slate-500 hover:bg-white/5 hover:text-slate-300",
                                        )}
                                    >
                                        <Icon
                                            size={16}
                                            className="shrink-0 max-mobile:size-5"
                                        />

                                        {showLabels && (
                                            <span className="text-xs">
                                                {t(meta.label)}
                                            </span>
                                        )}
                                    </a>
                                )}
                            </Tooltip>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SidebarGameSections;
