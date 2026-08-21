import { useTranslation } from "react-i18next";
import Title from "../../ui/Title";
import FaqAccordion from "./FaqAccordion";

function Faq() {
    const { t } = useTranslation();
    return (
        <section className="w-full max-w-400 flex flex-col items-start">
            <div>
                <Title label={t("index.titles.faq")} />
            </div>
            <div className="text-neutral-50 w-full self-start">
                <FaqAccordion />
            </div>
        </section>
    );
}

export default Faq;
