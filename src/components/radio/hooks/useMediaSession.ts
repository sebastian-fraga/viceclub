import { useEffect } from "react";
import type { RadioStation, Song } from "../types/types";

interface Controls {
    play: () => void;
    pause: () => void;
    seekRelative: (s: number) => void;
    next: () => void;
    prev: () => void;
}

export function useMediaSession(
    station: RadioStation | null,
    activeSong: Song | null,
    controls: Controls,
) {

    useEffect(() => {
        if (!("mediaSession" in navigator)) return;

        const title = activeSong ? activeSong.title : (station?.displayName ?? "Radio");
        const artist = activeSong ? (activeSong.artist ?? "") : "Vice Club";
        const artwork = station?.image ?? "";

        navigator.mediaSession.metadata = new MediaMetadata({
            title,
            artist,
            artwork: artwork
                ? [
                    { src: artwork, sizes: "512x512", type: "image/webp" },
                    { src: artwork, sizes: "256x256", type: "image/webp" },
                ]
                : [],
        });

        navigator.mediaSession.setActionHandler("previoustrack", controls.prev);
        navigator.mediaSession.setActionHandler("nexttrack", controls.next);
        navigator.mediaSession.setActionHandler("seekbackward", controls.prev);
        navigator.mediaSession.setActionHandler("seekforward", controls.next);
        navigator.mediaSession.setActionHandler("play", controls.play);
        navigator.mediaSession.setActionHandler("pause", controls.pause);

        return () => {
            navigator.mediaSession.setActionHandler("previoustrack", null);
            navigator.mediaSession.setActionHandler("nexttrack", null);
            navigator.mediaSession.setActionHandler("seekbackward", null);
            navigator.mediaSession.setActionHandler("seekforward", null);
            navigator.mediaSession.setActionHandler("play", null);
            navigator.mediaSession.setActionHandler("pause", null);
        };
    }, [station, activeSong, controls]);
}