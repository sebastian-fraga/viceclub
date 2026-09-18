import { loadSettings } from "@/hooks/useSettingsStorage";
import { MotionGlobalConfig } from "framer-motion";

function setReducedAnimations(enabled: boolean) {
    MotionGlobalConfig.skipAnimations = enabled;

    if (enabled) {
        document.documentElement.setAttribute(
            "data-reduced-animations",
            "true",
        );
    } else {
        document.documentElement.removeAttribute("data-reduced-animations");
    }
}

function applyReducedAnimations() {
    const stored = loadSettings<{ "reduced-animations"?: boolean }>();
    setReducedAnimations(stored?.["reduced-animations"] === true);
}

applyReducedAnimations();

window.addEventListener("settings-change", (e) => {
    const detail = (e as CustomEvent).detail;
    if (detail && "reduced-animations" in detail) {
        setReducedAnimations(Boolean(detail["reduced-animations"]));
    }
});
