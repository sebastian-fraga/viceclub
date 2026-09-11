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
} as const;

export type ChallengeType = keyof typeof CHALLENGE_TYPES;
