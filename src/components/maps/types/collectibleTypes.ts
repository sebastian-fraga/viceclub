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
    stuntJumps_SA: {
        color: "#334CB0",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    hiddenPackages_LCS: {
        color: "#FFF58D",
        label: "maps.markers.collectibles.common.hiddenPackages",
        singularLabel: "maps.markers.collectibles.common.hiddenPackage",
    },
    stuntJumps_LCS: {
        color: "#FE9797",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    redBalloons: {
        color: "#FA9B9C",
        label: "maps.markers.collectibles.vcs.redBalloons",
        singularLabel: "maps.markers.collectibles.vcs.redBalloon",
    },
    stuntJumps_VCS: {
        color: "#57AADA",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    flyingRats: {
        color: "#FEDDDD",
        label: "maps.markers.collectibles.iv.flyingRats",
        singularLabel: "maps.markers.collectibles.iv.flyingRat",
    },
    seagulls: {
        color: "#A4D5F1",
        label: "maps.markers.collectibles.iv.seagulls",
        singularLabel: "maps.markers.collectibles.iv.seagull",
    },
    stuntJumps_IV: {
        color: "#97FE9F",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
    spaceshipParts: {
        color: "#05730E",
        label: "maps.markers.collectibles.v.spaceshipParts",
        singularLabel: "maps.markers.collectibles.v.spaceshipPart",
    },
    letterScraps: {
        color: "#FEED97",
        label: "maps.markers.collectibles.v.letterScraps",
        singularLabel: "maps.markers.collectibles.v.letterScrap",
    },
    stuntJumps_V: {
        color: "#97AAFE",
        label: "maps.markers.collectibles.common.stuntJumps",
        singularLabel: "maps.markers.collectibles.common.stuntJump",
    },
} as const;

export type CollectibleType = keyof typeof COLLECTIBLE_TYPES;
