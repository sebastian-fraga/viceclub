export const LOCATION_TYPES = {
    assets: {
        color: "#F4C542",
        label: "maps.markers.locations.common.assets",
        singularLabel: "maps.markers.locations.common.asset",
    },
} as const;

export type LocationType = keyof typeof LOCATION_TYPES;
