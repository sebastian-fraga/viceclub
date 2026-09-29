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
            <div className="grid grid-cols-3 max-mobile:grid-cols-1 gap-2">
                {screenshots.map((screenshot, index) => (
                    <div
                        key={`${index}-${screenshot}`}
                        className="py-4 max-mobile:py-1"
                    >
                        {screenshot ? (
                            <img
                                src={screenshot}
                                alt={`${i18n("mods.modal.screenshots")} ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="aspect-video w-full rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="aspect-video flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-(--button-bg) bg-linear-to-br from-(--button-bg) via-(--button-bg-hover)/40 to-(--button-bg-hover) text-xs text-slate-300/80">
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
