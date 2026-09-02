import useT from "@/hooks/useT";
import type { TOptions } from "i18next";

interface Props {
    label: string;
    options?: TOptions;
    align?: "center" | "left";
}

export default function Title({ label, options, align = "center" }: Props) {
    const t = useT();
    const isCentered = align === "center";

    return (
        <h2
            className={`text-5xl max-mobile:text-4xl/10 text-white uppercase font-bold tracking-wide mb-2 font-body-condensed text-pretty ${
                isCentered ? "text-center max-mobile:px-12" : "text-left"
            }`}
        >
            {t(label, options)}
            <div
                className={`w-22 h-px bg-pink-500 mt-2 ${
                    isCentered ? "max-mobile:mx-auto" : ""
                }`}
            ></div>
        </h2>
    );
}
