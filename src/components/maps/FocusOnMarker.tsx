import type { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export function FocusOnMarker({
    target,
    zoom,
}: {
    target: LatLngTuple | null;
    zoom: number;
}) {
    const map = useMap();
    const done = useRef(false);

    useEffect(() => {
        if (!target || done.current) return;
        done.current = true;

        const timeout = setTimeout(() => {
            map.invalidateSize();
            map.setView(target, zoom, { animate: false });
        }, 100);

        return () => {
            clearTimeout(timeout);
            done.current = false;
        };
    }, [map, target, zoom]);

    return null;
}

export default FocusOnMarker;
