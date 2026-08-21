import { useMemo } from "react";
import type { Song } from "../types/types";

interface UseCurrentTrackReturn {
    currentSong: Song | null;
    currentIndex: number;
    progress: number;
}

export function useCurrentTrack(
    songs: Song[] | undefined,
    currentTime: number,
): UseCurrentTrackReturn {
    return useMemo(() => {
        if (!songs || songs.length === 0) {
            return { currentSong: null, currentIndex: -1, progress: 0 };
        }

        const index = songs.findIndex(
            (song) => currentTime >= song.start && currentTime < song.end,
        );

        if (index === -1) {
            return { currentSong: null, currentIndex: -1, progress: 0 };
        }

        const song = songs[index];
        const elapsed = currentTime - song.start;
        const progress = song.duration > 0 ? elapsed / song.duration : 0;

        return { currentSong: song, currentIndex: index, progress };
    }, [songs, currentTime]);
}