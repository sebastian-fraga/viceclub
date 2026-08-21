import { Trans, useTranslation } from "react-i18next";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    IconCode,
    IconDeviceGamepad2,
    IconEdit,
    IconInfoSquareRounded,
    IconMailForward,
    IconUser,
    IconZoomQuestion,
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
                icon: IconInfoSquareRounded,
            },
            {
                id: "2",
                title: "index.faq.sections.viceClub.items.2.title",
                content: "index.faq.sections.viceClub.items.2.content",
                icon: IconZoomQuestion,
            },
            {
                id: "3",
                title: "index.faq.sections.viceClub.items.3.title",
                content: "index.faq.sections.viceClub.items.3.content",
                icon: IconEdit,
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
                icon: IconCode,
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
                icon: IconUser,
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
                                    href="mailto:fragasebastian1@gmail.com"
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
                icon: IconMailForward,
            },
            {
                id: "3",
                title: "index.faq.sections.aboutMe.items.3.title",
                content: "index.faq.sections.aboutMe.items.3.content",
                icon: IconDeviceGamepad2,
            },
        ],
    },
];

export default function FaqAccordion() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6 mt-6">
            {sections.map((section) => (
                <div key={section.title}>
                    <h2 className="mb-4 text-2xl font-bold">
                        {t(section.title)}
                    </h2>

                    <Accordion
                        type="single"
                        collapsible
                        className="max-w-4xl px-2"
                    >
                        {section.items.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-b border-white/10 py-4 transition-colors group"
                            >
                                <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
                                    <span className="flex items-center gap-5 cursor-pointer">
                                        <item.icon
                                            size={16}
                                            className="shrink-0 opacity-60"
                                        />
                                        <span className="text-lg tracking-wide font-medium">
                                            {t(item.title)}
                                        </span>
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent className="max-w-full pl-1 pr-22 pb-4 text-neutral-300 text-sm/6 pretty">
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
