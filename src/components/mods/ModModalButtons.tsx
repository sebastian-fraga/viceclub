import useT from "@/hooks/useT";
import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";

interface Props {
    moreInfoUrl: string;
    downloadUrl: string;
}

export default function ModModalButtons({ moreInfoUrl, downloadUrl }: Props) {
    const i18n = useT();
    const buttonClass =
        "px-8 text-base py-2.5 rounded-full cursor-pointer transition-colors duration-350 flex items-center gap-2";
    return (
        <div className="flex gap-4 items-center">
            <a
                href={moreInfoUrl}
                target="_blank"
                className={`${buttonClass} bg-(--game-buttons-secondary-background) text-(--game-buttons-secondary-text) border border-(--game-buttons-secondary-border) hover:bg-(--game-buttons-secondary-hovered) `}
            >
                <span> {i18n("mods.modal.moreInfo")}</span>
                <IconArrowUpRight size={18} />
            </a>
            <a
                href={downloadUrl}
                target="_blank"
                className={`${buttonClass} bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered) font-medium shadow-lg shadow-(color:--game-accent)/10`}
            >
                <span>{i18n("mods.modal.download")}</span>
                <IconDownload size={18} stroke={3} />
            </a>
        </div>
    );
}
