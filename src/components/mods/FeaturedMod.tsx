import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";

interface Props {
    mod: ModEntry;
    onSelect: (mod: ModEntry) => void;
}

export default function FeaturedMod({ mod, onSelect }: Props) {
    const i18n = useT()
    return (
        <>
            <article className="min-h-100 grid grid-cols-2 shadow-2xl shadow-(color:--button-bg)/20 rounded-3xl">
                <div className="flex flex-col pl-12 pt-12 pb-10 gap-4 bg-(--button-bg) rounded-l-3xl">
                    <span className="text-(--game-accent) text-sm font-medium">
                        Destacado
                    </span>
                    <h3 className="text-3xl font-body-condensed">
                        {mod.title}
                    </h3>
                    <span className="max-w-110 text-pretty text-white/85 font-thin">
                        {mod.shortDescription}
                    </span>
                    <div className="mt-auto">
                        <button
                            className="bg-(--game-buttons-primary-background) px-8 py-2.5 rounded-full text-base font-medium text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered) cursor-pointer transition-colors duration-400"
                            onClick={() => onSelect(mod)}
                        >
                            {i18n("mods.seeMod")}
                        </button>
                    </div>
                </div>
                <div className="bg-radial-[at_-40%_-40%] from-(--game-accent)/40 to-50% to-(--button-bg-hover)/30 rounded-r-3xl"></div>
            </article>
        </>
    );
}
