import type { ModInstallStep } from "@/data/mods/types";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import useT from "@/hooks/useT";

interface Props {
    installSteps: ModInstallStep[];
}

export default function ModInstallSteps({ installSteps }: Props) {
    const i18n = useT();
    const localizedText = useLocalizedText();

    return (
        <div className="flex flex-col gap-2">
            <span className="font-body-condensed text-2xl">
                {i18n("mods.modal.install")}
            </span>
            <ol className="flex flex-col gap-4 mt-1 ml-2 list-[decimal-leading-zero] marker:text-(--game-accent) marker:font-body-condensed marker:text-xs">
                {installSteps.map((step, index) => (
                    <li key={index}>
                        <div className="flex flex-col gap-0.5 ml-2">
                            <span className="text-[16px] font-black">
                                {localizedText(step.title)}
                            </span>
                            <span
                                className="text-[14px] text-white/70"
                                dangerouslySetInnerHTML={{
                                    __html: (localizedText(step.description)),
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
