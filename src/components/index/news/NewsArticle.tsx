import {
    IconArrowUpRight,
    IconBrandX,
    IconCalendarEvent,
    IconCheck,
    IconCopy,
    IconShare,
    IconUser,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";

import useT from "@/hooks/useT";
import useLocale from "@/hooks/useLocale";
import { resolveLocalizedText } from "@/lib/localizedText";
import type { MaybeLocalizedText } from "@/types/localizedText";

import type { NewsItem } from "./types";

const paragraphClass = "max-mobile:text-base/7 text-lg/8 text-slate-200/90";
const buttonClass =
    "flex bg-pink-300 rounded-full px-4 sm:px-6 py-3 cursor-pointer transition hover:bg-pink-400 hover:text-slate-50 gap-2 sm:gap-3 text-black text-sm items-center duration-200";

interface Props {
    item: NewsItem;
    newsIndex: number;
    visibleCount: number;
    copiedSlug: string | null;
    canShare: boolean;
    onCopy: (slug: string, title: string) => void;
    onShareX: (title: string, slug: string) => void;
    onShareNative: (title: string, slug: string) => void;
}

export default function NewsArticle({
    item,
    newsIndex,
    visibleCount,
    copiedSlug,
    canShare,
    onCopy,
    onShareX,
    onShareNative,
}: Props) {
    const t = useT();
    const language = useLocale();
    const translateContent = (value: MaybeLocalizedText) =>
        resolveLocalizedText(value, language);

    const STEP = 2;

    return (
        <motion.article
            key={item.slug}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{
                duration: 0.4,
                delay:
                    newsIndex >= visibleCount - STEP
                        ? (newsIndex % STEP) * 0.1
                        : 0,
                ease: "easeOut",
            }}
            className="news-article text-white flex flex-col px-0 py-6 gap-6 md:gap-8 items-start nth-of-type-[1]:mt-4 w-full"
        >
            <div className="flex flex-col gap-4">
                <h3 className="max-mobile:text-3xl text-4xl font-body-condensed text-pretty">
                    {translateContent(item.title)}
                </h3>

                <p className="font-medium text-base sm:text-xl leading-relaxed text-slate-200">
                    {translateContent(item.subtitle)}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base mt-1">
                    <h4 className="flex gap-2">
                        <IconUser size={18} className="text-yellow-200" />
                        {item.author}
                    </h4>

                    <h4 className="flex gap-2">
                        <IconCalendarEvent
                            size={18}
                            className="text-yellow-200"
                        />

                        {translateContent(item.date)}
                    </h4>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-300">
                {item.paragraphs.map((paragraph, paragraphIndex) => {
                    const isFirst = paragraphIndex === 0;
                    const needsTopMargin = paragraphIndex >= 2;

                    return (
                        <Fragment key={paragraphIndex}>
                            <p
                                className={
                                    needsTopMargin
                                        ? `${paragraphClass} mt-6`
                                        : paragraphClass
                                }
                                dangerouslySetInnerHTML={{
                                    __html: translateContent(paragraph),
                                }}
                            />

                            {isFirst && (
                                <div className="w-full my-8">
                                    <img
                                        src={item.image}
                                        className="w-full rounded-4xl drop-shadow-2xl drop-shadow-pink-400/20"
                                        alt={translateContent(item.title)}
                                        loading={
                                            newsIndex < STEP
                                                ? "eager"
                                                : "lazy"
                                        }
                                    />

                                    <div className="text-xs flex items-center mt-0.5 ml-1.5 pt-2 pl-1 text-gray-300 relative">
                                        <div className="absolute rounded-full left-0.5 h-full w-0.5 bg-yellow-200/80"></div>

                                        <p className="italic pl-2">
                                            {translateContent(item.footerText)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    );
                })}

                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 w-fit my-12 mx-auto bg-yellow-200 text-black font-bold px-12 py-4 rounded-full transition hover:bg-yellow-300 shadow-yellow-300/10 shadow-xl uppercase group text-lg max-mobile:px-8 max-mobile:text-base max-mobile:mb-6"
                >
                    {item.linkText
                        ? translateContent(item.linkText)
                        : t("index.news.buttons.external")}

                    <IconArrowUpRight className="group-hover:scale-120 transition duration-300" />
                </a>

                <div className="w-full h-px bg-gray-500/20 rounded-2xl my-6" />

                <div className="flex gap-3 sm:gap-4 items-center self-start mb-8">
                    <p className="text-xs sm:text-sm text-gray-300">
                        {t("index.news.buttons.share")}:
                    </p>

                    <button
                        className={buttonClass}
                        onClick={() =>
                            onShareX(translateContent(item.title), item.slug)
                        }
                    >
                        <IconBrandX />
                        <span className="hidden sm:inline">
                            {t("index.news.buttons.post")}
                        </span>
                    </button>

                    <button
                        className={buttonClass}
                        onClick={() =>
                            onCopy(item.slug, translateContent(item.title))
                        }
                    >
                        <div className="flex items-center gap-3">
                            <AnimatePresence mode="wait">
                                {copiedSlug === item.slug ? (
                                    <motion.div
                                        key="check"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.6,
                                            rotate: -45,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.6,
                                            rotate: 45,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <IconCheck />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.6,
                                            rotate: -45,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.6,
                                            rotate: 45,
                                        }}
                                        transition={{
                                            duration: 0.15,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <IconCopy />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <span className="hidden sm:inline">
                                {copiedSlug === item.slug
                                    ? t("index.news.buttons.copied")
                                    : t("index.news.buttons.copy")}
                            </span>
                        </div>
                    </button>

                    {canShare && (
                        <button
                            className={buttonClass}
                            onClick={() =>
                                onShareNative(
                                    translateContent(item.title),
                                    item.slug,
                                )
                            }
                        >
                            <IconShare />
                            <span className="hidden sm:inline">
                                {t("index.news.buttons.more")}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </motion.article>
    );
}