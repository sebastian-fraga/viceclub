import useT from "@/hooks/useT";

interface Props {
    requirements?: string[];
}

export default function ModRequirements({ requirements }: Props) {
    const i18n = useT()
    return (
        <div className="flex flex-col gap-1">
            <span className="font-body-condensed text-2xl">
                {i18n("mods.modal.requirements")}
            </span>
            <div className="flex gap-2 mt-1 ml-1">
                {requirements?.map((requirement) => (
                    <span
                        className="text-indigo-100 bg-(--button-bg) group flex items-center justify-center gap-2 px-3.5 py-2 max-mobile:py-2.5 text-xs rounded-full min-w-30 max-mobile:min-w-0"
                        key={requirement}
                    >
                        {requirement}
                    </span>
                ))}
            </div>
        </div>
    );
}
