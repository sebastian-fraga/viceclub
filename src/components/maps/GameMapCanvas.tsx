import FitToContainer from "@/components/maps/FitToContainer";
import FocusOnMarker from "@/components/maps/FocusOnMarker";
import { useCompletedCollectibles } from "@/components/maps/hooks/useCompletedCollectibles";
import { useMapSelection } from "@/components/maps/hooks/useMapSelection";
import MapMarkerPopup from "@/components/maps/MapMarkerPopup";
import MapMarkers from "@/components/maps/MapMarkers";
import MapSidebar from "@/components/maps/MapSidebar";
import type { CollectibleData } from "@/components/maps/types";
import type { MapCategory } from "@/components/maps/types/categories";
import { CoordinatesPicker } from "@/components/maps/utils/CoordinatesPicker";
import ZoomControls from "@/components/maps/ZoomControls";
import Title from "@/components/ui/Title";
import { gamesList } from "@/config/games";
import useT from "@/hooks/useT";
import type { GameTheme } from "@/types/game";
import { motion } from "framer-motion";
import {
    CRS,
    Transformation,
    type LatLngBoundsExpression,
    type Map as LeafletMap,
} from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer } from "react-leaflet";

export default function GameMapCanvas({
    gameId,
    variantId,
    width,
    height,
    minZoom,
    maxZoom,
    data,
    theme,
}: {
    gameId: string;
    variantId?: string;
    width: number;
    height: number;
    minZoom: number;
    maxZoom: number;
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
    theme: GameTheme;
}) {
    const gameInfo = gamesList.find((item) => item.id === gameId);
    const i18n = useT();

    const imageVariant =
        variantId && variantId !== gameId ? variantId : undefined;

    const mapRef = useRef<LeafletMap | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);

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

    const {
        hiddenTypes,
        isolated,
        selectedMarker,
        selectedCollectible,
        setSelectedCollectible,
        focusTarget,
        handleToggleType,
        visibleData,
    } = useMapSelection({ data, gameId, height });

    const { completedIds, toggleCollectible } = useCompletedCollectibles(
        gameId,
        variantId,
    );

    useEffect(() => {
        if (!selectedCollectible) return;

        const map = mapRef.current;
        const popupEl = popupRef.current;
        if (!map || !popupEl) return;

        const frame = requestAnimationFrame(() => {
            const mapRect = map.getContainer().getBoundingClientRect();
            const popupRect = popupEl.getBoundingClientRect();

            const MARGIN = 32;
            const forbidden = {
                left: popupRect.left - mapRect.left - MARGIN,
                top: popupRect.top - mapRect.top - MARGIN,
                right: popupRect.right - mapRect.left + MARGIN,
                bottom: popupRect.bottom - mapRect.top + MARGIN,
            };

            const latlng: [number, number] = [
                height - selectedCollectible.collectible.y,
                selectedCollectible.collectible.x,
            ];
            const point = map.latLngToContainerPoint(latlng);

            const isHidden =
                point.x > forbidden.left &&
                point.x < forbidden.right &&
                point.y > forbidden.top &&
                point.y < forbidden.bottom;

            if (!isHidden) return;
            const distToLeft = point.x - forbidden.left;
            const distToRight = forbidden.right - point.x;
            const distToTop = point.y - forbidden.top;
            const distToBottom = forbidden.bottom - point.y;
            const minDist = Math.min(
                distToLeft,
                distToRight,
                distToTop,
                distToBottom,
            );

            let targetX = point.x;
            let targetY = point.y;

            if (minDist === distToLeft) targetX = forbidden.left;
            else if (minDist === distToRight) targetX = forbidden.right;
            else if (minDist === distToTop) targetY = forbidden.top;
            else targetY = forbidden.bottom;

            map.panBy([point.x - targetX, point.y - targetY], {
                animate: true,
                duration: 0.35,
            });
        });

        return () => cancelAnimationFrame(frame);
    }, [selectedCollectible, height]);

    return (
        <section className="flex h-full w-full flex-col items-center">
            <div className="max-w-fit py-8 max-xl:py-6 max-mobile:py-4">
                <Title
                    label={i18n("maps.title", {
                        fullName: gameInfo?.fullName,
                    })}
                />
            </div>

            <motion.div
                inherit={false}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex min-h-0 min-w-0 w-full max-w-460 flex-1 gap-3 px-12 pb-12 max-2xl:px-8 max-2xl:pb-8 max-xl:px-6 max-xl:pb-6 max-lg:px-4 max-lg:pb-4 max-mobile:flex-col max-mobile:gap-3 max-mobile:px-3 max-mobile:pb-0"
            >
                <div className="relative min-h-0 min-w-0 flex-1 max-mobile:flex-none">
                    <div className="relative min-h-0 min-w-0 h-full overflow-hidden rounded-4xl bg-slate-800/30 bg-[radial-gradient(color-mix(in_oklab,var(--color-indigo-300)_15%,transparent)_1px,transparent_1px)] bg-size-[22px_22px] shadow-2xl shadow-slate-700/25 max-xl:rounded-3xl max-mobile:mb-0 max-mobile:h-[65vh] max-mobile:min-h-100 max-mobile:max-h-162.5">
                        <MapContainer
                            ref={mapRef}
                            crs={gameCRS}
                            maxBounds={mapBounds}
                            maxBoundsViscosity={1.0}
                            minZoom={minZoom}
                            maxZoom={maxZoom + 2}
                            zoomSnap={0.5}
                            zoomControl={false}
                            attributionControl={false}
                            className="h-full w-full bg-slate-900/70 z-0 "
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
                                variant={imageVariant}
                                height={height}
                                data={visibleData}
                                completedIds={completedIds}
                                selectedId={
                                    selectedCollectible
                                        ? `${selectedCollectible.type}_${selectedCollectible.collectible.id}`
                                        : null
                                }
                                onSelect={(collectible, type, totalForType) => {
                                    const fullTotal =
                                        Object.values(data).find(
                                            (typesRecord) =>
                                                typesRecord?.[type],
                                        )?.[type]?.length ?? totalForType;

                                    setSelectedCollectible({
                                        collectible,
                                        type,
                                        totalForType: fullTotal,
                                    });
                                }}
                            />

                            <FitToContainer
                                bounds={tileBounds}
                                padding={MAP_PADDING}
                            />

                            <FocusOnMarker
                                target={focusTarget}
                                zoom={maxZoom}
                            />

                            <ZoomControls />

                            {selectedCollectible && (
                                <div className="max-mobile:hidden">
                                    <MapMarkerPopup
                                        ref={popupRef}
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
                                        onClose={() =>
                                            setSelectedCollectible(null)
                                        }
                                        gameId={gameId}
                                        variant={imageVariant}
                                        theme={theme}
                                    />
                                </div>
                            )}

                            <div className="pointer-events-none absolute inset-0">
                                <CoordinatesPicker height={height} />
                            </div>
                        </MapContainer>

                        {selectedCollectible &&
                            typeof document !== "undefined" &&
                            document.getElementById("map-main") &&
                            createPortal(
                                <div className="hidden max-mobile:block">
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
                                        onClose={() =>
                                            setSelectedCollectible(null)
                                        }
                                        gameId={gameId}
                                        variant={imageVariant}
                                        theme={theme}
                                    />
                                </div>,
                                document.getElementById("map-main")!,
                            )}
                    </div>
                </div>

                <div className="w-110 shrink-0 max-2xl:w-96 max-xl:w-88 max-lg:w-76 max-mobile:w-full max-mobile:shrink">
                    <MapSidebar
                        gameId={gameId}
                        data={data}
                        completedIds={completedIds}
                        hiddenTypes={hiddenTypes}
                        onToggleType={handleToggleType}
                        theme={theme}
                    />
                </div>
            </motion.div>
        </section>
    );
}
