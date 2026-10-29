import useT from "@/hooks/useT";
import clsx from "clsx";
import { getSongLabel } from "./lib/getSongLabel";
import type { Song } from "./types/types";

interface SongLabelProps {
    song: Song;
    className?: string;
    isActive: boolean
}

export default function SongLabel({ song, className, isActive }: SongLabelProps) {
    const t = useT();
    const label = getSongLabel(song, t);

    if (!label) return null;

    return (
        <span
            className={clsx(
                "shrink-0 rounded-[4px] px-2.25 py-px max-mobile:py-0.5 max-mobile:px-1.75 font-body-condensed uppercase border text-sm max-mobile:text-xs transition",
                className,
                isActive
                    ? "text-white bg-[color-mix(in_oklch,var(--radio-station-accent)_90%,white)] border-transparent"
                    : "text-white border-[color-mix(in_oklch,var(--radio-station-accent)_60%,white)]",
            )}
        >
            {label}
        </span>
    );
}
