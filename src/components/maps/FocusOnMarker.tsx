import type { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

const PAN_DURATION = 0.6;

interface FocusOnMarkerProps {
    target: LatLngTuple | null;
    onFocused?: () => void;
}

export function FocusOnMarker({ target, onFocused }: FocusOnMarkerProps) {
    const map = useMap();

    const onFocusedRef = useRef(onFocused);

    useEffect(() => {
        onFocusedRef.current = onFocused;
    });

    const hasFocused = useRef(false);

    useEffect(() => {
        if (!target) return;

        let onMoveEnd: (() => void) | null = null;

        const delay = hasFocused.current ? 0 : 100;

        const timeout = setTimeout(() => {
            if (!hasFocused.current) {
                map.invalidateSize();
                hasFocused.current = true;
            }

            const offset = map
                .latLngToContainerPoint(target)
                .subtract(map.getSize().divideBy(2));
            const alreadyCentered =
                Math.abs(offset.x) < 1 && Math.abs(offset.y) < 1;

            map.panTo(target, { animate: true, duration: PAN_DURATION });

            if (alreadyCentered) {
                onFocusedRef.current?.();
                return;
            }

            onMoveEnd = () => onFocusedRef.current?.();
            map.once("moveend", onMoveEnd);
        }, delay);

        return () => {
            clearTimeout(timeout);

            if (onMoveEnd) map.off("moveend", onMoveEnd);
        };
    }, [map, target]);

    return null;
}

export default FocusOnMarker;
