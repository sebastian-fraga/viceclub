import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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

    const storageKey = `checklist-active-tab-${game}`;

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);

        if (saved === null) return;

        const index = Number(saved);

        if (index >= 0 && index < (data.tabs?.length ?? 0)) {
            setActiveIndex(index);
        }
    }, [storageKey, data.tabs?.length]);

    useEffect(() => {
        localStorage.setItem(storageKey, String(activeIndex));
    }, [storageKey, activeIndex]);

    if (hasTabs && data.tabs) {
        const activeTab = data.tabs[activeIndex];

        const activeVariant = gameData.variants?.find(
            (variant) =>
                variant.id.toLowerCase() === activeTab.id.toLowerCase(),
        );

        const accent =
            activeVariant?.theme.accent ?? gameData.theme.accent.default;

        return (
            <div
                style={
                    {
                        "--game-accent": accent,
                    } as CSSProperties
                }
            >
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
        <div
            style={
                {
                    "--game-accent": gameData.theme.accent.default,
                } as CSSProperties
            }
        >
            <ChecklistPanel
                game={game}
                tabId={tabId}
                sections={sections}
                onProgressChange={handleProgressChange}
            />
        </div>
    );
}
