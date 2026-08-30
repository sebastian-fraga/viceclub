import Title from "@/components/ui/Title";
import { gamesList } from "@/config/games";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useT from "@/hooks/useT";
import {
    useChecklistProgress,
    type ChecklistProgress,
} from "../../hooks/useChecklistProgress";
import { useChecklistState } from "../../hooks/useChecklistState";
import type { ChecklistSectionData } from "../../types/checklist";
import { launchConfetti } from "../../utils/confetti";
import { ChecklistSection } from "./ChecklistSection";
import { ProgressBar } from "./ProgressBar";

interface ChecklistPanelProps {
    game: string;
    tabId: string;
    sections: ChecklistSectionData[];
    onProgressChange?: (progress: ChecklistProgress, tabId: string) => void;
}

export function ChecklistPanel({
    game,
    tabId,
    sections,
    onProgressChange,
}: ChecklistPanelProps) {
    const t = useT()

    const gameData = gamesList.find((item) => item.id === game);

    const { checked, toggleItem, toggleMany } = useChecklistState(game, tabId);
    const progress = useChecklistProgress(sections, checked);

    const prevPctRef = useRef<number | null>(null);
    useEffect(() => {
        onProgressChange?.(progress, tabId);

        if (progress.pct === 100 && prevPctRef.current !== 100) {
            launchConfetti();
        }
        prevPctRef.current = progress.pct;
    }, [progress, tabId, onProgressChange]);

    return (
        <div
            data-tab-id={tabId}
            className="w-full max-w-400 mx-auto max-mobile:px-4 mobile:px-6 flex flex-col gap-6 max-mobile:gap-8 mb-12 mt-8"
        >
            <motion.div
                className="flex-col flex gap-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="max-w-fit">
                    <Title
                        label={t("checklist.title", {
                            fullName: gameData?.fullName,
                        })}
                    />
                </div>
                <ProgressBar progress={progress} />
            </motion.div>

            <div className="flex flex-col gap-3 max-mobile:gap-2">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.35,
                            delay: index * 0.04,
                            ease: "easeOut",
                        }}
                    >
                        <ChecklistSection
                            section={section}
                            game={game}
                            checked={checked}
                            onToggleItem={toggleItem}
                            onToggleAll={toggleMany}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
