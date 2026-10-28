import ToggleButton from "@/components/maps/ToggleButton";
import {
    getRenderableTypes,
    getTypeIds,
    isTypeComplete,
    toTri,
    type MarkerMap,
    type SectionData,
} from "@/components/maps/utils/sectionUtils";
import { Tooltip } from "@/components/ui/Tooltip";
import useT from "@/hooks/useT";
import {
    IconCheck,
    IconChevronDown,
    IconEye,
    IconEyeOff,
} from "@tabler/icons-react";

interface SectionHeaderProps {
    section: SectionData;
    markers: MarkerMap;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    onSetTypesHidden: (types: string[], hidden: boolean) => void;
    onSetCompleted: (ids: string[], completed: boolean) => void;
    compact?: boolean;
}

export default function SectionHeader({
    section,
    markers,
    completedIds,
    hiddenTypes,
    isCollapsed,
    onToggleCollapse,
    onSetTypesHidden,
    onSetCompleted,
    compact = false,
}: SectionHeaderProps) {
    const i18n = useT();

    const types = getRenderableTypes(section, markers);
    const typeKeys = types.map(([type]) => type);
    const allIds = types.flatMap(([type, items]) => getTypeIds(type, items));

    const shown = toTri(typeKeys.map((type) => !hiddenTypes.has(type)));
    const done = toTri(
        types.map(([type, items]) => isTypeComplete(type, items, completedIds)),
    );

    const name = i18n(section.label);

    return (
        <div
            className={`flex items-center justify-between gap-3 py-3 mb-2 ${
                compact ? "px-5" : "px-6"
            }`}
        >
            <button
                type="button"
                onClick={onToggleCollapse}
                aria-expanded={!isCollapsed}
                className="group flex min-w-0 cursor-pointer items-center gap-3 rounded-lg py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
                <IconChevronDown
                    size={18}
                    className={`shrink-0 text-white/50 transition duration-200 group-hover:text-white ${
                        isCollapsed ? "rotate-0" : "rotate-180"
                    }`}
                />
                <span
                    className={`truncate font-body-condensed text-white ${
                        compact ? "text-xl" : "text-[22px]"
                    }`}
                >
                    {name}
                </span>
            </button>

            <div className="flex shrink-0 gap-1.5">
                <Tooltip
                    label={i18n(
                        shown === true
                            ? "maps.sidebar.buttons.hideAll"
                            : "maps.sidebar.buttons.showAll",
                        { name },
                    )}
                    position="bottom"
                >
                    <ToggleButton
                        label={i18n(
                            shown === true
                                ? "maps.sidebar.buttons.hideAll"
                                : "maps.sidebar.buttons.showAll",
                            { name },
                        )}
                        pressed={shown}
                        onClick={() =>
                            onSetTypesHidden(typeKeys, shown === true)
                        }
                    >
                        {shown === false ? (
                            <IconEyeOff size={18} />
                        ) : (
                            <IconEye size={18} />
                        )}
                    </ToggleButton>
                </Tooltip>

                <Tooltip
                    label={i18n(
                        done === true
                            ? "maps.sidebar.buttons.unmarkAll"
                            : "maps.sidebar.buttons.markAll",
                        { name },
                    )}
                    position="bottom"
                >
                    <ToggleButton
                        pressed={done}
                        label={i18n(
                            done === true
                                ? "maps.sidebar.buttons.unmarkAll"
                                : "maps.sidebar.buttons.markAll",
                            { name },
                        )}
                        onClick={() => onSetCompleted(allIds, done !== true)}
                    >
                        <IconCheck size={18} stroke={2.5} />
                    </ToggleButton>
                </Tooltip>
            </div>
        </div>
    );
}
