import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";

interface Props {
    mod: ModEntry;
    onSelect: (mod: ModEntry) => void;
}

export default function ModCard({ mod, onSelect }: Props) {
    const i18n = useT();
    return (
        <button
            className="bg-(--button-bg) rounded-2xl p-6 min-h-60 max-w-110 hover:bg-(--button-bg-hover) cursor-pointer transition-colors duration-400 shadow-2xl shadow-(color:--button-bg)/15 flex flex-col text-left"
            onClick={() => onSelect(mod)}
        >
            <div className="flex flex-col gap-6 flex-1">
                <span className="text-xl font-body-condensed">{mod.title}</span>
                <span className="text-sm text-gray-300/90 font-thin">
                    {mod.shortDescription}
                </span>
            </div>
            <div className="flex flex-col">
                <div className="flex gap-1 items-center text-xs">
                    <span className="text-gray-300/70">
                        {i18n("mods.createdBy")}
                    </span>
                    <span className="text-gray-300/80 font-medium">
                        {Array.isArray(mod.author)
                            ? mod.author.join(", ")
                            : mod.author}
                    </span>
                </div>
            </div>
        </button>
    );
}
