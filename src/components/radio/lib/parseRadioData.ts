import type { RadioStation, Song, Playlist } from "../types/types";

function toArray<T>(value: T | T[] | undefined): T[] {
    if (value === undefined) return [];
    const arr = Array.isArray(value) ? value : [value];
    return arr.filter((item) => Boolean(item) && item !== "") as T[];
}

function slugify(text: string): string {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseSong(raw: { artist: string; title: string; start: string; end: string }): Song {
    const start = parseFloat(raw.start);
    const end = parseFloat(raw.end);
    return { artist: raw.artist, title: raw.title, start, end, duration: end - start };
}

function parsePlaylist(raw: any, fallbackName: string): Playlist {
    const name = raw.name ?? fallbackName;
    return {
        id: slugify(name),
        name,
        djs: toArray(raw.dj),
        genres: toArray(raw.genre),
        audio: raw.audio,
        songs: raw.songs.map(parseSong),
    };
}

export function parseRadioStation(id: string, raw: any): RadioStation {
    const playlists: Playlist[] = raw.playlists
        ? raw.playlists.map((p: any) => parsePlaylist(p, raw.displayName))
        : [parsePlaylist(raw, raw.displayName)];

    return {
        id,
        displayName: raw.displayName,
        image: raw.image,
        playlists,
    };
}

export function parseRadioData(raw: Record<string, any>): RadioStation[] {
    return Object.entries(raw).map(([id, station]) => parseRadioStation(id, station));
}