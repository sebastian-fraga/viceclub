import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { IconX } from "@tabler/icons-react";

import { getPlatformOptions, type PlatformFamily } from "@/config/platforms";
import { settingsConfig } from "@/config/settings";

import useSettings from "@/hooks/useSettings";

import SettingItem from "./SettingItem";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
    const { t } = useTranslation();

    const settingsSections = settingsConfig;
    const { settings, setSetting } = useSettings();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-20000 flex items-center justify-center bg-black/70"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[90%] max-w-4xl max-h-140 rounded-2xl bg-[#15151F] text-white shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute right-3 top-3 p-2 text-slate-400 hover:text-white transition cursor-pointer"
                            aria-label={t("sidebar.close")}
                        >
                            <IconX size={20} />
                        </button>

                        <h2 className="text-2xl tracking-wide font-bold font-body-condensed uppercase px-6 pt-6 shrink-0">
                            {t("settings.title")}
                        </h2>

                        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-3 scroll-settings scroll-settings-mask">
                            {settingsSections.map((section) => (
                                <section
                                    key={section.id}
                                    className="flex flex-col mb-4"
                                >
                                    <h3 className="text-xs text-gray-300 tracking-wide pl-1 mt-4 mb-1.5 uppercase">
                                        {t(section.name)}
                                    </h3>

                                    <article className="flex flex-col gap-1.5">
                                        {section.settings.map((setting) => {
                                            const platformFamily = settings[
                                                "platform-family"
                                            ] as PlatformFamily | "default";

                                            const options =
                                                setting.id === "platform"
                                                    ? getPlatformOptions(
                                                          platformFamily,
                                                      )
                                                    : undefined;

                                            return (
                                                <SettingItem
                                                    key={setting.id}
                                                    setting={setting}
                                                    value={settings[setting.id]}
                                                    onChange={(value) =>
                                                        setSetting(
                                                            setting.id,
                                                            value,
                                                        )
                                                    }
                                                    options={options}
                                                    disabled={
                                                        setting.id ===
                                                            "platform" &&
                                                        platformFamily ===
                                                            "default"
                                                    }
                                                />
                                            );
                                        })}
                                    </article>
                                </section>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
