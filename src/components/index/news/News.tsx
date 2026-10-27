import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useScrollToPosition } from "@/hooks/useScrollToTop";
import useT from "@/hooks/useT";

import Title from "../../ui/Title";

import "./news.css";

import NewsArticle from "./NewsArticle";
import type { NewsItem } from "./types";

const NEWS_URL = "https://viceclub.s3.us-east-1.amazonaws.com/news.json";
const STEP = 2;
const SCROLL_RETRY_DELAY_MS = 50;
const SCROLL_RETRY_MAX_ATTEMPTS = 20;

export default function News() {
    const t = useT();

    const [news, setNews] = useState<NewsItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(STEP);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
    const [canShare, setCanShare] = useState(false);
    const scrollToPosition = useScrollToPosition();

    useEffect(() => {
        setCanShare(typeof navigator !== "undefined" && "share" in navigator);
    }, []);

    function getArticleUrl(slug: string) {
        return `https://viceclub.app?news=${slug}`;
    }

    function shareOnX(title: string, slug: string) {
        const url =
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}` +
            `&url=${encodeURIComponent(getArticleUrl(slug))}`;

        window.open(url, "_blank", "noopener");
    }

    async function copyLink(slug: string, title: string) {
        const text = `${title}\n${getArticleUrl(slug)}`;

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            return;
        }

        setCopiedSlug(slug);

        setTimeout(() => {
            setCopiedSlug((current) => (current === slug ? null : current));
        }, 1000);
    }

    async function shareNative(title: string, slug: string) {
        try {
            await navigator.share({
                title,
                url: getArticleUrl(slug),
            });
        } catch {}
    }

    function scrollToArticleWhenReady(index: number, attempt = 0) {
        const target = document.querySelectorAll(".news-article")[index];

        if (!target) {
            if (attempt < SCROLL_RETRY_MAX_ATTEMPTS) {
                setTimeout(
                    () => scrollToArticleWhenReady(index, attempt + 1),
                    SCROLL_RETRY_DELAY_MS,
                );
            }

            return;
        }

        const headerHeight = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--header-height",
            ),
        );

        const bannerHeight = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--banner-height",
            ),
        );

        const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            (Number.isNaN(headerHeight) ? 0 : headerHeight) -
            (Number.isNaN(bannerHeight) ? 0 : bannerHeight) -
            28;

        scrollToPosition(top);
    }

    function scrollToNews(list: NewsItem[]) {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get("news");

        if (!slug) return;

        const index = list.findIndex((n) => n.slug === slug);

        if (index === -1) return;

        if (index >= visibleCount) {
            setVisibleCount(index + 1);
        }

        scrollToArticleWhenReady(index);
    }

    useEffect(() => {
        const controller = new AbortController();

        fetch(NEWS_URL, {
            cache: "no-cache",
            signal: controller.signal,
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                return res.json();
            })
            .then((data: NewsItem[]) => {
                setNews(data);

                scrollToNews(data);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    console.error("No se pudieron cargar las noticias:", err);
                }
            });

        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="w-full max-w-400 flex flex-col items-start">
            <div className="flex">
                <Title label={t("index.titles.news")} align="left" />
            </div>
            <AnimatePresence mode="popLayout">
                {news.slice(0, visibleCount).map((item, newsIndex) => (
                    <NewsArticle
                        key={item.slug}
                        item={item}
                        newsIndex={newsIndex}
                        visibleCount={visibleCount}
                        copiedSlug={copiedSlug}
                        canShare={canShare}
                        onCopy={copyLink}
                        onShareX={shareOnX}
                        onShareNative={shareNative}
                    />
                ))}
            </AnimatePresence>
            <AnimatePresence>
                {visibleCount < news.length && (
                    <div className="w-full max-w-300 flex justify-center mt-6">
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
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            aria-label={t("index.news.buttons.load")}
                            className="bg-linear-to-br from-pink-400 to-fuchsia-400 text-white font-extrabold text-lg sm:text-xl px-10 sm:px-16 py-4 rounded-full flex items-center gap-4 w-full max-w-xl justify-center shadow-2xl shadow-pink-500/40 transition duration-500 hover:from-pink-500 hover:to-fuchsia-600 hover:shadow-pink-500/60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer my-12 max-mobile:my-2"
                            onClick={() =>
                                setVisibleCount((prev) => prev + STEP)
                            }
                        >
                            {t("index.news.buttons.load")}
                            <motion.span
                                className="flex items-center"
                                animate={{ y: [0, 4, 0] }}
                                transition={{
                                    duration: 1.1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <IconChevronDown size={22} />
                            </motion.span>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
