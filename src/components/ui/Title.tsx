import { useTranslation } from "react-i18next";

interface Props {
    label: string;
}

export default function Title({ label }: Props) {
    const { t } = useTranslation();

    return (
        <h2 className="text-5xl max-mobile:text-3xl text-white uppercase font-bold tracking-wide relative mb-2 max-mobile:max-w-prose text-pretty font-body-condensed">
            {t(label)}
            <div className="absolute w-full h-px top-full mt-1 bg-pink-500"></div>
        </h2>
    );
}
