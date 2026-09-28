import useT from "@/hooks/useT";
import { IconPhotoOff } from "@tabler/icons-react";

interface Props {
    screenshots: string[];
}

export default function ModModalGallery({ screenshots }: Props) {
    const i18n = useT();
    return (
        <div className="flex flex-col gap-1">
            <span className="font-body-condensed text-2xl">
                {i18n("mods.modal.screenshots")}
            </span>
            <div className="grid grid-cols-3 gap-2">
                {screenshots.map((screenshot) => (
                    <div key={screenshot} className="py-4">
                        {screenshot ? (
                            <img
                                src={screenshot}
                                alt="🌴"
                                className="aspect-video"
                            />
                        ) : (
                            <div className="aspect-video flex flex-col gap-2 w-full items-center justify-center rounded-2xl bg-(--button-bg) bg-linear-to-br from-(--button-bg) via-(--button-bg-hover)/40 to-(--button-bg-hover) text-xs text-slate-300/80 h-40">
                                <IconPhotoOff />
                                <span>
                                    {i18n("common.other.notFoundImage")}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
