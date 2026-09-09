import type {
    ChallengeRequirements,
    CollectibleData,
} from "@/components/maps/types";
import { getTypeMeta } from "@/components/maps/types/categories";
import {
    getDescription,
    getRequirement,
} from "@/components/maps/utils/getLabels";
import useLocale from "@/hooks/useLocale";
import useT from "@/hooks/useT";
import {
    IconClockFilled,
    IconFlagFilled,
    IconGaugeFilled,
    IconPhotoOff,
    IconStarFilled,
    IconX,
} from "@tabler/icons-react";
import { memo } from "react";

interface MapMarkerPopupProps {
    collectible: CollectibleData;
    type: string;
    totalForType: number;
    isCompleted: boolean;
    onToggleComplete: (id: string) => void;
    onClose: () => void;
}

function RequirementsPanel({
    requirements,
}: {
    requirements?: ChallengeRequirements;
}) {
    const i18n = useT();
    const lang = useLocale();
    if (!requirements) return null;

    const { schedule, minLevel, availableAfter, unlockedBy } = requirements;

    if (!schedule && !minLevel && !availableAfter && !unlockedBy) return null;

    return (
        <div className="flex flex-col gap-5 rounded-xl border border-(--button-bg)/60 bg-(--button-bg-hover) p-3.5">
            {schedule && (
                <div className="flex items-center gap-2.5 text-sm">
                    <IconClockFilled
                        size={18}
                        className="shrink-0 text-(--game-accent)"
                        stroke={1.5}
                    />
                    <span className="font-body-condensed text-white">
                        {getRequirement(schedule.from, lang)} –{" "}
                        {getRequirement(schedule.to, lang)}
                    </span>
                </div>
            )}

            {minLevel && (
                <div className="flex items-start gap-2.5 text-sm text-white/70">
                    <IconGaugeFilled
                        size={18}
                        className="mt-0.5 shrink-0 text-(--game-accent)"
                        stroke={1.5}
                    />

                    <div className="leading-tight text-pretty">
                        <span>
                            {i18n("maps.markers.popup.requirements.minLevel", {
                                skill: i18n(`maps.skills.${minLevel.skill}`),
                            })}
                        </span>

                        <div className="mt-1 ml-0.5 flex flex-col gap-0.5 text-xs">
                            <strong className="font-semibold text-white">
                                {minLevel.value}
                            </strong>
                        </div>
                    </div>
                </div>
            )}

            {availableAfter && availableAfter.length > 0 && (
                <div className="flex items-start gap-2.5 text-sm text-white/70">
                    <IconStarFilled
                        size={18}
                        className="mt-0.5 shrink-0 text-(--game-accent)"
                        stroke={1.5}
                    />

                    <div className="leading-tight">
                        <span>
                            {i18n(
                                "maps.markers.popup.requirements.availableAfter",
                            )}
                        </span>

                        <div className="mt-1 ml-0.5 flex flex-col gap-0.5 text-xs">
                            {availableAfter.map((requirement, index) => (
                                <strong
                                    key={index}
                                    className="font-semibold text-white"
                                >
                                    {getRequirement(requirement, lang)}
                                </strong>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {unlockedBy && unlockedBy.length > 0 && (
                <div className="flex items-start gap-2.5 text-sm text-white/70">
                    <IconFlagFilled
                        size={18}
                        className="mt-0.5 shrink-0 text-(--game-accent)"
                        stroke={1.5}
                    />

                    <div className="leading-tight">
                        <span>
                            {i18n("maps.markers.popup.requirements.unlockedBy")}
                        </span>

                        <div className="mt-1 ml-0.5 flex flex-col gap-0.5 text-xs">
                            {unlockedBy.map((requirement, index) => (
                                <strong
                                    key={index}
                                    className="font-semibold text-white"
                                >
                                    {getRequirement(requirement, lang)}
                                </strong>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MapMarkerPopup({
    collectible,
    type,
    totalForType,
    isCompleted,
    onToggleComplete,
    onClose,
}: MapMarkerPopupProps) {
    const i18n = useT();
    const lang = useLocale();
    const meta = getTypeMeta(type);
    if (!meta) return null;

    const displayLabel = meta?.singularLabel
        ? i18n(meta.singularLabel)
        : i18n(meta.label);

    return (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="absolute z-2000 top-4 left-4 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-(--button-bg)/90 text-white shadow-2xl shadow-black/70 backdrop-blur-md max-mobile:top-auto max-mobile:right-3 max-mobile:bottom-3 max-mobile:left-3 max-mobile:w-auto max-mobile:max-h-full max-mobile:rounded-2xl"
        >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="font-body-condensed text-lg">
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
                    className="z-10 p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 transition cursor-pointer"
                >
                    <IconX size={18} />
                </button>
            </div>

            <div className="flex flex-col gap-4 px-4 py-4 font-body max-mobile:gap-3 max-mobile:px-3 max-mobile:py-3">
                <p className="text-sm leading-relaxed text-white/80">
                    {collectible.description
                        ? getDescription(collectible.description, lang)
                        : ""}
                </p>

                <RequirementsPanel requirements={collectible.requirements} />

                <div>
                    {collectible.image ? (
                        <img
                            src={collectible.image}
                            alt={
                                type ??
                                i18n("maps.accessibility.collectibleImage")
                            }
                            className="rounded-2xl shadow-2xl shadow-(--game-accent)/20"
                        />
                    ) : (
                        <div className="flex flex-col gap-2 h-48 max-mobile:h-32 w-full items-center justify-center rounded-2xl border border-(--button-bg)/60 bg-(--button-bg-hover) text-sm text-white/40">
                            <IconPhotoOff />
                            <span>
                                {i18n("maps.markers.popup.notFoundImage")}
                            </span>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => onToggleComplete(collectible.id)}
                    className={`flex items-center justify-center gap-2 w-full rounded-full px-4 py-3 font-medium text-sm transition duration-300 cursor-pointer ${
                        isCompleted
                            ? "bg-(--game-buttons-secondary-background) text-(--game-buttons-secondary-text) border border-(--game-buttons-secondary-border)/20 hover:bg-(--game-buttons-secondary-hovered)"
                            : "bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered)"
                    }`}
                >
                    {isCompleted ? (
                        <>{i18n("maps.markers.popup.completed")}</>
                    ) : (
                        <>{i18n("maps.markers.popup.markAsCompleted")}</>
                    )}
                </button>
            </div>
        </div>
    );
}

export default memo(MapMarkerPopup);
