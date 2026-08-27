import { sanityClient, urlFor } from "@/lib/app/sanityClient";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface BannerData {
    _id: string;
    active: boolean;
    text: {
        es?: string;
        en?: string;
        fr?: string;
        pt?: string;
    };
    link?: string;
    image?: any;
    startDate?: string;
    endDate?: string;
}

const backgroundStyles =
    "absolute w-1/4 max-mobile:w-16 h-full bg-no-repeat bg-cover";

const bannerQuery = `
    *[_type == "notificationBanner" && active == true][0]{
        _id,
        active,
        text,
        link,
        image,
        startDate,
        endDate
    }
`;

const STORAGE_KEY = "notification-banner-dismissed";
const BANNER_HEIGHT_PX = "60px";

export default function NotificationBanner() {
    const { i18n, t } = useTranslation();
    const [banner, setBanner] = useState<BannerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [dismissed, setDismissed] = useState(false);
    const [visible, setVisible] = useState(true);

    const hasAnimatedRef = useRef(false);
    const dismissedRef = useRef(dismissed);

    useEffect(() => {
        dismissedRef.current = dismissed;
    }, [dismissed]);

    useEffect(() => {
        sanityClient
            .fetch<BannerData | null>(bannerQuery)
            .then((data) => {
                if (!data) return;

                const dismissedId = localStorage.getItem(STORAGE_KEY);
                if (dismissedId === data._id) {
                    setDismissed(true);
                    return;
                }

                setBanner(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY <= 190;
            setVisible((current) => {
                if (current === shouldShow) return current;
                return shouldShow;
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleAfterSwap = () => {
            requestAnimationFrame(() => {
                setVisible(window.scrollY <= 120);
            });
        };

        document.addEventListener("astro:after-swap", handleAfterSwap);
        return () =>
            document.removeEventListener("astro:after-swap", handleAfterSwap);
    }, []);
    useEffect(() => {
        if (banner && visible && !dismissed) {
            document.documentElement.style.setProperty(
                "--banner-height",
                BANNER_HEIGHT_PX,
            );
        } else {
            document.documentElement.style.setProperty(
                "--banner-height",
                "0px",
            );
        }
    }, [banner, visible, dismissed]);

    const handleClose = () => {
        if (!banner) return;
        localStorage.setItem(STORAGE_KEY, banner._id);
        setDismissed(true);
    };

    if (loading || !banner) return null;

    return (
        <AnimatePresence mode="wait">
            {visible && !dismissed && (
                <motion.a
                    key={banner._id}
                    initial={
                        hasAnimatedRef.current ? false : { opacity: 0, y: -40 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        height: BANNER_HEIGHT_PX,
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                    }}
                    className={`group z-50 bg-linear-90 from-[#907FC1] via-[#b684cf] to-[#907FC1] w-full fixed top-0 left-0 right-0 flex justify-center items-center
                            ${banner.link ? "cursor-pointer" : "cursor-default"}
                            `}
                    href={banner.link ?? undefined}
                    aria-disabled={!banner.link}
                    onClick={(e) => {
                        if (!banner.link) {
                            e.preventDefault();
                        }
                    }}
                    onAnimationComplete={() => {
                        if (!hasAnimatedRef.current)
                            hasAnimatedRef.current = true;
                    }}
                >
                    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-full bg-[#cc98e2] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 z-10 pointer-events-none" />

                        <div
                            className={`${backgroundStyles} left-0 bg-[url(/assets/images/app/banner_notif.svg)] z-20`}
                            style={{ backgroundPosition: "100% center" }}
                        />

                        <div className="relative z-30 flex items-center justify-center text-base max-mobile:text-xs font-semibold text-white transition tracking-widest max-mobile:tracking-normal duration-500 gap-3 max-mobile:gap-2 group-hover:scale-102 max-mobile:px-14 max-mobile:max-w-full max-mobile:min-w-0">
                            {banner.image && (
                                <img
                                    src={urlFor(banner.image)
                                        .width(120)
                                        .quality(80)
                                        .url()}
                                    alt=""
                                    className="w-12 max-mobile:w-7 h-full max-mobile:h-7 object-cover z-0 pointer-events-none shrink-0"
                                />
                            )}
                            <span className="max-mobile:leading-tight max-mobile:line-clamp-2 max-mobile:text-center max-mobile:text-base">
                                {banner.text[
                                    i18n.language as keyof typeof banner.text
                                ] ?? banner.text.es}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClose();
                            }}
                            className="p-1.5 max-mobile:p-1 mr-2 max-mobile:mr-1 cursor-pointer backdrop:blur-2xl text-white absolute right-2 max-mobile:right-1 hover:scale-110 rounded-lg hover:text-slate-100 border border-transparent hover:border-white/40 hover:bg-slate-200/10 transition-all z-12000"
                            aria-label={t("index.banner.close")}
                        >
                            <IconX size={18} className="max-mobile:hidden" />
                            <IconX
                                size={15}
                                className="hidden max-mobile:block"
                            />
                        </button>

                        <div
                            className={`${backgroundStyles} right-0 bg-[url(/assets/images/app/banner_notif_2.svg)] z-20`}
                            style={{ backgroundPosition: "% center" }}
                        />
                    </div>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
