import useT from "@/hooks/useT";
import { IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import CountdownTimer from "./CountdownTimer";
import GradientBorder from "./GradientBorder";

import PS5Icon from "../../icons/playstation/PS5Icon";
import XboxSeries from "../../icons/xbox/XboxSeriesIcon";

const RELEASE_DATE = new Date("Nov 12, 2026 00:00:00").getTime();

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const EMPTY_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const PLATFORMS = [
    {
        name: "PlayStation 5",
        href: "https://www.playstation.com/games/grand-theft-auto-vi/",
        Icon: PS5Icon,
        iconClass:
            "size-12 opacity-85 group-hover:opacity-100 transition-opacity",
    },
    {
        name: "Xbox Series",
        href: "https://www.xbox.com/games/store/grand-theft-auto-vi/9nl3wwnzlzzn",
        Icon: XboxSeries,
        iconClass:
            "size-7 opacity-85 group-hover:opacity-100 transition-opacity",
    },
] as const;

function getTimeLeft(): TimeLeft {
    const distance = RELEASE_DATE - Date.now();

    if (distance <= 0) return EMPTY_TIME;

    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
}

const sectionBaseClass =
    "flex flex-col justify-center items-center text-center mx-auto my-6 [--gb-radius:1rem] max-mobile:[--gb-radius:2rem] rounded-(--gb-radius) text-slate-50 p-6 max-mobile:p-5 w-full max-w-7xl max-mobile:h-auto max-mobile:min-h-56 h-[clamp(220px,28vw,280px)] drop-shadow-2xl drop-shadow-cyan-300/15 relative overflow-hidden";

const countingBgClass =
    "bg-[url('/assets/images/main/countdown.webp')] bg-cover max-mobile:bg-[40%_50%]";

const finishedBgClass =
    "bg-[url('/assets/images/main/countdown-finished.webp')] bg-cover bg-top";

const overlayClass =
    "absolute inset-0 pointer-events-none bg-linear-to-t from-black/40 via-black/10 to-black/5 hidden max-mobile:inline";

const titleClass =
    "font-black text-[clamp(1rem,3vw,2.5rem)] max-mobile:text-[26px] leading-tight bg-linear-to-b bg-clip-text text-transparent text-balance";

const countingTitleClass = "from-[#7374f4] via-[#dc8ee4] to-[#e59e7a]";

const finishedTitleClass =
    "from-[#9295ff] via-[#f0a5f2] to-[#ffbd91] drop-shadow-[0_0_12px_rgba(220,142,228,0.45)]";

const platformLinkClass =
    "group flex flex-col items-center justify-center gap-1.5 w-56 h-18 max-mobile:w-auto max-mobile:min-w-0 max-mobile:flex-1 rounded-3xl bg-slate-900/70 backdrop-blur-sm transition-colors hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 shadow-xl shadow-yellow-100/10";

const platformLabelClass =
    "flex items-center justify-center gap-1 text-xs font-semibold tracking-wider text-yellow-50/90 group-hover:text-yellow-100 whitespace-nowrap relative w-full";

const platformArrowClass =
    "transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none absolute right-5";

const platformLogoSlotClass = "flex h-7 items-center justify-center";

export default function Countdown() {
    const t = useT();
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    const shouldReduceMotion = useReducedMotion();

    const timers = [
        { value: timeLeft?.days ?? null, label: t("index.countdown.days") },
        { value: timeLeft?.hours ?? null, label: t("index.countdown.hours") },
        {
            value: timeLeft?.minutes ?? null,
            label: t("index.countdown.minutes"),
        },
        {
            value: timeLeft?.seconds ?? null,
            label: t("index.countdown.seconds"),
        },
    ];

    const timerAriaLabel = timeLeft
        ? timers.map((timer) => `${timer.value} ${timer.label}`).join(", ")
        : undefined;

    useEffect(() => {
        const updateTime = () => {
            setTimeLeft(getTimeLeft());
        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const finished =
        timeLeft !== null && Object.values(timeLeft).every((v) => v === 0);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.35,
                ease: "easeOut",
            } as const,
        },
    };

    const sectionTransition = shouldReduceMotion
        ? { duration: 0.15 }
        : ({
              duration: 0.4,
              ease: "easeOut",
          } as const);

    return (
        <AnimatePresence mode="wait">
            {finished ? (
                <motion.section
                    key="finished"
                    initial={{
                        opacity: 0,
                        scale: shouldReduceMotion ? 1 : 0.96,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: shouldReduceMotion ? 1 : 0.96,
                    }}
                    transition={sectionTransition}
                    className={`${sectionBaseClass}`}
                >
                    <div
                        aria-hidden="true"
                        className={`${finishedBgClass} absolute inset-0 scale-105 bg-linear-90 from-black-15 pointer-events-none`}
                    />
                    <div aria-hidden="true" className={overlayClass} />
                    <GradientBorder />

                    <div className="space-y-6 w-full relative">
                        <h2 className={`${titleClass} ${finishedTitleClass}`}>
                            {t("index.countdown.finishedTitle")}
                        </h2>

                        <motion.div
                            className="flex flex-wrap justify-center gap-4 max-mobile:gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {PLATFORMS.map(
                                ({ name, href, Icon, iconClass }) => (
                                    <motion.a
                                        key={name}
                                        variants={itemVariants}
                                        whileHover={
                                            shouldReduceMotion
                                                ? undefined
                                                : { scale: 1.04 }
                                        }
                                        whileTap={
                                            shouldReduceMotion
                                                ? undefined
                                                : { scale: 0.97 }
                                        }
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${t("index.countdown.getOn")} ${name}`}
                                        className={platformLinkClass}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={platformLabelClass}
                                        >
                                            {t("index.countdown.getOn")}
                                            <IconArrowUpRight
                                                size={12}
                                                stroke={2.5}
                                                className={platformArrowClass}
                                            />
                                        </span>

                                        <span className={platformLogoSlotClass}>
                                            <Icon
                                                aria-hidden="true"
                                                className={`shrink-0 ${iconClass}`}
                                            />
                                        </span>
                                    </motion.a>
                                ),
                            )}
                        </motion.div>
                    </div>
                </motion.section>
            ) : (
                <motion.section
                    key="counting"
                    id="countdown-section"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: shouldReduceMotion ? 1 : 0.96,
                    }}
                    transition={sectionTransition}
                    className={`${sectionBaseClass} ${countingBgClass}`}
                >
                    <div aria-hidden="true" className={overlayClass} />
                    <GradientBorder />

                    <div className="space-y-6 w-full relative">
                        <h2
                            className={`${titleClass} ${countingTitleClass}`}
                            style={{
                                WebkitTextStroke: "1px rgba(70, 50, 120, 0.7)",
                            }}
                        >
                            {t("index.countdown.title")}
                        </h2>

                        <motion.div
                            role="timer"
                            aria-label={timerAriaLabel}
                            className="flex justify-center items-center w-full overflow-hidden"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-start justify-center gap-px max-mobile:gap-1">
                                {timers.map((timer, index) => (
                                    <div
                                        key={timer.label}
                                        className="flex items-start"
                                    >
                                        <CountdownTimer
                                            value={timer.value}
                                            label={timer.label}
                                        />

                                        {index < timers.length - 1 && (
                                            <span
                                                aria-hidden="true"
                                                className="flex h-18 max-mobile:h-7 items-center px-px text-xl max-mobile:text-base font-bold leading-none text-yellow-50/80"
                                            >
                                                :
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
