import type { Song } from "../types/types";

interface SeekTarget {
    time: number;
}

export function getNextSeekTarget(songs: Song[], currentTime: number, currentIndex: number): SeekTarget {
    const next = currentIndex !== -1
        ? songs[currentIndex + 1]
        : songs.find((song) => song.start > currentTime);

    if (next) return { time: next.start };

    const lastSong = songs[songs.length - 1];
    return { time: lastSong.end };
}

export function getPrevSeekTarget(songs: Song[], currentTime: number, currentIndex: number): SeekTarget {
    const prev = currentIndex !== -1
        ? songs[currentIndex - 1]
        : [...songs].reverse().find((song) => song.end <= currentTime);

    if (prev) return { time: prev.start };

    return { time: 0 };
}