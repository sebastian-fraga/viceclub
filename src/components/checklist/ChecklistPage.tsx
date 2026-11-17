import { ChecklistContainer } from "@/components/checklist/ChecklistContainer";
import CompletionRewards from "@/components/checklist/CompletionRewards";
import type { GameId } from "@/config/games";
import { games } from "@/data/games";
import { themeToCssVars } from "@/lib/theme";
import type { ChecklistData } from "@/types/checklist";
import { useEffect, useState } from "react";

interface ChecklistPageProps {
    game: GameId;
    variantId: string;
    data: ChecklistData;
}

export default function ChecklistPage({
    game,
    variantId,
    data,
}: ChecklistPageProps) {
    const gameData = games[game];

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

    const activeTab =
        data.tabs?.find(
            (tab) => tab.id.toLowerCase() === activeVariantId.toLowerCase(),
        ) ?? data.tabs?.[0];

    const rewards = activeTab?.rewards ?? data.rewards ?? [];

    const sectionsCount =
        activeTab?.sections.length ?? data.sections?.length ?? 0;

    const selectedVariant = gameData.variants?.find(
        (variant) => variant.id === activeVariantId,
    );

    const activeTheme = selectedVariant?.theme ?? gameData.theme;

    const rewardsStartDelay = sectionsCount * 0.035;

    return (
        <div
            style={themeToCssVars(activeTheme)}
            className="w-full max-w-350 mx-auto max-mobile:px-4 mobile:px-6 flex flex-col gap-22 mb-12 mt-8"
        >
            <ChecklistContainer
                game={game}
                variantId={variantId}
                data={data}
                activeVariantId={activeVariantId}
                onVariantChange={setActiveVariantId}
            />

            <CompletionRewards
                game={game}
                key={activeVariantId}
                variantId={activeVariantId}
                rewards={rewards}
                startDelay={rewardsStartDelay}
            />
        </div>
    );
}
