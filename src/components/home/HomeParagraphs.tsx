import { useTranslation } from "react-i18next";

interface Props {
    paragraphs: string[];
}

export default function HomeParagraphs({ paragraphs }: Props) {
    const { t, ready } = useTranslation();

    if (!ready) return null;

    return (
        <div>
            {paragraphs.map((paragraph) => (
                <p
                    key={paragraph}
                    className="text-xl/9 max-w-[80%] my-8 max-mobile:max-w-full max-mobile:my-5 max-mobile:text-base/7"
                >
                    {t(paragraph)}
                </p>
            ))}
        </div>
    );
}
