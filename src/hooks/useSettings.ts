import i18n from "@/i18n";
import { useEffect, useState } from "react";

import {
    getPlatformOptions,
    platformFamilies,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";
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
    stored: Partial<SettingsState> | undefined,
): SettingsState => {
    const validSettings: SettingsState = {};
    if (!stored) return validSettings;

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
                if (setting.id === "platform") {
                    if (value === "default") {
                        validSettings[setting.id] = value;
                        continue;
                    }
                    const isValidPlatform = Object.values(
                        platformFamilies,
                    ).some((family) =>
                        (family.platforms as readonly Platform[]).includes(
                            value as Platform,
                        ),
                    );
                    if (isValidPlatform) {
                        validSettings[setting.id] = value;
                    }
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
    const [settings, setSettings] = useState<SettingsState>(() =>
        getDefaultSettings(),
    );

    useEffect(() => {
        try {
            const storedSettings = loadSettings<SettingsState>();
            const validStoredSettings = getValidStoredSettings(storedSettings);
            setSettings((prev) => ({ ...prev, ...validStoredSettings }));
        } catch (err) {
            console.warn("useSettings: failed to load stored settings", err);
        }
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<SettingsState>;
            if (custom?.detail && typeof custom.detail === "object") {
                setSettings((prev) => ({ ...prev, ...custom.detail }));
            }
        };
        window.addEventListener("settings-change", handler as EventListener);
        return () =>
            window.removeEventListener(
                "settings-change",
                handler as EventListener,
            );
    }, []);

    const setSetting = (id: string, value: SettingsValue) => {
        setSettings((prev) => {
            const newSettings: SettingsState = {
                ...prev,
                [id]: value,
            };

            if (id === "language") {
                const language = value as Language;
                i18n.changeLanguage(language);
                try {
                    localStorage.setItem("language", language);
                } catch {}
            }

            if (id === "platform-family") {
                const family = value as PlatformFamily | "default";
                const platformOptions = getPlatformOptions(family);
                newSettings.platform =
                    platformOptions.length === 1 && platformOptions[0]
                        ? platformOptions[0].value
                        : "default";
            }

            try {
                saveSettings(newSettings);
            } catch {}

            window.dispatchEvent(
                new CustomEvent("settings-change", {
                    detail: newSettings,
                }),
            );

            return newSettings;
        });
    };

    const getSetting = (id: string) => settings[id];

    return { settings, setSetting, getSetting };
}
