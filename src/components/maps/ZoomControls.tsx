import useT from "@/hooks/useT";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useMap } from "react-leaflet";

export default function ZoomControls() {
    const i18n = useT();
    const map = useMap();

    return (
        <div className="absolute right-6 bottom-6 z-1000 flex flex-col overflow-hidden rounded-xl bg-(--button-bg)/80 backdrop-blur-sm max-mobile:right-3 max-mobile:bottom-3 max-mobile:rounded-lg">
            <button
                type="button"
                onClick={() => map.zoomIn()}
                aria-label={i18n("common.accessibility.zoomIn")}
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:bg-(--game-accent)/20 hover:text-(--game-accent) max-mobile:h-9 max-mobile:w-9"
            >
                <IconPlus size={18} className="max-mobile:size-4" />
            </button>

            <div className="h-px w-full bg-white/10" />

            <button
                type="button"
                onClick={() => map.zoomOut()}
                aria-label={i18n("common.accessibility.zoomOut")}
                className="flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:bg-(--game-accent)/20 hover:text-(--game-accent) max-mobile:h-9 max-mobile:w-9"
            >
                <IconMinus size={18} className="max-mobile:size-4" />
            </button>
        </div>
    );
}
