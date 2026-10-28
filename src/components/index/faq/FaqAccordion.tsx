import useT from "@/hooks/useT";
import { Trans } from "react-i18next";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    IconBugFilled,
    IconStarFilled,
    IconBulbFilled,
    IconInfoSquareRoundedFilled,
    IconMailFilled,
    IconUserFilled,
    IconSearchFilled,
} from "@tabler/icons-react";

const anchorClasses =
    "text-yellow-200 font-medium hover:text-yellow-300 hover:underline transition-colors";

const sections = [
    {
        title: "index.faq.sections.viceClub.title",
        items: [
            {
                id: "1",
                title: "index.faq.sections.viceClub.items.1.title",
                content: "index.faq.sections.viceClub.items.1.content",
                icon: IconInfoSquareRoundedFilled,
            },
            {
                id: "2",
                title: "index.faq.sections.viceClub.items.2.title",
                content: "index.faq.sections.viceClub.items.2.content",
                icon: IconSearchFilled,
            },
            {
                id: "3",
                title: "index.faq.sections.viceClub.items.3.title",
                content: "index.faq.sections.viceClub.items.3.content",
                icon: IconBulbFilled,
            },
            {
                id: "4",
                title: "index.faq.sections.viceClub.items.4.title",
                content: (
                    <Trans
                        i18nKey="index.faq.sections.viceClub.items.4.content"
                        components={{
                            1: (
                                <a
                                    href="https://github.com/sebastian-fraga/viceclub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={anchorClasses}
                                />
                            ),
                        }}
                    />
                ),
                icon: IconBugFilled,
            },
        ],
    },
    {
        title: "index.faq.sections.aboutMe.title",
        items: [
            {
                id: "1",
                title: "index.faq.sections.aboutMe.items.1.title",
                content: "index.faq.sections.aboutMe.items.1.content",
                icon: IconUserFilled,
            },
            {
                id: "2",
                title: "index.faq.sections.aboutMe.items.2.title",
                content: (
                    <Trans
                        i18nKey="index.faq.sections.aboutMe.items.2.content"
                        components={{
                            1: (
                                <a
                                    href="mailto:contact@viceclub.app"
                                    className={anchorClasses}
                                />
                            ),
                            3: (
                                <a
                                    href="https://github.com/sebastian-fraga"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={anchorClasses}
                                />
                            ),
                        }}
                    />
                ),
                icon: IconMailFilled,
            },
            {
                id: "3",
                title: "index.faq.sections.aboutMe.items.3.title",
                content: "index.faq.sections.aboutMe.items.3.content",
                icon: IconStarFilled,
            },
        ],
    },
];

export default function FaqAccordion() {
    const t = useT();
    return (
        <div className="flex flex-col gap-12 ml-4">
            {sections.map((section) => (
                <div key={section.title} className="flex flex-col ">
                    <h3 className="mb-4 mt-6 text-2xl font-bold">
                        {t(section.title)}
                    </h3>

                    <Accordion
                        type="single"
                        collapsible
                        className="max-w-4xl px-2 space-y-3"
                    >
                        {section.items.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="transition-colors duration-500 group mb-3"
                            >
                                <AccordionTrigger className="px-6 py-5 text-base leading-6 hover:no-underline cursor-pointer gap-6">
                                    <span className="flex items-center gap-6">
                                        <item.icon
                                            size={22}
                                            className="shrink-0 text-yellow-200"
                                        />
                                        <span className="text-lg tracking-wide font-medium text-yellow-50 max-mobile:text-sm">
                                            {t(item.title)}
                                        </span>
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent className="max-w-full pl-6 pr-12 pb-4 text-sm/6 text-pretty text-white/75">
                                    {typeof item.content === "string"
                                        ? t(item.content)
                                        : item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
    );
}
