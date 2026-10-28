import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { type ResetTarget } from "@/components/settings/ResetProgressContent";
import {
    downloadLocalStorageBackup,
    importAllLocalStorage,
    readFileAsText,
} from "@/utils/localStorageBackup";
import openPageInProduction from "@/utils/openPageInProduction";
import openPageInPageSpeed from "@/utils/openPageInPageSpeed";

type Step = "main" | "reset";

interface UseSettingsModalParams {
    onClose: () => void;
}

export function useSettingsModal({ onClose }: UseSettingsModalParams) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState<Step>("main");
    const [resetTarget, setResetTarget] = useState<ResetTarget>("checklist");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [actionStatus, setActionStatus] = useState<
        ({ id: string } & { text: string; variant: "error" | "success" }) | null
    >(null);

    const handleAction = (id: string) => {
        switch (id) {
            case "reset-checklist":
                setResetTarget("checklist");
                setCurrentStep("reset");
                break;
            case "reset-map":
                setResetTarget("map");
                setCurrentStep("reset");
                break;
            case "export-localstorage":
                downloadLocalStorageBackup();
                break;
            case "import-localstorage":
                fileInputRef.current?.click();
                break;
            case "open-page-production":
                openPageInProduction();
                break;
            case "open-page-performance":
                openPageInPageSpeed();
                break;
        }
    };

    const handleFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        e.target.value = "";

        if (!file) return;

        setActionStatus(null);

        try {
            const text = await readFileAsText(file);
            const result = importAllLocalStorage(text);

            if (result.success) {
                window.location.reload();
                return;
            }

            setActionStatus({
                id: "import-localstorage",
                text: t("settings.error.importBackup"),
                variant: "error",
            });
        } catch {
            setActionStatus({
                id: "import-localstorage",
                text: t("settings.error.importBackup"),
                variant: "error",
            });
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setCurrentStep("main");
            setActionStatus(null);
        }, 200);
    };

    return {
        t,
        currentStep,
        setCurrentStep,
        resetTarget,
        fileInputRef,
        actionStatus,
        setActionStatus,
        handleAction,
        handleFileSelected,
        handleClose,
    };
}