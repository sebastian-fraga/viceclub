import FitToContainer from "@/components/maps/FitToContainer";
import MapMarkerPopup from "@/components/maps/MapMarkerPopup";
import MapMarkers from "@/components/maps/MapMarkers";
import MapSidebar from "@/components/maps/MapSidebar";
import type { CollectibleData } from "@/components/maps/types";
import type { MapCategory } from "@/components/maps/types/categories";
import { CoordinatesPicker } from "@/components/maps/utils/CoordinatesPicker";
import ZoomControls from "@/components/maps/ZoomControls";
import Title from "@/components/ui/Title";
import { gamesList } from "@/config/games";
import useLocale from "@/hooks/useLocale";
import useT from "@/hooks/useT";
import { CRS, Transformation, type LatLngBoundsExpression } from "leaflet";
import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export default function GameMapCanvas({
    gameId,
    width,
    height,
    minZoom,
    maxZoom,
    data,
}: {
    gameId: string;
    width: number;
    height: number;
    minZoom: number;
    maxZoom: number;
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
}) {
    const gameInfo = gamesList.find((item) => item.id === gameId);
    const i18n = useT();
    const lang = useLocale();

    const [selectedCollectible, setSelectedCollectible] = useState<{
        type: string;
        collectible: CollectibleData;
        totalForType: number;
    } | null>(null);

    const MAP_PADDING = 150;

    const mapBounds: LatLngBoundsExpression = useMemo(
        () => [
            [-MAP_PADDING, -MAP_PADDING],
            [height + MAP_PADDING, width + MAP_PADDING],
        ],
        [height, width],
    );

    const tileBounds: LatLngBoundsExpression = useMemo(
        () => [
            [0, 0],
            [height, width],
        ],
        [height, width],
    );

    const gameCRS = useMemo(() => {
        const scale = 1 / Math.pow(2, maxZoom);

        return {
            ...CRS.Simple,
            transformation: new Transformation(scale, 0, scale, 0),
        };
    }, [maxZoom]);

    const tilesUrl = useMemo(
        () => `/assets/images/maps/${gameId}/tiles/{z}/{x}/{y}.png`,
        [gameId],
    );

    const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set());

    const handleToggleType = (type: string) => {
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
        if (hiddenTypes.size === 0) return data;

        const result: Partial<
            Record<MapCategory, Record<string, CollectibleData[]>>
        > = {};

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
    }, [data, hiddenTypes]);

    const storageKey = `completed_collectibles_${gameId}`;

    const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
        if (typeof window === "undefined") return new Set();

        try {
            const saved = localStorage.getItem(storageKey);

            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    const toggleCollectible = (id: string) => {
        setCompletedIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));

            return next;
        });
    };

    return (
        <section className="flex h-full w-full flex-col items-center">
            <div className="max-w-fit py-8 max-xl:py-6 max-mobile:py-4">
                <Title
                    label={i18n("maps.title", {
                        fullName: gameInfo?.fullName,
                    })}
                />
            </div>

            <div className="flex min-h-0 min-w-0 w-full max-w-400 flex-1 gap-3 px-12 pb-12 max-2xl:px-8 max-2xl:pb-8 max-xl:px-6 max-xl:pb-6 max-lg:px-4 max-lg:pb-4 max-mobile:flex-col max-mobile:gap-3 max-mobile:px-3 max-mobile:pb-0">
                <div className="relative min-h-0 min-w-0 flex-1 max-mobile:flex-none">
                    <div className="relative min-h-0 min-w-0 h-full overflow-hidden rounded-4xl bg-slate-800/30 bg-[radial-gradient(color-mix(in_oklab,var(--color-indigo-300)_15%,transparent)_1px,transparent_1px)] bg-size-[22px_22px] shadow-2xl shadow-slate-700/25 max-xl:rounded-3xl max-mobile:mb-0 max-mobile:h-[65vh] max-mobile:min-h-100 max-mobile:max-h-162.5">
                        <MapContainer
                            crs={gameCRS}
                            maxBounds={mapBounds}
                            maxBoundsViscosity={1.0}
                            minZoom={minZoom}
                            maxZoom={maxZoom + 2}
                            zoomSnap={0.5}
                            zoomControl={false}
                            attributionControl={false}
                            className="h-full w-full bg-slate-900/70"
                        >
                            <TileLayer
                                url={tilesUrl}
                                bounds={tileBounds}
                                noWrap
                                tileSize={256}
                                maxNativeZoom={maxZoom}
                            />

                            <MapMarkers
                                gameId={gameId}
                                height={height}
                                data={visibleData}
                                completedIds={completedIds}
                                selectedId={
                                    selectedCollectible
                                        ? `${selectedCollectible.type}_${selectedCollectible.collectible.id}`
                                        : null
                                }
                                onSelect={(collectible, type, totalForType) =>
                                    setSelectedCollectible({
                                        collectible,
                                        type,
                                        totalForType,
                                    })
                                }
                            />

                            <FitToContainer
                                bounds={tileBounds}
                                padding={MAP_PADDING}
                            />
                            <ZoomControls />

                            {selectedCollectible && (
                                <MapMarkerPopup
                                    collectible={
                                        selectedCollectible.collectible
                                    }
                                    type={selectedCollectible.type}
                                    totalForType={
                                        selectedCollectible.totalForType
                                    }
                                    isCompleted={completedIds.has(
                                        `${selectedCollectible.type}_${selectedCollectible.collectible.id}`,
                                    )}
                                    onToggleComplete={() =>
                                        toggleCollectible(
                                            `${selectedCollectible.type}_${selectedCollectible.collectible.id}`,
                                        )
                                    }
                                    onClose={() => setSelectedCollectible(null)}
                                />
                            )}

                            <div className="pointer-events-none absolute inset-0">
                                <CoordinatesPicker />
                            </div>
                        </MapContainer>
                    </div>
                </div>

                <div className="w-110 shrink-0 max-2xl:w-96 max-xl:w-88 max-lg:w-76 max-mobile:w-full max-mobile:shrink">
                    <MapSidebar
                        gameId={gameId}
                        data={data}
                        completedIds={completedIds}
                        hiddenTypes={hiddenTypes}
                        onToggleType={handleToggleType}
                    />
                </div>
            </div>
        </section>
    );
}
