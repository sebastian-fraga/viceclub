import { useCallback, useRef, useState } from "react";
import { games } from "@/data/games";
import type { GameId } from "@/config/games";
import type { ChecklistProgress } from "../../hooks/useChecklistProgress";
import type { ChecklistData } from "../../types/checklist";
import { ChecklistPanel } from "./ChecklistPanel";
import { ChecklistTabs } from "./ChecklistTabs";

interface ChecklistContainerProps {
    game: GameId;
    data: ChecklistData;
}

export function ChecklistContainer({ game, data }: ChecklistContainerProps) {
    const gameData = games[game];
    const hasTabs = Boolean(data.tabs && data.tabs.length > 1);
    const [activeIndex, setActiveIndex] = useState(0);

    const progressByTab = useRef<Record<string, ChecklistProgress>>({});
    const handleProgressChange = useCallback(
        (progress: ChecklistProgress, tabId: string) => {
            progressByTab.current[tabId] = progress;
        },
        [],
    );

    if (hasTabs && data.tabs) {
        const activeTab = data.tabs[activeIndex];

        return (
            <div className="">
                <ChecklistTabs
                    tabs={data.tabs}
                    variants={gameData.variants ?? []}
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                />

                <ChecklistPanel
                    key={activeTab.id}
                    game={game}
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
        <ChecklistPanel
            game={game}
            tabId={tabId}
            sections={sections}
            onProgressChange={handleProgressChange}
        />
    );
}
