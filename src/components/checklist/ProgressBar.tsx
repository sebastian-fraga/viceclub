import useT from "@/hooks/useT";
import { motion } from "framer-motion";
import type { ChecklistProgress } from "../../hooks/useChecklistProgress";

interface ProgressBarProps {
    progress: ChecklistProgress;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    const t = useT();
    const { total, count, pct } = progress;

    return (
        <div className="mb-2 flex flex-col gap-2 max-mobile:mb-3">
            <div className="flex items-center justify-between">
                <span className="font-body-condensed text-base text-white/80">
                    {t("checklist.progress")}
                </span>
                <span className="self-end text-xs font-bold text-white/80 tabular-nums ">
                    {pct}%
                </span>
            </div>

            <div className="relative h-2.5 w-full">
                <div className="absolute inset-0 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full rounded-full bg-(--game-accent)"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                </div>

                <motion.div
                    className="absolute top-1/2 h-3.5 w-0.5 -translate-x-0.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    initial={{ left: "0%" }}
                    animate={{ left: `${pct}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}
