import {
    IconBrandX,
    IconCalendarEvent,
    IconCamera,
    IconCheck,
    IconChevronDown,
    IconCopy,
    IconExternalLink,
    IconShare,
    IconUser,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Title from "../../ui/Title";

interface NewsItem {
    slug: string;
    title: string | Record<string, string>;
    subtitle: string | Record<string, string>;
    date: string | Record<string, string>;
    paragraph1: string | Record<string, string>;
    paragraph2: string | Record<string, string>;
    paragraph3?: string | Record<string, string>;
    footerText: string | Record<string, string>;
    link: string;
    linkText?: string | Record<string, string>;
    image: string;
    author: string;
}

const STEP = 2;
const paragraphClass =
    "text-base sm:text-lg leading-7 text-pretty text-slate-200/90";
const buttonClass =
    "flex bg-pink-300 rounded-full px-4 sm:px-6 py-3 cursor-pointer transition hover:bg-pink-400 hover:text-slate-50 gap-2 sm:gap-3 text-black text-sm items-center";

export default function News() {
    const { t, i18n } = useTranslation();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(STEP);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    function getArticleUrl(slug: string) {
        return `https://viceclub.app?news=${slug}`;
    }

    function translateContent(value: string | Record<string, string>) {
        if (typeof value === "string") return value;

        const language = i18n.language.split("-")[0];

        return value[language] ?? value.es ?? "";
    }

    function shareOnX(title: string, slug: string) {
        const url =
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}` +
            `&url=${encodeURIComponent(getArticleUrl(slug))}`;

        window.open(url, "_blank", "noopener");
    }

    async function copyLink(slug: string, title: string) {
        const text = `${title}\n${getArticleUrl(slug)}`;

        await navigator.clipboard.writeText(text);

        setCopiedSlug(slug);

        setTimeout(() => {
            setCopiedSlug((current) => (current === slug ? null : current));
        }, 1000);
    }

    function shareNative(title: string, slug: string) {
        if (!navigator.share) return;

        navigator.share({
            title,
            url: getArticleUrl(slug),
        });
    }

    function scrollToNews() {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("news");

        if (!slug) return;

        const index = news.findIndex((n) => n.slug === slug);

        if (index === -1) return;

        if (index >= visibleCount) {
            setVisibleCount(index + 1);
        }

        setTimeout(() => {
            const target = document.querySelectorAll(".news-article")[index];

            if (!target) return;

            const headerHeight =
                document.querySelector("header")?.offsetHeight ?? 0;

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                16;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }, 100);
    }

    useEffect(() => {
        fetch(
            "https://viceclub.s3.us-east-1.amazonaws.com/news.json?nocache=" +
                Date.now(),
        )
            .then((res) => res.json())
            .then((data) => {
                setNews(data);

                setTimeout(scrollToNews, 300);
            });
    }, []);

    return (
        <section className="w-full max-w-400 flex flex-col items-start">
            <style>
                {`
                    i {
                        display: inline-block;
                        margin-block: 12px 0;
                        background: oklch(65.6% 0.241 354.308 / 0.3);
                        border-radius: 12px;
                        padding: 12px 20px
                    }
                `}
            </style>
            <div className="flex">
                <Title label={t("index.titles.news")} />
            </div>
            <AnimatePresence mode="popLayout">
                {news.slice(0, visibleCount).map((item, index) => (
                    <motion.article
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{
                            duration: 0.4,
                            delay:
                                index >= visibleCount - STEP
                                    ? (index % STEP) * 0.1
                                    : 0,
                            ease: "easeOut",
                        }}
                        className="text-white flex flex-col px-0 py-6 gap-6 md:gap-8 items-start nth-of-type-[1]:mt-4 w-full"
                    >
                        <div className="flex flex-col gap-4">
                            <h3 className="font-black text-2xl sm:text-3xl leading-tight">
                                {translateContent(item.title)}
                            </h3>

                            <p className="font-medium text-base sm:text-xl leading-relaxed text-slate-200">
                                {translateContent(item.subtitle)}
                            </p>

                            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base">
                                <h4 className="flex gap-2">
                                    <IconUser size={18} />
                                    {item.author}
                                </h4>

                                <h4 className="flex gap-2">
                                    <IconCalendarEvent size={18} />

                                    {translateContent(item.date)}
                                </h4>
                            </div>
                        </div>

                        <div className="flex flex-col items-center max-w-300">
                            <p
                                className={paragraphClass}
                                dangerouslySetInnerHTML={{
                                    __html: translateContent(item.paragraph1),
                                }}
                            />

                            <div className="w-full my-6">
                                <img
                                    src={item.image}
                                    className="w-full rounded-xl border-slate-500 border-2 drop-shadow-2xl drop-shadow-pink-400/20"
                                    alt={translateContent(item.title)}
                                    loading={index >= STEP ? "eager" : "lazy"}
                                />

                                <div className="text-xs flex gap-2 items-center pt-1.5 pl-1 text-gray-300 italic">
                                    <IconCamera size={18} />

                                    <p className="">
                                        {translateContent(item.footerText)}
                                    </p>
                                </div>
                            </div>

                            <p
                                className={paragraphClass}
                                dangerouslySetInnerHTML={{
                                    __html: translateContent(item.paragraph2),
                                }}
                            />

                            {item.paragraph3 && (
                                <p
                                    className={`${paragraphClass} mt-8 mb-4`}
                                    dangerouslySetInnerHTML={{
                                        __html: translateContent(
                                            item.paragraph3,
                                        ),
                                    }}
                                />
                            )}

                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener"
                                className="flex items-center gap-2 w-fit mt-6 mx-auto bg-pink-400 text-black font-bold px-8 py-3 rounded-full transition hover:bg-pink-500 hover:text-white shadow-pink-300/10 shadow-xl"
                            >
                                {translateContent(
                                    item.linkText ??
                                        "index.news.buttons.external",
                                )}

                                <IconExternalLink />
                            </a>

                            <div className="w-full h-px bg-gray-500/20 rounded-2xl my-6" />

                            <div className="flex gap-3 sm:gap-4 items-center self-start mb-8">
                                <p className="text-xs sm:text-sm text-gray-300">
                                    {t("index.news.buttons.share")}:
                                </p>

                                <button
                                    className={buttonClass}
                                    onClick={() =>
                                        shareOnX(
                                            translateContent(item.title),
                                            item.slug,
                                        )
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
                                        copyLink(
                                            item.slug,
                                            translateContent(item.title),
                                        )
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

                                <button
                                    className={buttonClass}
                                    onClick={() =>
                                        shareNative(
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
                            </div>
                        </div>
                    </motion.article>
                ))}
            </AnimatePresence>
            <AnimatePresence>
                {visibleCount < news.length && (
                    <motion.button
                        id="loadNews"
                        key="loadNews"
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: -12,
                            transition: { duration: 0.15 },
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="bg-pink-400 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-3 rounded-full flex items-center gap-4 w-full max-w-90 mx-auto mt-4 justify-center transition-colors hover:bg-pink-500 hover:text-white shadow-pink-300/10 shadow-xl cursor-pointer"
                        onClick={() => setVisibleCount((prev) => prev + STEP)}
                    >
                        <motion.span
                            className="flex items-center"
                            animate={{ y: [0, 3, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <IconChevronDown />
                        </motion.span>
                        {t("index.news.buttons.load")}
                    </motion.button>
                )}
            </AnimatePresence>
        </section>
    );
}
