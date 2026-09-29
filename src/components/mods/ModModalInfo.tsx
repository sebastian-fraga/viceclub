import ModCategory from "@/components/mods/ModCategory";
import type { ModEntry } from "@/data/mods/types";
import { useLocalizedText } from "@/hooks/useLocalizedText";

import { IconUser, IconVersions } from "@tabler/icons-react";

interface Props {
    mod: ModEntry;
}

export default function ModModalInfo({ mod }: Props) {
    const localizedText = useLocalizedText();
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
                <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <p className="min-w-0 font-body-condensed text-4xl max-mobile:text-3xl wrap-break-word">
                        {mod.title}
                    </p>
                    <ModCategory mod={mod} className="shrink-0" />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-200/80">
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
                            className="shrink-0 text-(--game-accent)"
                        />
                        <span className="font-medium">
                            {Array.isArray(mod.author)
                                ? mod.author.join(", ")
                                : mod.author}
                        </span>
                    </div>
                </div>
            </div>

            <span
                className="text-gray-200/90 text-sm/6.5 max-w-180 text-pretty wrap-break-word ml-1"
                dangerouslySetInnerHTML={{
                    __html: localizedText(mod.description),
                }}
            ></span>
        </div>
    );
}
