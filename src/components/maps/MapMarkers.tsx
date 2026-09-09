import type { CollectibleData } from "@/components/maps/types";
import {
    MAP_CATEGORIES,
    type MapCategory,
} from "@/components/maps/types/categories";
import { MAP_MARKERS } from "@/data/maps/markers";
import { motion } from "framer-motion";
import { divIcon } from "leaflet";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Marker, Polyline, useMapEvents } from "react-leaflet";

interface MapMarkersProps {
    gameId: string;
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

const guidePointIcon = (color: string) =>
    divIcon({
        className: "",
        html: `
            <div style="
                width: 14px;
                height: 14px;
                background: ${color};
                border: 2.5px solid #000000;
                border-radius: 100%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.9), 0 0 8px ${color};
            "></div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });

function AnimatedMarker({
    collectible,
    type,
    marker,
    meta,
    height,
    isCompleted,
    isSelected,
    zoomScale,
    onSelect,
}: {
    collectible: CollectibleData;
    type: string;
    marker: {
        icon?: string;
    };
    meta: { color: string };
    height: number;
    isCompleted: boolean;
    isSelected: boolean;
    zoomScale: number;
    onSelect: () => void;
}) {
    const { customIcon, containerEl } = useMemo(() => {
        const el = document.createElement("div");
        const icon = divIcon({
            className: "custom-leaflet-marker",
            html: el,
            iconSize: [42, 42],
            iconAnchor: [21, 21],
        });
        return { customIcon: icon, containerEl: el };
    }, []);
    const currentScale = isSelected ? zoomScale * 1.25 : zoomScale;

    return (
        <>
            {isSelected && collectible.guide && (
                <>
                    <Polyline
                        positions={[
                            [
                                height - collectible.guide.fromY,
                                collectible.guide.fromX,
                            ],
                            [height - collectible.y, collectible.x],
                        ]}
                        pathOptions={{
                            color: meta.color,
                            dashArray: "6, 8",
                            weight: 3,
                            opacity: 0.9,
                        }}
                    />

                    <Marker
                        position={[
                            height - collectible.guide.fromY,
                            collectible.guide.fromX,
                        ]}
                        icon={guidePointIcon(meta.color)}
                        interactive={false}
                        zIndexOffset={999}
                    />
                </>
            )}

            <Marker
                position={[height - collectible.y, collectible.x]}
                icon={customIcon}
                zIndexOffset={isSelected ? 1000 : 0}
                eventHandlers={{
                    click: () => onSelect(),
                }}
            >
                {createPortal(
                    <motion.div
                        initial={false}
                        animate={{
                            scale: currentScale,
                            opacity: isCompleted && !isSelected ? 0.4 : 1,
                        }}
                        whileHover={{ scale: currentScale * 1.15 }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                        }}
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "100%",
                            cursor: "pointer",
                        }}
                    >
                        <motion.img
                            src={marker.icon}
                            alt=""
                            animate={{
                                boxShadow: isSelected
                                    ? `0 0 0 3px #000000, 0 0 20px ${meta.color}, 0 0 35px ${meta.color}`
                                    : `1px 1px 10px ${meta.color}`,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                                background: meta.color,
                                borderRadius: "100%",
                                padding: "2px",
                            }}
                        />
                    </motion.div>,
                    containerEl,
                )}
            </Marker>
        </>
    );
}

interface TypeMeta {
    color: string;
    label: string;
}

export default function MapMarkers({
    gameId,
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
                                type={type}
                                marker={marker}
                                meta={meta}
                                height={height}
                                isCompleted={isCompleted}
                                isSelected={isSelected}
                                zoomScale={zoomScale}
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
