import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CountdownTimer from "./CountdownTimer";

import PlayStation5 from "../../icons/PlayStation5";
import XboxSeries from "../../icons/XboxSeries";

const RELEASE_DATE = new Date("Nov 19, 2026 00:00:00").getTime();

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeLeft(): TimeLeft {
    const distance = RELEASE_DATE - Date.now();

    if (distance <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

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
    "bg-[url('/assets/images/main/countdown.webp')] bg-cover bg-top flex flex-col justify-center items-center text-center mx-auto my-6 rounded-2xl text-slate-50 p-6 max-mobile:p-3 w-[92%] max-w-7xl h-[clamp(220px,28vw,280px)] drop-shadow-2xl drop-shadow-cyan-300/20 border-4 border-blue-600/60 relative overflow-hidden";

export default function Countdown() {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const shouldReduceMotion = useReducedMotion();

    const timers = timeLeft
    ? [
        { value: timeLeft.days, label: t("index.countdown.days") },
        { value: timeLeft.hours, label: t("index.countdown.hours") },
        { value: timeLeft.minutes, label: t("index.countdown.minutes") },
        { value: timeLeft.seconds, label: t("index.countdown.seconds") },
    ]
    : [];

    useEffect(() => {
        const updateTime = () => {
            setTimeLeft(getTimeLeft());
        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const finished =
        timeLeft !== null &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0;

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
                    className={sectionBaseClass}
                >
                    <div className="space-y-6 w-full">
                        <h2
                            className="
                            font-black
                            text-[clamp(1rem,3vw,2.5rem)]
                            leading-tight
                            bg-linear-to-b
                            from-[#7374f4]
                            via-[#dc8ee4]
                            to-[#e59e7a]
                            bg-clip-text
                            text-transparent
                            text-balance
                            "
                            style={{
                                WebkitTextStroke: "1px rgba(70, 50, 120, 0.7)",
                            }}
                        >
                            {t("index.countdown.finishedTitle")}
                        </h2>

                        <motion.div
                            className="flex justify-center gap-4 max-mobile:gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.a
                                variants={itemVariants}
                                href="https://www.playstation.com/games/grand-theft-auto-vi/"
                                className="
                                bg-slate-800
                                px-[clamp(0.75rem,2vw,1.5rem)]
                                py-[clamp(0.4rem,1vw,0.75rem)]
                                rounded-full
                                hover:bg-slate-700
                                transition
                                flex
                                items-center
                                justify-center
                                "
                            >
                                <PlayStation5 />
                            </motion.a>

                            <motion.a
                                variants={itemVariants}
                                href="https://www.xbox.com/games/store/grand-theft-auto-vi/9nl3wwnzlzzn"
                                className="
                                bg-slate-800
                                px-[clamp(0.75rem,2vw,1.5rem)]
                                py-[clamp(0.4rem,1vw,0.75rem)]
                                rounded-full
                                hover:bg-slate-700
                                transition
                                flex
                                items-center
                                justify-center
                                "
                            >
                                <XboxSeries />
                            </motion.a>
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
                    className={sectionBaseClass}
                >
                    <div className="space-y-5 w-full">
                        <h2
                            className="
                            font-black
                            text-[clamp(1rem,3vw,2.5rem)]
                            leading-tight
                            bg-linear-to-b
                            from-[#7374f4]
                            via-[#dc8ee4]
                            to-[#e59e7a]
                            bg-clip-text
                            text-transparent
                            text-balance
                            "
                            style={{
                                WebkitTextStroke: "1px rgba(70, 50, 120, 0.7)",
                            }}
                        >
                            {t("index.countdown.title")}
                        </h2>

                        <motion.div
                            className="flex justify-center items-center w-full overflow-hidden"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex items-center justify-center gap-1">
                                {timers.map((timer, index) => (
                                    <div
                                        key={timer.label}
                                        className="flex items-center"
                                    >
                                        <CountdownTimer
                                            value={timer.value}
                                            label={timer.label}
                                        />

                                        {index < timers.length - 1 && (
                                            <span className="px-1 text-xl font-bold text-white/60">
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
