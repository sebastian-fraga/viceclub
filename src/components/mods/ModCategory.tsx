import { MOD_CATEGORIES } from "@/data/mods/categories";
import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";
import { IconTag } from "@tabler/icons-react";

interface Props {
    mod: ModEntry;
    compact?: boolean;
    className?: string;
}

export default function ModCategory({
    mod,
    compact = false,
    className = "",
}: Props) {
    const i18n = useT();
    const modCategory = MOD_CATEGORIES[mod.category];

    if (!modCategory) return null;

    return (
        <div
            className={`flex items-center whitespace-nowrap text-indigo-200 font-medium gap-1.5 bg-(--button-bg-hover) rounded-full ${
                compact ? "px-3 py-1" : "px-4 py-1.5"
            } ${className}`}
        >
            <IconTag size={compact ? 12 : 14} stroke={2.5} />
            <span className={compact ? "text-[11px]" : "text-xs"}>
                {i18n(modCategory.label)}
            </span>
        </div>
    );
}
