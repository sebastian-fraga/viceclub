export const COLLECTIBLE_TYPES = {
    tag: {
        color: "#8BC34A",
        label: "maps.markers.collectibles.tags",
        singularLabel: "maps.markers.collectibles.tag",
    },
    snapshot: {
        color: "#F097FE",
        label: "maps.markers.collectibles.snapshots",
        singularLabel: "maps.markers.collectibles.snapshot",
    },
    horseshoe: {
        color: "#FFEA8B",
        label: "maps.markers.collectibles.horseshoes",
        singularLabel: "maps.markers.collectibles.horseshoe",
    },
    oyster: {
        color: "#AFDCED",
        label: "maps.markers.collectibles.oysters",
        singularLabel: "maps.markers.collectibles.oyster",
    },
} as const;

export type CollectibleType = keyof typeof COLLECTIBLE_TYPES;
