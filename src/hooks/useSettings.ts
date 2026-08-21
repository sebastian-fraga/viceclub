import { useState } from "react";

import i18n from "@/i18n";

import { getPlatformOptions, type PlatformFamily } from "@/config/platforms";
import { settingsConfig } from "@/config/settings";

import type { Language } from "@/config/languages";
import { loadSettings, saveSettings } from "./useSettingsStorage";

type SettingsValue = string | boolean;
type SettingsState = Record<string, SettingsValue>;

const getDefaultSettings = (): SettingsState => {
    const defaults: SettingsState = {};

    for (const section of settingsConfig) {
        for (const setting of section.settings) {
            if (
                setting.type === "action" ||
                setting.defaultValue === undefined
            ) {
                continue;
            }

            defaults[setting.id] = setting.defaultValue;
        }
    }

    return defaults;
};

const getValidStoredSettings = (
    stored: Partial<SettingsState>,
): SettingsState => {
    const validSettings: SettingsState = {};

    for (const section of settingsConfig) {
        for (const setting of section.settings) {
            if (setting.type === "action") continue;

            const value = stored[setting.id];

            if (value === undefined) continue;

            if (setting.type === "toggle") {
                if (typeof value === "boolean") {
                    validSettings[setting.id] = value;
                }

                continue;
            }

            if (setting.type === "select") {
                if (setting.id === "platform" && value === "default") {
                    validSettings[setting.id] = value;
                    continue;
                }

                const isValidOption = setting.options.some(
                    (option) => option.value === value,
                );

                if (isValidOption) {
                    validSettings[setting.id] = value;
                }
            }
        }
    }

    return validSettings;
};

export default function useSettings() {
    const [settings, setSettings] = useState<SettingsState>(() => {
        const storedSettings = loadSettings<SettingsState>();

        const validStoredSettings = getValidStoredSettings(storedSettings);

        return {
            ...getDefaultSettings(),
            ...validStoredSettings,
        };
    });

    const setSetting = (id: string, value: SettingsValue) => {
        setSettings((prev) => {
            const newSettings: SettingsState = {
                ...prev,
                [id]: value,
            };

            if (id === "language") {
                const language = value as Language;

                i18n.changeLanguage(language);
                localStorage.setItem("language", language);
            }

            if (id === "platform-family") {
                const family = value as PlatformFamily | "default";
                const platformOptions = getPlatformOptions(family);

                newSettings.platform =
                    platformOptions.length === 1 && platformOptions[0]
                        ? platformOptions[0].value
                        : "default";
            }

            saveSettings(newSettings);

            window.dispatchEvent(
                new CustomEvent("settings-change", {
                    detail: newSettings,
                }),
            );

            return newSettings;
        });
    };

    const getSetting = (id: string) => settings[id];

    return {
        settings,
        setSetting,
        getSetting,
    };
}
