import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { ResetProgressContent } from "@/components/settings/ResetProgressContent";

import { IconChevronLeft, IconX } from "@tabler/icons-react";

import { getPlatformOptions, type PlatformFamily } from "@/config/platforms";
import { settingsConfig } from "@/config/settings";

import useSettings from "@/hooks/useSettings";

import SettingItem from "./SettingItem";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
    open: boolean;
    onClose: () => void;
}

type Step = "main" | "reset";

export default function SettingsModal({ open, onClose }: Props) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const [currentStep, setCurrentStep] = useState<Step>("main");

    const handleAction = (id: string) => {
        switch (id) {
            case "reset-checklist":
                setCurrentStep("reset");
                break;
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => setCurrentStep("main"), 200);
    };

    const settingsSections = settingsConfig;
    const { settings, setSetting } = useSettings();

    useEffect(() => {
        if (!open) return;

        const html = document.documentElement;
        const body = document.body;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.touchAction = "none";

        return () => {
            html.style.overflow = "";
            body.style.overflow = "";
            body.style.touchAction = "";
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
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[90%] max-w-4xl h-140 rounded-2xl bg-[#15151F] text-white shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-3 top-3 p-2 text-slate-400 hover:text-white transition cursor-pointer z-10"
                            aria-label={t("sidebar.close")}
                        >
                            <IconX size={20} />
                        </button>

                        <div className="flex items-center gap-3 px-6 pt-6 shrink-0">
                            {currentStep === "reset" && (
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep("main")}
                                    className="p-1 -ml-1 text-slate-400 hover:text-white transition cursor-pointer"
                                    aria-label={t("common.buttons.goBack")}
                                >
                                    <IconChevronLeft size={22} />
                                </button>
                            )}
                            <h2 className="text-2xl font-bold font-body-condensed">
                                {currentStep === "main" && t("settings.title")}
                                {currentStep === "reset" &&
                                    t("settings.resetProgress.name")}
                            </h2>
                        </div>

                        <div
                            className={`flex-1 min-h-0 w-full px-6 pb-6 ${
                                currentStep === "main"
                                    ? "overflow-y-auto scroll-settings scroll-settings-mask"
                                    : "overflow-hidden"
                            }`}
                            data-lenis-prevent
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {currentStep === "main" ? (
                                    <motion.div
                                        key="step-main"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {settingsSections.map((section) => (
                                            <section
                                                key={section.id}
                                                className="flex flex-col mb-4"
                                            >
                                                <h3 className="text-xs text-gray-300 tracking-wide pl-1 mt-4 mb-1.5 uppercase">
                                                    {t(section.name)}
                                                </h3>

                                                <article className="flex flex-col gap-1.5">
                                                    {section.settings
                                                        .filter(
                                                            (setting) =>
                                                                !(
                                                                    isMobile &&
                                                                    setting.hideOnMobile
                                                                ),
                                                        )
                                                        .map((setting) => {
                                                            const platformFamily =
                                                                settings[
                                                                    "platform-family"
                                                                ] as
                                                                    | PlatformFamily
                                                                    | "default";

                                                            const options =
                                                                setting.id ===
                                                                "platform"
                                                                    ? getPlatformOptions(
                                                                          platformFamily,
                                                                      )
                                                                    : undefined;

                                                            return (
                                                                <SettingItem
                                                                    key={
                                                                        setting.id
                                                                    }
                                                                    setting={
                                                                        setting
                                                                    }
                                                                    value={
                                                                        settings[
                                                                            setting
                                                                                .id
                                                                        ]
                                                                    }
                                                                    onChange={(
                                                                        value,
                                                                    ) =>
                                                                        setSetting(
                                                                            setting.id,
                                                                            value,
                                                                        )
                                                                    }
                                                                    onAction={
                                                                        handleAction
                                                                    }
                                                                    options={
                                                                        options
                                                                    }
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
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step-reset"
                                        className="w-full h-full flex flex-col"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <ResetProgressContent
                                            onCancel={() =>
                                                setCurrentStep("main")
                                            }
                                            onSuccess={handleClose}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
