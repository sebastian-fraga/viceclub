import { useEffect, useState } from "react";

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

    const [enabled, setEnabled] = useState(
        getSetting("custom-cursors") as boolean,
    );

    const cursor = gameId ? CUSTOM_CURSORS[gameId] : undefined;

    useEffect(() => {
        const handleSettingsChange = (event: Event) => {
            const customEvent = event as CustomEvent;
            const settings = customEvent.detail;

            setEnabled(settings["custom-cursors"]);
        };

        window.addEventListener("settings-change", handleSettingsChange);

        return () => {
            window.removeEventListener("settings-change", handleSettingsChange);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (!enabled || !cursor) {
            root.style.removeProperty("--custom-cursor");
            root.classList.remove("custom-cursors");
            return;
        }

        root.style.setProperty("--custom-cursor", `url("${cursor}")`);

        root.classList.add("custom-cursors");

        return () => {
            root.style.removeProperty("--custom-cursor");
            root.classList.remove("custom-cursors");
        };
    }, [enabled, cursor]);

    return null;
}
