import type { ModEntry, ModRequirementsData } from "@/data/mods/types"; // ajustá la ruta
import useT from "@/hooks/useT";
import { IconArrowUpRight, IconDeviceGamepad2 } from "@tabler/icons-react";

interface Props {
    requirements?: ModRequirementsData;
    allMods?: ModEntry[];
    onSelectMod?: (id: string) => void;
}

const CHIP_BASE =
    "flex items-center justify-center gap-2 px-3.5 py-2 max-mobile:py-2.5 text-xs rounded-full min-w-30 max-mobile:min-w-0";

const VERSION_CHIP = `${CHIP_BASE} bg-white/5 text-slate-300 cursor-default`;

const MOD_CHIP = `${CHIP_BASE} group bg-(--button-bg) text-indigo-100 cursor-pointer transition-[filter] hover:brightness-125 focus-visible:outline-2 focus-visible:outline-indigo-300`;

export default function ModRequirements({
    requirements,
    allMods = [],
    onSelectMod,
}: Props) {
    const i18n = useT();

    const gameVersion = requirements?.gameVersion;
    const requiredMods = (requirements?.mods ?? [])
        .map((id) => allMods.find((mod) => mod.id === id))
        .filter((mod): mod is ModEntry => mod !== undefined);

    if (!gameVersion && requiredMods.length === 0) return null;

    return (
        <div className="flex flex-col gap-1">
            <span className="font-body-condensed text-2xl">
                {i18n("mods.modal.requirements")}
            </span>
            <div className="flex flex-wrap gap-2 mt-1 ml-1">
                {gameVersion && (
                    <span className={VERSION_CHIP}>
                        <IconDeviceGamepad2 size={14} />
                        {i18n("mods.modal.gameVersion")} {gameVersion}
                    </span>
                )}
                {requiredMods.map((mod) => (
                    <button
                        type="button"
                        key={mod.id}
                        onClick={() => onSelectMod?.(mod.id)}
                        className={MOD_CHIP}
                    >
                        {mod.title}
                        <IconArrowUpRight
                            size={14}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
