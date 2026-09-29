import useT from "@/hooks/useT";
import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";

interface Props {
    moreInfoUrl: string;
    downloadUrl: string;
}

export default function ModModalButtons({ moreInfoUrl, downloadUrl }: Props) {
    const i18n = useT();
    const buttonClass =
        "px-8 max-mobile:px-4 text-base max-mobile:text-sm py-2.5 rounded-full cursor-pointer transition-colors duration-350 flex items-center justify-center gap-2 whitespace-nowrap max-mobile:flex-1";
    return (
        <div className="flex flex-wrap gap-4 max-mobile:gap-3 items-center max-mobile:w-full">
            <a
                href={moreInfoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} bg-(--game-buttons-secondary-background) text-(--game-buttons-secondary-text) border border-(--game-buttons-secondary-border) hover:bg-(--game-buttons-secondary-hovered)`}
            >
                <span>{i18n("mods.modal.moreInfo")}</span>
                <IconArrowUpRight size={18} />
            </a>
            <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text) hover:bg-(--game-buttons-primary-hovered) font-medium shadow-lg shadow-(color:--game-accent)/10`}
            >
                <span>{i18n("mods.modal.download")}</span>
                <IconDownload size={18} stroke={3} />
            </a>
        </div>
    );
}
