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
import { switchLocalePath } from "@/utils/locale";
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

const withoutLanguage = (state: SettingsState): SettingsState => {
    const { language: _language, ...rest } = state;
    return rest;
};

async function navigateToLanguage(language: Language) {
    if (language === i18n.language) return;

    try {
        document.cookie = `language=${language}; path=/; max-age=31536000; samesite=lax`;
    } catch {}

    const target =
        switchLocalePath(window.location.pathname, language) +
        window.location.search +
        window.location.hash;

    const { navigate } = await import("astro:transitions/client");
    navigate(target);
}

export default function useSettings() {
    const [settings, setSettings] = useState<SettingsState>(() => ({
        ...getDefaultSettings(),
        language: i18n.language,
    }));

    useEffect(() => {
        try {
            const storedSettings = loadSettings<SettingsState>();
            const validStoredSettings = withoutLanguage(
                getValidStoredSettings(storedSettings),
            );
            setSettings((prev) => ({ ...prev, ...validStoredSettings }));
        } catch (err) {
            console.warn("useSettings: failed to load stored settings", err);
        }
    }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<SettingsState>;
            if (custom?.detail && typeof custom.detail === "object") {
                const detail = withoutLanguage(custom.detail);
                setSettings((prev) => ({ ...prev, ...detail }));
            }
        };
        window.addEventListener("settings-change", handler as EventListener);
        return () =>
            window.removeEventListener(
                "settings-change",
                handler as EventListener,
            );
    }, []);

    useEffect(() => {
        const sync = (language: string) => {
            setSettings((prev) =>
                prev.language === language ? prev : { ...prev, language },
            );
        };

        sync(i18n.language);
        i18n.on("languageChanged", sync);

        return () => {
            i18n.off("languageChanged", sync);
        };
    }, []);

    const setSetting = (id: string, value: SettingsValue) => {
        if (id === "language") {
            void navigateToLanguage(value as Language);
            return;
        }

        setSettings((prev) => {
            const newSettings: SettingsState = {
                ...prev,
                [id]: value,
            };

            if (id === "platform-family") {
                const family = value as PlatformFamily | "default";
                const platformOptions = getPlatformOptions(family);
                newSettings.platform =
                    platformOptions.length === 1 && platformOptions[0]
                        ? platformOptions[0].value
                        : "default";
            }

            try {
                saveSettings(withoutLanguage(newSettings));
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
