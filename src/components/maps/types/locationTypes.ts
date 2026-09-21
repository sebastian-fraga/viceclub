export const LOCATION_TYPES = {
    assets: {
        color: "#F4C542",
        label: "maps.markers.locations.common.assets",
        singularLabel: "maps.markers.locations.common.asset",
    },
    safehouses_VC: {
        color: "#DC8EA2",
        label: "maps.markers.locations.common.safehouses",
        singularLabel: "maps.markers.locations.common.safehouse",
    },
} as const;

export type LocationType = keyof typeof LOCATION_TYPES;
