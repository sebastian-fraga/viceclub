import { useEffect, useRef } from "react";
import { useIsMobile } from "./useIsMobile";
import useSettings from "@/hooks/useSettings";

interface SidebarSoundsOptions {
    selector?: string;
    volume?: number;
}

type SoundKind = "hover" | "select";

function soundUrl(kind: SoundKind, gameId: string) {
    return kind === "hover"
        ? `/assets/sounds/hover_${gameId}.wav`
        : `/assets/sounds/select_${gameId}.wav`;
}

export function useSidebarSounds(
    sidebarRef: React.RefObject<HTMLElement>,
    { selector = "[data-game-id]", volume = 0.4 }: SidebarSoundsOptions = {},
) {
    const isMobile = useIsMobile();
    const settingsHook = useSettings();
    const soundsOn = !!settingsHook?.settings?.sounds;

    const cache = useRef<Map<string, HTMLAudioElement>>(new Map());
    const lastHovered = useRef<Element | null>(null);
    const pendingGameId = useRef<string | null>(null);

    useEffect(() => {
        if (!soundsOn) {
            for (const audio of cache.current.values()) {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                } catch {}
            }

            pendingGameId.current = null;
            lastHovered.current = null;
        }
    }, [soundsOn]);

    const getAudio = (kind: SoundKind, gameId: string) => {
        const key = `${kind}:${gameId}`;
        let audio = cache.current.get(key);

        if (audio === undefined) {
            const url = soundUrl(kind, gameId);
            audio = new Audio(url);
            audio.preload = "auto";
            cache.current.set(key, audio);
        }

        audio.volume = volume;

        return audio;
    };

    const play = (kind: SoundKind, gameId: string) => {
        if (!soundsOn) {
            return;
        }

        const audio = getAudio(kind, gameId);
        audio.currentTime = 0;

        audio.play().catch(() => {});
    };

    useEffect(() => {
        const container = sidebarRef.current;

        if (!container || isMobile || !soundsOn) {
            return;
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(
                selector,
            ) as HTMLElement | null;

            const gameId = target?.dataset.gameId;

            if (target && gameId && target !== lastHovered.current) {
                lastHovered.current = target;
                play("hover", gameId);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(selector);
            const related = (e.relatedTarget as HTMLElement | null)?.closest(
                selector,
            );

            if (target && target !== related) {
                lastHovered.current = null;
            }
        };

        container.addEventListener("mouseover", handleMouseOver);
        container.addEventListener("mouseout", handleMouseOut);

        return () => {
            container.removeEventListener("mouseover", handleMouseOver);
            container.removeEventListener("mouseout", handleMouseOut);
        };
    }, [selector, isMobile, volume, soundsOn, sidebarRef]);

    useEffect(() => {
        if (!soundsOn) {
            return;
        }

        const handlePointerDown = (e: PointerEvent) => {
            const targetEl = e.target as HTMLElement | null;

            if (!targetEl) {
                return;
            }

            if (!sidebarRef.current || !sidebarRef.current.contains(targetEl)) {
                return;
            }

            const target = targetEl.closest(selector) as HTMLElement | null;
            const gameId = target?.dataset.gameId;

            if (!gameId) {
                return;
            }

            pendingGameId.current = gameId;

            try {
                const audio = getAudio("select", gameId);

                audio
                    .play()
                    .then(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    })
                    .catch(() => {});
            } catch {}
        };

        document.addEventListener("pointerdown", handlePointerDown, {
            passive: true,
            capture: true,
        });

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, {
                capture: true,
            } as any);
        };
    }, [selector, volume, sidebarRef, soundsOn]);

    useEffect(() => {
        const handleAfterSwap = () => {
            if (!soundsOn) {
                pendingGameId.current = null;
                return;
            }

            if (pendingGameId.current) {
                play("select", pendingGameId.current);
                pendingGameId.current = null;
            }
        };

        document.addEventListener("astro:after-swap", handleAfterSwap);

        return () =>
            document.removeEventListener("astro:after-swap", handleAfterSwap);
    }, [soundsOn, volume]);
}
