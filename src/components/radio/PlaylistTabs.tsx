import useT from "@/hooks/useT";
import clsx from "clsx";

import { ScrollableChips } from "./ScrollableChips";
import { translateRadioText } from "./lib/translateRadioText";
import type { Playlist } from "./types/types";

interface PlaylistTabsProps {
    playlists: Playlist[];
    activePlaylistId: string;
    onSelect: (playlistId: string) => void;
}

export function PlaylistTabs({
    playlists,
    activePlaylistId,
    onSelect,
}: PlaylistTabsProps) {
    const t = useT();

    if (playlists.length <= 1) return null;

    return (
        <ScrollableChips contentKey={playlists}>
            {playlists.map((playlist) => {
                const isActive = playlist.id === activePlaylistId;

                return (
                    <button
                        key={playlist.id}
                        onClick={() => onSelect(playlist.id)}
                        aria-pressed={isActive}
                        data-active={isActive}
                        className={clsx(
                            "shrink-0 px-4 max-mobile:px-3.5 max-mobile:py-2 py-1.5 rounded-full text-sm max-mobile:text-xs font-medium transition-colors cursor-pointer truncate max-w-[25ch] max-mobile:mb-1",
                            "focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-400",
                            isActive
                                ? "bg-violet-400 text-[#2B2939]"
                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white",
                        )}
                    >
                        {translateRadioText(playlist.name, t)}
                    </button>
                );
            })}
        </ScrollableChips>
    );
}
