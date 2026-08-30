import type { ComponentType } from "react";

import NintendoIcon from "@/components/icons/nintendo/NintendoIcon";
import WindowsIcon from "@/components/icons/pc/WindowsIcon";
import PlayStationIcon from "@/components/icons/playstation/PlayStationIcon";
import XboxIcon from "@/components/icons/xbox/XboxIcon";

import PS2Icon from "@/components/icons/playstation/PS2Icon";
import PS3Icon from "@/components/icons/playstation/PS3Icon";
import PS4Icon from "@/components/icons/playstation/PS4Icon";
import PS5Icon from "@/components/icons/playstation/PS5Icon";
import PSPIcon from "@/components/icons/playstation/PSPIcon";

import XboxConsoleIcon from "@/components/icons/xbox/XboxConsoleIcon";
import Xbox360Icon from "@/components/icons/xbox/Xbox360Icon";
import XboxSeriesIcon from "@/components/icons/xbox/XboxSeriesIcon";

import SwitchIcon from "@/components/icons/nintendo/SwitchIcon";

export const platformFamilies = {
    playstation: {
        name: "PlayStation",
        platforms: ["ps2", "psp", "ps3", "ps4", "ps5"],
        background: "#1b2a5585",
        icon: PlayStationIcon,
    },

    xbox: {
        name: "Xbox",
        platforms: ["xbox", "xbox360", "xboxOne", "xboxSeries"],
        background: "#204723c4",
        icon: XboxIcon,
    },

    nintendo: {
        name: "Nintendo",
        platforms: ["switch"],
        background: "#463636c4",
        icon: NintendoIcon,
    },

    pc: {
        name: "PC",
        platforms: ["pc"],
        background: "",
        icon: WindowsIcon,
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

export const platformIcons = {
    ps2: PS2Icon,
    psp: PSPIcon,
    ps3: PS3Icon,
    ps4: PS4Icon,
    ps5: PS5Icon,

    xbox: XboxConsoleIcon,
    xbox360: Xbox360Icon,
    xboxOne: XboxIcon,
    xboxSeries: XboxSeriesIcon,

    switch: SwitchIcon,
    pc: WindowsIcon,
} satisfies Record<Platform, ComponentType>;

export const platformFamilyOptions = [
    {
        label: "settings.options.default",
        value: "default",
    },
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

    return (family?.[0] as PlatformFamily) ?? "default";
};
