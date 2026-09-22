import VariantSelector from "@/components/home/VariantSelector";
import type { GameId } from "@/config/games";
import { games } from "@/data/games";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChecklistProgress } from "../../hooks/useChecklistProgress";
import type { ChecklistData } from "../../types/checklist";
import { ChecklistPanel } from "./ChecklistPanel";

interface ChecklistContainerProps {
    game: GameId;
    variantId: string;
    data: ChecklistData;
}

export function ChecklistContainer({
    game,
    variantId,
    data,
}: ChecklistContainerProps) {
    const gameData = games[game];
    const hasTabs = Boolean(data.tabs && data.tabs.length > 1);

    const [activeVariantId, setActiveVariantId] = useState(() => {
        if (typeof window === "undefined") {
            return variantId;
        }

        const variant = new URLSearchParams(window.location.search).get(
            "variant",
        );

        return (
            gameData.variants?.find(
                (item) => item.id.toLowerCase() === variant?.toLowerCase(),
            )?.id ?? variantId
        );
    });

    useEffect(() => {
        const url = new URL(window.location.href);

        if (activeVariantId === game) {
            url.searchParams.delete("variant");
        } else {
            url.searchParams.set("variant", activeVariantId);
        }

        window.history.replaceState({}, "", url);
    }, [activeVariantId, game]);

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

        const variantData = gameData.variants?.find(
            (variant) =>
                variant.id.toLowerCase() === activeTab.id.toLowerCase(),
        );

        const accent =
            variantData?.theme.accent.default ?? gameData.theme.accent.default;

        return (
            <div
                style={
                    {
                        "--game-accent": accent,
                    } as CSSProperties
                }
            >
                <div className="my-4 flex justify-center">
                    <VariantSelector
                        variants={gameData.variants ?? []}
                        selected={activeVariantId}
                        onChange={setActiveVariantId}
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
        <div
            style={
                {
                    "--game-accent": gameData.theme.accent.default,
                } as CSSProperties
            }
        >
            <ChecklistPanel
                game={game}
                variantId={variantId}
                tabId={tabId}
                sections={sections}
                onProgressChange={handleProgressChange}
            />
        </div>
    );
}
