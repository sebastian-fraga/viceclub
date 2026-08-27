import type {
    RadioStation,
    Song,
    Playlist,
    RawRadioData,
    RawRadioPlaylist,
    RawRadioStation,
    RawRadioSong,
} from "../types/types";

function toArray<T>(value: T | T[] | undefined): T[] {
    if (value === undefined) return [];

    return (Array.isArray(value) ? value : [value]).filter(
        (item) => Boolean(item) && item !== "",
    ) as T[];
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function parseSong(raw: RawRadioSong): Song {
    const start = Number(raw.start);
    const end = Number(raw.end);

    return {
        artist: raw.artist,
        title: raw.title,
        start,
        end,
        duration: end - start,
    };
}

function parsePlaylist(
    raw: RawRadioPlaylist | RawRadioStation,
    fallbackName: string,
): Playlist {
    const name = "name" in raw ? raw.name : fallbackName;

    return {
        id: slugify(name),
        name,
        djs: toArray(raw.dj),
        genres: toArray(raw.genre),
        audio: raw.audio,
        songs: raw.songs.map(parseSong),
    };
}

export function parseRadioStation(
    id: string,
    raw: RawRadioStation,
): RadioStation {
    const playlists = raw.playlists
        ? raw.playlists.map((playlist) =>
              parsePlaylist(playlist, raw.displayName),
          )
        : [parsePlaylist(raw, raw.displayName)];

    return {
        id,
        displayName: raw.displayName,
        image: raw.image,
        playlists,
    };
}

export function parseRadioData(raw: RawRadioData): RadioStation[] {
    return Object.entries(raw).map(([id, station]) =>
        parseRadioStation(id, station),
    );
}
