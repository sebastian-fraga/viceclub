import { gamesList, type GameId } from "@/config/games";
import {
    resetChecklistProgress,
    resetMapProgress,
} from "@/utils/resetProgress";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GameSelector } from "./ui/GameSelector";
import clsx from "clsx";

export type ResetTarget = "checklist" | "map";

interface ResetProgressContentProps {
    target: ResetTarget;
    onCancel: () => void;
    onSuccess: () => void;
}

export function ResetProgressContent({
    target,
    onCancel,
    onSuccess,
}: ResetProgressContentProps) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<GameId[]>([]);

    const handleConfirm = () => {
        if (selected.length === 0) return;

        if (target === "checklist") {
            resetChecklistProgress(selected);
        } else {
            resetMapProgress(selected);
        }

        onSuccess();
    };

    const allGameIds = gamesList.map((g) => g.id);
    const isAllSelected = selected.length === allGameIds.length;

    const handleToggleAll = () => {
        if (isAllSelected) {
            setSelected([]);
        } else {
            setSelected(allGameIds);
        }
    };

    const buttonStyle = "px-5 py-2 text-sm rounded-2xl transition cursor-pointer duration-300"

    return (
        <div className="w-full h-full flex flex-col justify-between gap-4 py-1">
            <div className="flex items-center gap-4 shrink-0 justify-between mt-2">
                <p className="text-sm text-white/60">
                    {t("settings.resetProgress.description")}
                </p>
                <button
                    type="button"
                    onClick={handleToggleAll}
                    className="text-xs text-slate-400 hover:text-white underline underline-offset-4 shrink-0 transition cursor-pointer"
                >
                    {isAllSelected
                        ? t("common.buttons.unselectAll")
                        : t("common.buttons.selectAll")}
                </button>
            </div>

            <div className="flex-1 min-h-0">
                <GameSelector selected={selected} onChange={setSelected} />
            </div>

            <div className="flex justify-end gap-3 mt-auto pt-4 shrink-0">
                <button
                    type="button"
                    onClick={onCancel}
                    className={clsx(
                        buttonStyle,
                        "border border-white/10 text-slate-300 hover:bg-white/5",
                    )}
                >
                    {t("common.buttons.cancel")}
                </button>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={selected.length === 0}
                    className={clsx(
                        buttonStyle,
                        "font-medium bg-indigo-400 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white",
                    )}
                >
                    {t("common.buttons.accept")}
                </button>
            </div>
        </div>
    );
}
