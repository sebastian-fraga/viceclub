import ModInstallSteps from "@/components/mods/ModInstallSteps";
import ModModalButtons from "@/components/mods/ModModalButtons";
import ModModalGallery from "@/components/mods/ModModalGallery";
import ModModalInfo from "@/components/mods/ModModalInfo";
import ModRequirements from "@/components/mods/ModRequirements";
import type { ModEntry } from "@/data/mods/types";
import { IconX } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    mod: ModEntry;
}

export default function ModModal({ open, onClose, mod }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
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
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleClick}
            className="min-w-200 mx-auto bg-[#14141e] my-auto backdrop:bg-black/50 text-white shadow-2xl rounded-2xl"
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
                    {mod.requirements && (
                        <div className="flex flex-col gap-4">
                            <ModRequirements requirements={mod.requirements} />
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        {mod.installSteps && (
                            <ModInstallSteps installSteps={mod.installSteps} />
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        {mod.screenshots && (
                            <ModModalGallery screenshots={mod.screenshots} />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end px-12 pt-3 pb-3">
                <ModModalButtons
                    moreInfoUrl={mod.moreInfoUrl}
                    downloadUrl={mod.downloadUrl}
                />
            </div>
        </dialog>
    );
}
