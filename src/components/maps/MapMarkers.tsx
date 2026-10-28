import AnimatedMarker from "@/components/maps/AnimatedMarker";
import type { CollectibleData } from "@/components/maps/types";
import {
    MAP_CATEGORIES,
    type MapCategory,
} from "@/components/maps/types/categories";
import {
    getCollectibleImageSrcSet,
    getCollectibleImageUrl,
} from "@/components/maps/utils/collectibleImage";
import { MAP_MARKERS } from "@/data/maps/markers";
import { useMemo, useState } from "react";
import { useMapEvents } from "react-leaflet";

interface MapMarkersProps {
    gameId: string;
    variant?: string;
    height: number;
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
    completedIds: Set<string>;
    selectedId?: string | null;
    onSelect: (
        collectible: CollectibleData,
        type: string,
        totalForType: number,
    ) => void;
}

interface TypeMeta {
    color: string;
    label: string;
}

export default function MapMarkers({
    gameId,
    variant,
    height,
    data,
    completedIds,
    selectedId,
    onSelect,
}: MapMarkersProps) {
    const markers = MAP_MARKERS[gameId as keyof typeof MAP_MARKERS];
    const [zoom, setZoom] = useState<number>(0);

    const map = useMapEvents({
        zoomend() {
            setZoom(map.getZoom());
        },
    });

    useMemo(() => {
        if (map) setZoom(map.getZoom());
    }, [map]);

    const zoomScale = useMemo(() => {
        if (zoom <= -1) return 0.75;
        if (zoom === 0) return 0.88;
        if (zoom === 1) return 1;
        return 1.15;
    }, [zoom]);

    return (
        <>
            {(
                Object.entries(data) as [
                    MapCategory,
                    Record<string, CollectibleData[]> | undefined,
                ][]
            ).flatMap(([categoryKey, typesRecord]) => {
                const category = MAP_CATEGORIES[categoryKey];
                if (!category || !typesRecord) return [];

                const typeMetas = category.types as Record<string, TypeMeta>;

                return Object.entries(typesRecord).flatMap(([type, items]) =>
                    items.map((collectible) => {
                        const marker = markers?.[type as keyof typeof markers];
                        const meta = typeMetas[type];

                        if (!marker || !meta) return null;

                        const uniqueId = `${type}_${collectible.id}`;
                        const isCompleted = completedIds.has(uniqueId);
                        const isSelected = selectedId === uniqueId;

                        return (
                            <AnimatedMarker
                                key={uniqueId}
                                collectible={collectible}
                                marker={marker}
                                meta={meta}
                                height={height}
                                isCompleted={isCompleted}
                                isSelected={isSelected}
                                zoomScale={zoomScale}
                                imageUrl={getCollectibleImageUrl(
                                    gameId,
                                    variant,
                                    type,
                                    collectible.id,
                                )}
                                imageSrcSet={getCollectibleImageSrcSet(
                                    gameId,
                                    variant,
                                    type,
                                    collectible.id,
                                )}
                                onSelect={() =>
                                    onSelect(collectible, type, items.length)
                                }
                            />
                        );
                    }),
                );
            })}
        </>
    );
}
