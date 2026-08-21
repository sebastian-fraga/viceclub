import {
    IconAccessible,
    IconClock,
    IconDeviceGamepad,
    IconDeviceGamepad2,
    IconLanguage,
    IconPointerFilled,
    IconRefreshAlert,
    IconTimezone,
    IconVolume,
} from "@tabler/icons-react";

import type { SettingsSection } from "@/types/settings";
import { defaultLanguage, languageOptions } from "./languages";
import { getPlatformOptions, platformFamilyOptions } from "./platforms";
import { defaultUtcOffset, utcOffsetOptions } from "./utcOffsets";

export const settingsConfig: SettingsSection[] = [
    {
        id: "general",
        name: "settings.sections.general.title",
        settings: [
            {
                id: "language",
                name: "settings.sections.general.items.1.name",
                type: "select",
                defaultValue: defaultLanguage,
                icon: IconLanguage,
                options: languageOptions,
            },
            {
                id: "sounds",
                name: "settings.sections.general.items.2.name",
                description: "settings.sections.general.items.2.description",
                type: "toggle",
                defaultValue: true,
                icon: IconVolume,
            },
            {
                id: "custom-cursors",
                name: "settings.sections.general.items.3.name",
                type: "toggle",
                defaultValue: false,
                icon: IconPointerFilled,
            },
            {
                id: "reduced-animations",
                name: "settings.sections.general.items.4.name",
                type: "toggle",
                defaultValue: false,
                icon: IconAccessible,
            },
        ],
    },
    {
        id: "home",
        name: "sidebar.home",
        settings: [
            {
                id: "platform-family",
                name: "settings.sections.home.items.1.name",
                description: "settings.sections.home.items.1.description",
                type: "select",
                defaultValue: "default",
                icon: IconDeviceGamepad,
                options: platformFamilyOptions,
            },
            {
                id: "platform",
                name: "settings.sections.home.items.2.name",
                type: "select",
                defaultValue: "default",
                icon: IconDeviceGamepad2,
                options: getPlatformOptions("playstation"),
            },
        ],
    },
    {
        id: "checklist",
        name: "sidebar.sections.checklist",
        settings: [
            {
                id: "reset-checklist",
                name: "settings.resetProgress.name",
                type: "action",
                icon: IconRefreshAlert,
                destructive: true,
            },
        ],
    },
    {
        id: "map",
        name: "sidebar.sections.map",
        settings: [
            {
                id: "reset-map",
                name: "settings.resetProgress.name",
                type: "action",
                icon: IconRefreshAlert,
                destructive: true,
            },
        ],
    },
    {
        id: "timeline",
        name: "sidebar.sections.timeline",
        settings: [
            {
                id: "timezone",
                name: "settings.sections.timeline.items.1.name",
                type: "select",
                icon: IconTimezone,
                defaultValue: defaultUtcOffset,
                options: utcOffsetOptions,
            },
            {
                id: "timeformat",
                name: "settings.sections.timeline.items.2.name",
                type: "select",
                icon: IconClock,
                defaultValue: "24h",
                options: [
                    {
                        label: "settings.sections.timeline.items.2.option1",
                        value: "24h",
                    },
                    {
                        label: "settings.sections.timeline.items.2.option2",
                        value: "12h",
                    },
                ],
            },
        ],
    },
];
