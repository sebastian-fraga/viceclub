export const CHALLENGE_TYPES = {
    bmx: {
        color: "#F4C542",
        label: "maps.markers.challenges.sa.bmx",
    },
    nrg: {
        color: "#FF8C42",
        label: "maps.markers.challenges.sa.nrg",
    },
    chiliad: {
        color: "#9BD360",
        label: "The Chiliad Challenge",
    },
    beatTheCock: {
        color: "#E94B4B",
        label: "Beat the Cock!",
    },
    driveBy: {
        color: "#E94B4B",
        label: "maps.markers.challenges.lcs.driveBys",
        singularLabel: "maps.markers.challenges.lcs.driveBy",
    },
    underTheBridge: {
        color: "#ff9d26",
        label: "maps.markers.challenges.v.underTheBridgeChallenges",
        singularLabel: "maps.markers.challenges.v.underTheBridge",
    },
    knifeFlights: {
        color: "#44B8BE",
        label: "maps.markers.challenges.v.knifeFlights",
        singularLabel: "maps.markers.challenges.v.knifeFlight",
    },
} as const;

export type ChallengeType = keyof typeof CHALLENGE_TYPES;
