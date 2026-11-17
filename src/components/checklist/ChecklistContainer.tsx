import VariantSelector from "@/components/home/VariantSelector";
import type { GameId } from "@/config/games";
import { games } from "@/data/games";
import { useCallback, useRef } from "react";
import type { ChecklistProgress } from "../../hooks/useChecklistProgress";
import type { ChecklistData } from "../../types/checklist";
import { ChecklistPanel } from "./ChecklistPanel";

interface ChecklistContainerProps {
    game: GameId;
    variantId: string;
    data: ChecklistData;
    activeVariantId: string;
    onVariantChange: (variantId: string) => void;
}

export function ChecklistContainer({
    game,
    variantId,
    data,
    activeVariantId,
    onVariantChange,
}: ChecklistContainerProps) {
    const gameData = games[game];
    const hasTabs = Boolean(data.tabs && data.tabs.length > 1);

    const progressByTab = useRef<Record<string, ChecklistProgress>>({});

    const handleProgressChange = useCallback(
        (progress: ChecklistProgress, tabId: string) => {
            progressByTab.current[tabId] = progress;
        },
        [],
    );

    if (hasTabs && data.tabs) {
        const activeTab =
            data.tabs.find(
                (tab) => tab.id.toLowerCase() === activeVariantId.toLowerCase(),
            ) ?? data.tabs[0];

        return (
            <div className="flex flex-col gap-12">
                <div className="my-2 flex justify-center">
                    <VariantSelector
                        variants={gameData.variants ?? []}
                        selected={activeVariantId}
                        onChange={onVariantChange}
                    />
                </div>

                <ChecklistPanel
                    key={activeTab.id}
                    game={game}
                    variantId={activeTab.id}
                    tabId={activeTab.id}
                    sections={activeTab.sections}
                    onProgressChange={handleProgressChange}
                />
            </div>
        );
    }

    const sections = data.sections ?? data.tabs?.[0]?.sections ?? [];
    const tabId = data.tabs?.[0]?.id ?? "default";

    return (
        <section>
            <ChecklistPanel
                game={game}
                variantId={variantId}
                tabId={tabId}
                sections={sections}
                onProgressChange={handleProgressChange}
            />
        </section>
    );
}
