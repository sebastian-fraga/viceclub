export const MOD_CATEGORIES = {
    utils: { id: "utils", label: "mods.categories.utils" },
    trainers: { id: "trainers", label: "mods.categories.trainers" },
    scripts: { id: "scripts", label: "mods.categories.scripts" },
    totalConversion: {
        id: "totalConversion",
        label: "mods.categories.totalConversion",
    },
    other: { id: "other", label: "mods.categories.other" },
} as const;

export type ModCategoryId = keyof typeof MOD_CATEGORIES;
