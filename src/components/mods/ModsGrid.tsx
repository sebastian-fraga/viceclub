import ModCard from "@/components/mods/ModCard";
import type { ModEntry } from "@/data/mods/types";

interface Props {
    mods: ModEntry[];
    onSelect: (mod: ModEntry) => void
}

export default function ModsGrid({ mods, onSelect }: Props) {
    return (
        <div className="grid grid-cols-3 max-mobile:grid-cols-1 gap-y-6 gap-x-4">
            {mods.map((mod) => {
                return <ModCard key={mod.id} mod={mod} onSelect={onSelect}/>;
            })}
        </div>
    );
}
