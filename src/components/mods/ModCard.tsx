import ModCategory from "@/components/mods/ModCategory";
import type { ModEntry } from "@/data/mods/types";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import useT from "@/hooks/useT";
import { IconArrowUpRight, IconUser } from "@tabler/icons-react";

interface Props {
    mod: ModEntry;
    onSelect: (mod: ModEntry) => void;
}

export default function ModCard({ mod, onSelect }: Props) {
    const i18n = useT();
    const localizedText = useLocalizedText();

    return (
        <button
            className="group bg-(--button-bg)/80 rounded-2xl p-6 min-h-48 max-w-110 hover:bg-(--button-bg-hover) cursor-pointer transition-colors duration-400 shadow-2xl shadow-(color:--button-bg)/15 flex flex-col text-left focus-visible:outline-2 focus-visible:outline-(--game-accent)"
            onClick={() => onSelect(mod)}
        >
            <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <span className="text-xl font-body-condensed">
                        {mod.title}
                    </span>
                    <ModCategory
                        mod={mod}
                        compact
                        className="shrink-0 transition-colors duration-400 group-hover:bg-white/10"
                    />
                </div>
                <span className="text-sm text-gray-300/90 font-thin">
                    {localizedText(mod.shortDescription)}
                </span>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1 items-center text-xs">
                    <IconUser
                        size={14}
                        stroke={2.5}
                        className="text-(--game-accent)"
                    />
                    <span className="text-gray-300/70">
                        {i18n("mods.createdBy")}
                    </span>
                    <span className="text-gray-300/80 font-medium">
                        {Array.isArray(mod.author)
                            ? mod.author.join(", ")
                            : mod.author}
                    </span>
                </div>
                <IconArrowUpRight
                    size={16}
                    className="text-violet-400/15 transition-all duration-300 group-hover:text-(--game-accent) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </div>
        </button>
    );
}
