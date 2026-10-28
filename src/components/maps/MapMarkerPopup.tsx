import RequirementsPanel from "@/components/maps/RequirementsPanel";
import type { CollectibleData } from "@/components/maps/types";
import { getTypeMeta } from "@/components/maps/types/categories";
import {
    COLLECTIBLE_IMAGE_SIZES,
    getCollectibleImageSrcSet,
    getCollectibleImageUrl,
    getThumbWidthFromUrl,
} from "@/components/maps/utils/collectibleImage";
import { getDescription } from "@/components/maps/utils/getLabels";
import useLocale from "@/hooks/useLocale";
import useT from "@/hooks/useT";
import { themeToCssVars } from "@/lib/theme";
import type { GameTheme } from "@/types/game";
import { IconPhotoOff, IconX } from "@tabler/icons-react";
import { forwardRef, memo, useState } from "react";

interface MapMarkerPopupProps {
    collectible: CollectibleData;
    type: string;
    gameId: string;
    variant?: string;
    totalForType: number;
    isCompleted: boolean;
    onToggleComplete: (id: string) => void;
    onClose: () => void;
    theme: GameTheme
}

const MapMarkerPopup = forwardRef<HTMLDivElement, MapMarkerPopupProps>(
    function MapMarkerPopup(
        {
            collectible,
            type,
            gameId,
            variant,
            totalForType,
            isCompleted,
            onToggleComplete,
            onClose,
            theme,
        },
        ref,
    ) {
        const i18n = useT();
        const lang = useLocale();

        const [failedSrc, setFailedSrc] = useState<string | null>(null);
        const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
        const [thumbFailures, setThumbFailures] = useState<{
            src: string;
            widths: number[];
        } | null>(null);

        const meta = getTypeMeta(type);
        if (!meta) return null;

        const displayLabel = meta?.singularLabel
            ? i18n(meta.singularLabel)
            : i18n(meta.label);

        const imageSrc = getCollectibleImageUrl(
            gameId,
            variant,
            type,
            collectible.id,
        );
        const imageFailed = failedSrc === imageSrc;
        const imageLoaded = loadedSrc === imageSrc;

        const failedThumbWidths =
            thumbFailures?.src === imageSrc ? thumbFailures.widths : [];

        const thumbSrcSet = getCollectibleImageSrcSet(
            gameId,
            variant,
            type,
            collectible.id,
            failedThumbWidths,
        );
        const useThumbs = thumbSrcSet.length > 0;

        return (
            <div
                ref={ref}
                data-lenis-prevent
                onMouseDown={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                className="absolute z-2000 top-4 left-4 w-[min(22rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl bg-(--button-bg)/90 text-white shadow-2xl shadow-black/70 backdrop-blur-md max-mobile:fixed max-mobile:inset-x-3 max-mobile:top-auto max-mobile:bottom-3 max-mobile:w-auto max-mobile:max-h-[calc(100dvh-6rem)]"
                style={themeToCssVars(theme)}
            >
                <div className="flex flex-col gap-4 p-4 font-body max-mobile:gap-3 max-mobile:p-3">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                            <span className="truncate font-body-condensed text-lg">
                                {displayLabel}
                            </span>

                            {totalForType > 1 && (
                                <span className="shrink-0 rounded-[4px] bg-(--button-bg) px-2 py-0.5 font-body-condensed text-sm">
                                    {collectible.id}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={i18n("common.accessibility.close")}
                            className="shrink-0 cursor-pointer rounded-lg bg-white/5 p-1.5 text-slate-400 transition hover:text-white"
                        >
                            <IconX size={18} />
                        </button>
                    </div>

                    {collectible.description && (
                        <p className="text-[13px] leading-relaxed text-pretty text-white/80">
                            {getDescription(collectible.description, lang)}
                        </p>
                    )}

                    <RequirementsPanel
                        requirements={collectible.requirements}
                    />

                    <div className="relative overflow-hidden rounded-md shadow-2xl shadow-(color:--game-accent)/20">
                        {!imageLoaded && !imageFailed && (
                            <div className="absolute inset-0 animate-pulse rounded-md bg-(--button-bg-hover)" />
                        )}

                        {imageFailed ? (
                            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-(--button-bg)/60 bg-(--button-bg-hover) text-sm text-white/40">
                                <IconPhotoOff />
                                <span>
                                    {i18n("common.other.notFoundImage")}
                                </span>
                            </div>
                        ) : (
                            <img
                                src={imageSrc}
                                srcSet={useThumbs ? thumbSrcSet : undefined}
                                sizes={COLLECTIBLE_IMAGE_SIZES}
                                alt={displayLabel}
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                width={640}
                                height={360}
                                onLoad={() => setLoadedSrc(imageSrc)}
                                onError={(event) => {
                                    const currentSrc =
                                        event.currentTarget.currentSrc ?? "";

                                    const failedWidth =
                                        getThumbWidthFromUrl(currentSrc);

                                    if (failedWidth !== undefined) {
                                        setThumbFailures((prev) => {
                                            const widths =
                                                prev?.src === imageSrc
                                                    ? prev.widths
                                                    : [];

                                            if (widths.includes(failedWidth))
                                                return prev;

                                            return {
                                                src: imageSrc,
                                                widths: [
                                                    ...widths,
                                                    failedWidth,
                                                ],
                                            };
                                        });

                                        return;
                                    }

                                    if (currentSrc !== imageSrc) return;

                                    setFailedSrc(imageSrc);
                                }}
                                className="aspect-video h-full w-full rounded-md object-cover"
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => onToggleComplete(collectible.id)}
                        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-colors duration-500 ${
                            isCompleted
                                ? "bg-(--game-buttons-primary-background)/5 text-(--game-buttons-secondary-text) border-(--game-buttons-secondary-border)/20 hover:bg-(--game-buttons-secondary-hovered)"
                                : "bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) border-transparent hover:bg-(--game-buttons-primary-hovered)"
                        }`}
                    >
                        {isCompleted
                            ? i18n("maps.markers.popup.completed")
                            : i18n("maps.markers.popup.markAsCompleted")}
                    </button>
                </div>
            </div>
        );
    },
);

export default memo(MapMarkerPopup);
