import { MOD_CATEGORIES } from "@/data/mods/categories";
import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";
import { IconTag, IconUser, IconVersions } from "@tabler/icons-react";

interface Props {
    mod: ModEntry;
}

export default function ModModalInfo({ mod }: Props) {
    const i18n = useT();
    const modCategory = MOD_CATEGORIES[mod.category];
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
                <div className="flex w-full justify-between items-center">
                    <p className="font-body-condensed text-4xl">{mod.title}</p>
                    <div className="flex items-center text-indigo-200 font-medium gap-1.5 bg-(--button-bg) px-4 py-1.5 rounded-full">
                        <IconTag size={14} stroke={2.5} />
                        <span className="text-xs">
                            {i18n(modCategory.label)}
                        </span>
                    </div>
                </div>
                <div className="flex gap-4 justify-end text-xs text-slate-200/80">
                    {mod.version && (
                        <div className="flex items-center gap-1">
                            <IconVersions
                                size={14}
                                stroke={2.5}
                                className="text-(--game-accent)"
                            />
                            <span className="font-medium">v{mod.version}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <IconUser
                            size={14}
                            stroke={2.5}
                            className="text-(--game-accent)"
                        />
                        <span className="font-medium">{mod.author} </span>
                    </div>
                    <div></div>
                </div>
            </div>

            <span className="text-gray-200/90 text-sm/6.5 max-w-180 text-pretty ml-1">
                {mod.description}
            </span>
        </div>
    );
}
