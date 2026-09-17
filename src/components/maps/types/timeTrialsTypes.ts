export const TIME_TRIALS_TYPES = {
    timedMissions: {
        color: "#091044",
        label: "🌴",
        singularLabel: "🌴",
    },
} as const;

export type TimeTrialsTypes = keyof typeof TIME_TRIALS_TYPES;
