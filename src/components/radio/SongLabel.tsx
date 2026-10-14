import useT from "@/hooks/useT";
import clsx from "clsx";
import { getSongLabel } from "./lib/getSongLabel";
import type { Song } from "./types/types";

interface SongLabelProps {
    song: Song;
    className?: string;
}

export default function SongLabel({ song, className }: SongLabelProps) {
    const t = useT();
    const label = getSongLabel(song, t);

    if (!label) return null;

    return (
        <span
            className={clsx(
                "shrink-0 rounded-[4px] px-2.25 py-px max-mobile:py-1 font-body-condensed uppercase border border-[color-mix(in_oklch,var(--radio-station-accent)_60%,white)] text-sm max-mobile:text-xs text-white",
                className,
            )}
        >
            {label}
        </span>
    );
}
