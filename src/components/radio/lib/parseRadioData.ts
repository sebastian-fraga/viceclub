import type { GameId } from "@/config/games";
import type {
    RadioStation,
    Song,
    Playlist,
    RawRadioData,
    RawRadioPlaylist,
    RawRadioStation,
    RawRadioSong,
} from "../types/types";
import { getStationAudioUrl } from "./getStationAudioUrl";

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
        type: raw.type,
        order: raw.order,
        start,
        end,
        duration: end - start,
    };
}

function parsePlaylist(
    raw: RawRadioPlaylist | RawRadioStation,
    fallbackName: string,
    audio: string,
): Playlist {
    const name = "name" in raw ? raw.name : fallbackName;

    return {
        id: slugify(name),
        name,
        djs: toArray(raw.dj),
        genres: toArray(raw.genre),
        audio,
        songs: raw.songs.map(parseSong),
    };
}

export function parseRadioStation(
    stationId: string,
    raw: RawRadioStation,
    gameId: GameId,
): RadioStation {
    const playlists = raw.playlists
        ? raw.playlists.map((playlist, index) =>
              parsePlaylist(
                  playlist,
                  raw.displayName,
                  getStationAudioUrl(gameId, stationId, index + 1),
              ),
          )
        : [
              parsePlaylist(
                  raw,
                  raw.displayName,
                  getStationAudioUrl(gameId, stationId),
              ),
          ];

    return {
        id: stationId,
        displayName: raw.displayName,
        displayNameKey: raw.displayNameKey,
        image: raw.image,
        color: raw.color,
        playlists,
    };
}

export function parseRadioData(
    raw: RawRadioData,
    gameId: GameId,
): RadioStation[] {
    return Object.entries(raw).map(([stationId, station]) =>
        parseRadioStation(stationId, station, gameId),
    );
}
