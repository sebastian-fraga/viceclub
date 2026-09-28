import type { ModInstallStep } from "@/data/mods/types";
import useT from "@/hooks/useT";

interface Props {
    installSteps: ModInstallStep[];
}

export default function ModInstallSteps({ installSteps }: Props) {
    const i18n = useT();

    return (
        <div className="flex flex-col gap-2">
            <span className="font-body-condensed text-2xl">
                {i18n("mods.modal.install")}
            </span>
            <ol className="flex flex-col gap-4 mt-1 ml-2 list-[decimal-leading-zero] marker:text-(--game-accent) marker:font-body-condensed marker:text-xs">
                {installSteps.map((step, index) => (
                    <li key={index}>
                        <div className="flex flex-col gap-0.5 ml-2">
                            <span className="text-[15px] font-black">
                                {step.title}
                            </span>
                            <span
                                className="text-[12px] text-white/70"
                                dangerouslySetInnerHTML={{
                                    __html: step.description,
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
