import type { ChallengeRequirements } from "@/components/maps/types";
import { getRequirement } from "@/components/maps/utils/getLabels";
import useLocale from "@/hooks/useLocale";
import useT from "@/hooks/useT";
import {
    IconClockFilled,
    IconFlagFilled,
    IconGaugeFilled,
    IconStarFilled,
} from "@tabler/icons-react";

interface RequirementsPanelProps {
    requirements?: ChallengeRequirements;
}

export default function RequirementsPanel({
    requirements,
}: RequirementsPanelProps) {
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
