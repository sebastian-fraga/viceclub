import { useMemo, useState, useCallback } from "react";
import type { RadioStation } from "../types/types";
import { useAudioPlayer } from "./useAudioPlayer";

export function useRadioSelection(stations: RadioStation[]) {
    const player = useAudioPlayer();

    const [activeStationId, setActiveStationId] = useState<string | null>(null);
    const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);

    const activeStation = useMemo(
        () => stations.find((s) => s.id === activeStationId) ?? null,
        [stations, activeStationId],
    );

    const activePlaylist = useMemo(
        () => activeStation?.playlists.find((p: { id: string | null; }) => p.id === activePlaylistId) ?? null,
        [activeStation, activePlaylistId],
    );

    const selectStation = useCallback(
        (stationId: string) => {
            const station = stations.find((s) => s.id === stationId);
            if (!station) return;
            const firstPlaylist = station.playlists[0];

            setActiveStationId(stationId);
            setActivePlaylistId(firstPlaylist.id);
            player.load(firstPlaylist.audio, { autoplay: true });
        },
        [stations, player],
    );

    const selectPlaylist = useCallback(
        (playlistId: string) => {
            if (!activeStation) return;
            const playlist = activeStation.playlists.find((p) => p.id === playlistId);
            if (!playlist) return;

            setActivePlaylistId(playlistId);
            player.load(playlist.audio, { autoplay: true });
        },
        [activeStation, player],
    );

    return {
        ...player,
        stations,
        activeStation,
        activePlaylist,
        selectStation,
        selectPlaylist,
    };
}