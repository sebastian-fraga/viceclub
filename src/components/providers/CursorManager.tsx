import { useEffect } from "react";

import useSettings from "@/hooks/useSettings";

interface Props {
    gameId?: string;
}

const CUSTOM_CURSORS: Record<string, string> = {
    III: "/assets/cursors/III.cur",
    VC: "/assets/cursors/III.cur",
    SA: "/assets/cursors/SA.cur",
    LCS: "/assets/cursors/III.cur",
    VCS: "/assets/cursors/III.cur",
    IV: "/assets/cursors/IV.cur",
    V: "/assets/cursors/V.png",
};

export default function CursorManager({ gameId }: Props) {
    const { getSetting } = useSettings();

    useEffect(() => {
        const applyCursor = () => {
            const root = document.documentElement;
            const enabled = getSetting("custom-cursors") as boolean;
            const cursor = gameId ? CUSTOM_CURSORS[gameId] : undefined;

            if (!enabled || !cursor) {
                root.classList.remove("custom-cursors");
                root.style.removeProperty("--custom-cursor");
                return;
            }

            root.style.setProperty("--custom-cursor", `url("${cursor}")`);
            root.classList.add("custom-cursors");
        };

        applyCursor();

        const handleSettingsChange = () => {
            applyCursor();
        };

        window.addEventListener("settings-change", handleSettingsChange);
        document.addEventListener("astro:after-swap", applyCursor);

        return () => {
            window.removeEventListener("settings-change", handleSettingsChange);
            document.removeEventListener("astro:after-swap", applyCursor);
        };
    }, [gameId, getSetting]);

    return null;
}
