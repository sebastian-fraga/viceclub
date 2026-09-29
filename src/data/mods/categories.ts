export const MOD_CATEGORIES = {
    essentials: { id: "essentials", label: "mods.categories.essentials" },
    utils: { id: "utils", label: "mods.categories.utils" },
    gameplay: { id: "gameplay", label: "mods.categories.gameplay" },
    graphics: { id: "graphics", label: "mods.categories.graphics" },
    totalConversion: {
        id: "totalConversion",
        label: "mods.categories.totalConversion",
    },
    other: { id: "other", label: "mods.categories.other" },
} as const;

export type ModCategoryId = keyof typeof MOD_CATEGORIES;
