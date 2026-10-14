import type useT from "@/hooks/useT";
import type { Song } from "../types/types";

export function getSongLabel(
    song: Song,
    t: ReturnType<typeof useT>,
): string | null {
    if (!song.type) return null;

    const label = t(`radio.common.${song.type}`);

    return song.order === undefined ? label : `${label} #${song.order}`;
}
