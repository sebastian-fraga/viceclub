import type { CollectibleData } from "@/components/maps/types";
import {
    type MapCategory,
} from "@/components/maps/types/categories";
import { useEffect, useMemo, useState } from "react";

interface UseMapSelectionParams {
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
    gameId: string;
    height: number;
}

export function useMapSelection({
    data,
    gameId,
    height,
}: UseMapSelectionParams) {
    const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(() => {
        if (typeof window === "undefined") return new Set();

        const searchParams = new URLSearchParams(window.location.search);
        const typeParam = searchParams.get("type");

        if (!typeParam) return new Set();

        const allTypes = Object.values(data).flatMap((typesRecord) =>
            typesRecord ? Object.keys(typesRecord) : [],
        );

        const targetType = allTypes.find(
            (type) => type === typeParam || type === `${typeParam}_${gameId}`,
        );

        if (!targetType) return new Set();

        return new Set(allTypes.filter((type) => type !== targetType));
    });

    const [markerParam] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;

        return new URLSearchParams(window.location.search).get("marker");
    });

    const [isolated, setIsolated] = useState<boolean>(() =>
        Boolean(markerParam),
    );

    const selectedMarker = useMemo(() => {
        if (!markerParam) return null;

        const typeParam = new URLSearchParams(window.location.search).get(
            "type",
        );

        if (!typeParam) return null;

        const allTypes = Object.values(data).flatMap((typesRecord) =>
            typesRecord ? Object.entries(typesRecord) : [],
        );

        const [type, collectibles] =
            allTypes.find(
                ([type]) =>
                    type === typeParam || type === `${typeParam}_${gameId}`,
            ) ?? [];

        if (!type || !collectibles) return null;

        const collectible = collectibles.find(
            (item) => item.id === markerParam,
        );

        if (!collectible) return null;

        return {
            type,
            collectible,
            totalForType: collectibles.length,
        };
    }, [data, gameId, markerParam]);

    const [selectedCollectible, setSelectedCollectible] = useState<{
        type: string;
        collectible: CollectibleData;
        totalForType: number;
    } | null>(null);

    useEffect(() => {
        if (!selectedMarker) return;
        setSelectedCollectible(selectedMarker);
    }, [selectedMarker]);

    const focusTarget = useMemo< [number, number] | null>(() => {
        if (!selectedCollectible) return null;

        return [
            height - selectedCollectible.collectible.y,
            selectedCollectible.collectible.x,
        ];
    }, [selectedCollectible, height]);

    const handleToggleType = (type: string) => {
        setIsolated(false);

        setHiddenTypes((prev) => {
            const next = new Set(prev);

            if (next.has(type)) {
                next.delete(type);
            } else {
                next.add(type);
            }

            return next;
        });
    };

    const visibleData = useMemo(() => {
        const result: Partial<
            Record<MapCategory, Record<string, CollectibleData[]>>
        > = {};

        if (isolated && selectedMarker) {
            for (const [categoryKey, typesRecord] of Object.entries(data) as [
                MapCategory,
                Record<string, CollectibleData[]> | undefined,
            ][]) {
                if (!typesRecord?.[selectedMarker.type]) continue;

                result[categoryKey] = {
                    [selectedMarker.type]: [selectedMarker.collectible],
                };
            }

            return result;
        }

        if (hiddenTypes.size === 0) return data;

        for (const [categoryKey, typesRecord] of Object.entries(data) as [
            MapCategory,
            Record<string, CollectibleData[]> | undefined,
        ][]) {
            if (!typesRecord) continue;

            result[categoryKey] = Object.fromEntries(
                Object.entries(typesRecord).filter(
                    ([type]) => !hiddenTypes.has(type),
                ),
            );
        }

        return result;
    }, [data, hiddenTypes, isolated, selectedMarker]);

    return {
        hiddenTypes,
        setHiddenTypes,
        isolated,
        setIsolated,
        selectedMarker,
        selectedCollectible,
        setSelectedCollectible,
        focusTarget,
        handleToggleType,
        visibleData,
        markerParam,
    };
}