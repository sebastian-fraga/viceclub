export const TIME_TRIALS_TYPES = {
    timedMissions: {
        color: "#0F3048",
        label: "🌴",
        singularLabel: "🌴",
    },
} as const;

export type TimeTrialsTypes = keyof typeof TIME_TRIALS_TYPES;
