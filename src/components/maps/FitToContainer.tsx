import type { LatLngBoundsExpression } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export default function FitToContainer({
    bounds,
    padding = 0,
}: {
    bounds: LatLngBoundsExpression;
    padding?: number;
}) {
    const map = useMap();
    const hasFittedRef = useRef(false);

    useEffect(() => {
        if (!map) return;

        const fitMapToBounds = () => {
            try {
                map.fitBounds(bounds, {
                    padding: [padding, padding],
                    maxZoom: 2,
                });
            } catch (error) {
                console.error("Error fitting map to bounds:", error);
            }
        };

        if (!hasFittedRef.current) {
            fitMapToBounds();
            hasFittedRef.current = true;
        }

        let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

        const onResize = () => {
            if (resizeTimeout !== null) {
                clearTimeout(resizeTimeout);
            }

            resizeTimeout = setTimeout(fitMapToBounds, 100);
        };

        map.on("resize", onResize);

        return () => {
            if (resizeTimeout !== null) {
                clearTimeout(resizeTimeout);
            }

            map.off("resize", onResize);
        };
    }, [map, bounds, padding]);

    return null;
}
