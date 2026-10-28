import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import { ResetProgressContent } from "@/components/settings/ResetProgressContent";
import SettingsSections from "@/components/settings/SettingsSections";
import { useSettingsModal } from "@/components/settings/hooks/useSettingsModal";

import { IconChevronLeft, IconX } from "@tabler/icons-react";

import { settingsConfig } from "@/config/settings";

import useSettings from "@/hooks/useSettings";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
    const {
        t,
        currentStep,
        setCurrentStep,
        resetTarget,
        fileInputRef,
        actionStatus,
        handleAction,
        handleFileSelected,
        handleClose,
    } = useSettingsModal({ onClose });

    const isMobile = useIsMobile();
    const { settings, setSetting } = useSettings();

    useScrollLock(open, { touchAction: true });

    useEffect(() => {
        const handlePageLoad = () => {
            onClose();
            setCurrentStep("main");
            setActionStatus(null);
        };

        document.addEventListener("astro:page-load", handlePageLoad);

        return () =>
            document.removeEventListener("astro:page-load", handlePageLoad);
    }, [onClose, setCurrentStep, setActionStatus]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-20000 flex items-center justify-center bg-black/85"
                    onClick={handleClose}
                    data-lenis-prevent
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[90%] max-mobile:w-[94%] max-w-4xl h-150 max-h-[90dvh] rounded-2xl bg-[#15151F] text-white shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/json"
                            className="hidden"
                            onChange={handleFileSelected}
                        />

                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-3 top-3 p-2 text-slate-400 hover:text-white transition cursor-pointer z-10"
                            aria-label={t("sidebar.close")}
                        >
                            <IconX size={20} />
                        </button>

                        <div className="flex items-center gap-3 pl-6 pr-12 pt-6 max-mobile:pl-4 max-mobile:pt-4 shrink-0">
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
                            <h2 className="text-2xl max-mobile:text-xl leading-tight font-bold font-body-condensed">
                                {currentStep === "main" && t("settings.title")}
                                {currentStep === "reset" &&
                                    t("settings.resetProgress.name")}
                            </h2>
                        </div>

                        <div
                            className={`flex-1 min-h-0 w-full px-6 pb-6 max-mobile:px-3 max-mobile:pb-4 ${
                                currentStep === "main"
                                    ? "overflow-y-auto overflow-x-hidden scroll-settings scroll-settings-mask"
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
                                        <SettingsSections
                                            sections={settingsConfig}
                                            settings={settings}
                                            setSetting={setSetting}
                                            isMobile={isMobile}
                                            actionStatus={actionStatus}
                                            handleAction={handleAction}
                                        />
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
                                            target={resetTarget}
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