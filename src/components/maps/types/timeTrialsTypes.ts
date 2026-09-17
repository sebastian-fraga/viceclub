export const TIME_TRIALS_TYPES = {
    timedMissions: {
        color: "#091044",
        label: "maps.markers.timeTrials.title",
        singularLabel: "maps.markers.timeTrials.timeTrial",
    },
} as const;

export type TimeTrialsTypes = keyof typeof TIME_TRIALS_TYPES;
