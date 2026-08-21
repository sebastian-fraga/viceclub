import { useCallback } from "react";
import type { Song } from "../types/types";

export function useSongNavigation(
    songs: Song[],
    currentTime: number,
    activeIndex: number,
    seekTo: (time: number) => void,
) {
    const next = useCallback(() => {
        if (songs.length === 0) return;

        const nextSong =
            activeIndex !== -1
                ? songs[(activeIndex + 1) % songs.length]
                : songs.find((s) => Number(s.start) > currentTime);

        if (nextSong) seekTo(Number(nextSong.start));
    }, [songs, activeIndex, currentTime, seekTo]);

    const prev = useCallback(() => {
        if (songs.length === 0) return;

        const prevSong =
            activeIndex !== -1
                ? songs[(activeIndex - 1 + songs.length) % songs.length]
                : [...songs].reverse().find((s) => Number(s.end) < currentTime);

        if (prevSong) seekTo(Number(prevSong.start));
    }, [songs, activeIndex, currentTime, seekTo]);

    return { next, prev };
}