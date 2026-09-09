export const CHALLENGE_TYPES = {
    bmx: {
        color: "#F4C542",
        label: "maps.markers.challenges.bmx",
    },
    nrg: {
        color: "#FF8C42",
        label: "maps.markers.challenges.nrg",
    },
    chiliad: {
        color: "#9BD360",
        label: "maps.markers.challenges.chiliad",
    },
    beatTheCock: {
        color: "#E94B4B",
        label: "maps.markers.challenges.beatTheCock",
    },
} as const;

export type ChallengeType = keyof typeof CHALLENGE_TYPES;
