import { MOD_CATEGORIES } from "@/data/mods/categories";
import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";
import { IconTag } from "@tabler/icons-react";

interface Props {
    mod: ModEntry;
}

export default function ModCategory({ mod }: Props) {
    const i18n = useT();
    const modCategory = MOD_CATEGORIES[mod.category];
    return (
        <div className="flex items-center text-indigo-200 font-medium gap-1.5 bg-(--button-bg-hover) px-4 py-1.5 rounded-full">
            <IconTag size={14} stroke={2.5} />
            <span className="text-xs">{i18n(modCategory.label)}</span>
        </div>
    );
}
