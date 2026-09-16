import { loadSettings } from "@/hooks/useSettingsStorage";
import { MotionGlobalConfig } from "framer-motion";

function applyReducedAnimations() {
    const stored = loadSettings<{ "reduced-animations"?: boolean }>();
    MotionGlobalConfig.skipAnimations = stored?.["reduced-animations"] === true;
}

applyReducedAnimations();

window.addEventListener("settings-change", (e) => {
    const detail = (e as CustomEvent).detail;
    if (detail && "reduced-animations" in detail) {
        MotionGlobalConfig.skipAnimations = Boolean(
            detail["reduced-animations"],
        );
    }
});
