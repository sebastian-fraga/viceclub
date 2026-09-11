export const COLLECTIBLE_TYPES = {
    hiddenPackages_III: {
        color: "#bdbdbd",
        label: "maps.markers.collectibles.common.hiddenPackages",
        singularLabel: "maps.markers.collectibles.common.hiddenPackage",
    },
    stuntJumps_III: {
        color: "#F097FE",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    hiddenPackages_VC: {
        color: "#82DFA4",
        label: "maps.markers.collectibles.common.hiddenPackages",
        singularLabel: "maps.markers.collectibles.common.hiddenPackage",
    },
    stuntJumps_VC: {
        color: "#97E4FE",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    tag: {
        color: "#8BC34A",
        label: "maps.markers.collectibles.sa.tags",
        singularLabel: "maps.markers.collectibles.sa.tag",
    },
    snapshot: {
        color: "#F097FE",
        label: "maps.markers.collectibles.sa.snapshots",
        singularLabel: "maps.markers.collectibles.sa.snapshot",
    },
    horseshoe: {
        color: "#FFEA8B",
        label: "maps.markers.collectibles.sa.horseshoes",
        singularLabel: "maps.markers.collectibles.sa.horseshoe",
    },
    oyster: {
        color: "#AFDCED",
        label: "maps.markers.collectibles.sa.oysters",
        singularLabel: "maps.markers.collectibles.sa.oyster",
    },
} as const;

export type CollectibleType = keyof typeof COLLECTIBLE_TYPES;
