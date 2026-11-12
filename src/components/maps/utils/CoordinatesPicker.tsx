import { useMapEvents } from "react-leaflet";

const ENABLE_COORDINATE_PICKER = import.meta.env.DEV;

export function CoordinatesPicker({ height }: { height: number }) {
    if (!ENABLE_COORDINATE_PICKER) return null;

    useMapEvents({
        // left click to copy normal coords
        click(e) {
            const x = Math.round(e.latlng.lng);
            const y = Math.round(height - e.latlng.lat);

            const coordinates = `"x": ${x}, "y": ${y}`;

            navigator.clipboard.writeText(coordinates);
        },

        // right click to copy guide coords
        contextmenu(e) {
            e.originalEvent.preventDefault();

            const fromX = Math.round(e.latlng.lng);
            const fromY = Math.round(height - e.latlng.lat);

            const guideCoordinates = `"guide": { "fromX": ${fromX}, "fromY": ${fromY} }`;

            navigator.clipboard.writeText(guideCoordinates);
        },
    });

    return null;
}
