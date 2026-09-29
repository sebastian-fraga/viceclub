import ModInstallSteps from "@/components/mods/ModInstallSteps";
import ModModalButtons from "@/components/mods/ModModalButtons";
import ModModalGallery from "@/components/mods/ModModalGallery";
import ModModalInfo from "@/components/mods/ModModalInfo";
import ModRequirements from "@/components/mods/ModRequirements";
import type { ModEntry } from "@/data/mods/types";
import { IconX } from "@tabler/icons-react";
import { motion, useIsPresent } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    mod: ModEntry;
}

export default function ModModal({ open, onClose, mod }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const isPresent = useIsPresent();

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        }
    }, [open]);

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

    function handleClick(event: React.MouseEvent<HTMLDialogElement>) {
        const rect = dialogRef.current?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            onClose();
        }
    }

    return (
        <motion.dialog
            ref={dialogRef}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={handleClick}
            data-closing={!isPresent}
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
                hidden: {
                    opacity: 0,
                    y: 24,
                    transition: { duration: 0.3, ease: "easeIn" },
                },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mod-dialog min-w-200 mx-auto bg-[#14141e] my-auto text-white shadow-2xl rounded-2xl"
            data-lenis-prevent
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white transition cursor-pointer z-10"
                aria-label="🌴"
            >
                <IconX size={20} />
            </button>
            <div className="relative flex max-h-[70vh] flex-col gap-6 overflow-y-scroll scroll-mod">
                <div className="min-h-50 bg-slate-900/50"></div>
                <div className="px-12 pt-4 pb-12 flex flex-col gap-8">
                    <ModModalInfo mod={mod} />
                    <div className="px-2 pb-12 flex flex-col gap-8">
                        {mod.requirements && (
                            <div className="flex flex-col gap-4">
                                <ModRequirements
                                    requirements={mod.requirements}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            {mod.installSteps && (
                                <ModInstallSteps
                                    installSteps={mod.installSteps}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            {mod.screenshots && (
                                <ModModalGallery
                                    screenshots={mod.screenshots}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end px-12 pt-3 pb-3">
                <ModModalButtons
                    moreInfoUrl={mod.moreInfoUrl}
                    downloadUrl={mod.downloadUrl}
                />
            </div>
        </motion.dialog>
    );
}
