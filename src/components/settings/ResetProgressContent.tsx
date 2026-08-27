import { gamesList, type GameId } from "@/config/games";
import { resetChecklistProgress } from "@/utils/resetChecklistProgress";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GameSelector } from "./ui/GameSelector";

interface ResetProgressContentProps {
    onCancel: () => void;
    onSuccess: () => void;
}

export function ResetProgressContent({
    onCancel,
    onSuccess,
}: ResetProgressContentProps) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<GameId[]>([]);

    const handleConfirm = () => {
        if (selected.length === 0) return;
        resetChecklistProgress(selected);
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
                    className="px-4 py-2 text-sm rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition cursor-pointer"
                >
                    {t("common.buttons.cancel")}
                </button>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={selected.length === 0}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:hover:bg-purple-600 text-white transition cursor-pointer"
                >
                    {t("common.buttons.accept")}
                </button>
            </div>
        </div>
    );
}
