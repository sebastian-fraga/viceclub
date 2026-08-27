import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isSeekingRef = useRef(false);
    const targetTimeRef = useRef<number | null>(null);
    const pendingSeekRef = useRef<number | null>(null);
    const pendingAutoplayRef = useRef(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSeeking, setIsSeekingState] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [volume, setVolumeState] = useState(1);

    useEffect(() => {
        const savedVolume = localStorage.getItem("radio-volume");

        if (savedVolume === null) return;

        const parsedVolume = parseFloat(savedVolume);

        if (!Number.isFinite(parsedVolume)) return;

        setVolumeState(Math.max(0, Math.min(1, parsedVolume)));
    }, []);

    const setVolume = useCallback((value: number) => {
        const clamped = Math.max(0, Math.min(1, value));

        setVolumeState(clamped);
        localStorage.setItem("radio-volume", clamped.toString());

        if (audioRef.current) {
            audioRef.current.volume = clamped;
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const setIsSeeking = (val: boolean) => {
        isSeekingRef.current = val;
        setIsSeekingState(val);
    };

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const p = audio.play();

        if (p !== undefined) {
            p.then(() => setIsPlaying(true)).catch((err: DOMException) => {
                if (err.name === "NotAllowedError") {
                    console.warn("Autoplay bloqueado por el navegador.");
                    setIsPlaying(false);
                } else if (err.name !== "AbortError") {
                    console.error("Error al reproducir:", err);
                }
            });
        }
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
        isPlaying ? pause() : play();
    }, [isPlaying, play, pause]);

    const seekTo = useCallback((time: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!isFinite(audio.duration)) {
            pendingSeekRef.current = time;
            return;
        }

        const clamped = Math.max(0, Math.min(time, audio.duration));

        setIsSeeking(true);
        audio.currentTime = clamped;
        setCurrentTime(clamped);
    }, []);

    const seekRelative = useCallback(
        (seconds: number) => {
            const audio = audioRef.current;
            if (!audio || isSeekingRef.current) return;

            const newTime = Math.max(
                0,
                Math.min(audio.currentTime + seconds, audio.duration),
            );

            seekTo(newTime);
        },
        [seekTo],
    );

    const load = useCallback(
        (src: string, options?: { autoplay?: boolean }) => {
            const audio = audioRef.current;
            if (!audio) return;

            const autoplay = options?.autoplay ?? true;

            pendingAutoplayRef.current = autoplay;

            setCurrentTime(0);
            setDuration(0);

            audio.src = `${src}?v=${Date.now()}`;
            audio.load();
        },
        [],
    );

    const stop = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.src = "";

        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, []);

    useEffect(() => {
        const audio = new Audio();

        audio.volume = volume;
        audioRef.current = audio;

        const onLoadStart = () => setIsLoading(true);

        const onCanPlay = () => {
            setIsLoading(false);

            if (pendingAutoplayRef.current) {
                play();
            }
        };

        const onTimeUpdate = () => {
            if (isSeekingRef.current) return;

            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const onEnded = () => setIsPlaying(false);

        const onSeeked = () => {
            setIsSeeking(false);

            if (targetTimeRef.current !== null) {
                audio.currentTime = targetTimeRef.current;
                targetTimeRef.current = null;
            }
        };

        const onLoadedMetadata = () => {
            setDuration(audio.duration || 0);

            if (pendingSeekRef.current !== null) {
                const t = pendingSeekRef.current;
                pendingSeekRef.current = null;
                seekTo(t);
            }
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener("loadstart", onLoadStart);
        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("seeked", onSeeked);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);

        return () => {
            audio.removeEventListener("loadstart", onLoadStart);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("seeked", onSeeked);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);

            audio.pause();
            audioRef.current = null;
        };
    }, [play, seekTo]);

    return {
        audioRef,
        isPlaying,
        isLoading,
        isSeeking,
        currentTime,
        duration,
        volume,
        load,
        play,
        pause,
        togglePlay,
        seekTo,
        seekRelative,
        setVolume,
        stop,
    };
}
