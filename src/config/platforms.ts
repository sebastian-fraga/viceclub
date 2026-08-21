export const platformFamilies = {
    playstation: {
        name: "PlayStation",
        platforms: ["ps2", "psp", "ps3", "ps4", "ps5"],
    },
    xbox: {
        name: "Xbox",
        platforms: ["xbox", "xbox360", "xboxOne", "xboxSeries"],
    },
    nintendo: {
        name: "Nintendo",
        platforms: ["switch"],
    },
    pc: {
        name: "PC",
        platforms: ["pc"],
    },
} as const;

export const platforms = {
    ps2: "PlayStation 2",
    psp: "PlayStation Portable",
    ps3: "PlayStation 3",
    ps4: "PlayStation 4",
    ps5: "PlayStation 5",

    xbox: "Xbox",
    xbox360: "Xbox 360",
    xboxOne: "Xbox One",
    xboxSeries: "Xbox Series",

    switch: "Nintendo Switch",

    pc: "PC",
} as const;

export type PlatformFamily = keyof typeof platformFamilies;
export type Platform = keyof typeof platforms;

export const platformFamilyOptions = [
    { label: "settings.options.default", value: "default" },
    ...Object.entries(platformFamilies).map(([value, { name }]) => ({
        label: name,
        value,
    })),
];

export const getPlatformOptions = (family: PlatformFamily | "default") => {
    if (family === "default") {
        return [
            {
                label: "settings.options.default",
                value: "default",
            },
        ];
    }

    return platformFamilies[family].platforms.map((platform) => ({
        label: platforms[platform],
        value: platform,
    }));
};

export const getPlatformFamily = (
    platform: Platform | "default",
): PlatformFamily | "default" => {
    if (platform === "default") {
        return "default";
    }

    const family = Object.entries(platformFamilies).find(([, data]) =>
        (data.platforms as readonly Platform[]).includes(platform),
    );

    return family?.[0] as PlatformFamily | "default";
};
