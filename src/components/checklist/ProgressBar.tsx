import { motion } from "framer-motion";
import type { ChecklistProgress } from "../../hooks/useChecklistProgress";
import useT from "@/hooks/useT";

interface ProgressBarProps {
    progress: ChecklistProgress;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    const t = useT()
    const { total, count, pct } = progress;

    return (
        <div className="mb-2 flex flex-col gap-2 max-mobile:mb-3">
            <div className="flex items-center justify-between text-xs text-white/60">
                <span className="uppercase">{t("checklist.progress")}</span>
                <span className="tabular-nums">
                    {count} / {total}
                </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className="h-full rounded-full bg-(--game-accent)"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                />
            </div>

            <span className="self-end text-xs font-bold text-white/80 tabular-nums">
                {pct}%
            </span>
        </div>
    );
}
