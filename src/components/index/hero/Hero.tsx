import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useT from "@/hooks/useT";
const HERO_IMAGES = [
    "/assets/images/hero/1.webp",
    "/assets/images/hero/2.webp",
    "/assets/images/hero/3.webp",
    "/assets/images/hero/4.webp",
    "/assets/images/hero/5.webp",
    "/assets/images/hero/6.webp",
    "/assets/images/hero/7.webp",
    "/assets/images/hero/8.webp",
];

const ROTATE_INTERVAL_MS = 9500;

function shuffle<T>(array: T[]): T[] {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

export default function Hero() {
    const t = useT();
    const shouldReduceMotion = useReducedMotion();

    const [deck, setDeck] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setDeck(shuffle(HERO_IMAGES));
    }, []);

    useEffect(() => {
        if (shouldReduceMotion || deck.length === 0) return;

        timerRef.current = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= deck.length) {
                    const lastImage = deck[deck.length - 1];

                    let newDeck = shuffle(HERO_IMAGES);

                    if (newDeck[0] === lastImage && newDeck.length > 1) {
                        [newDeck[0], newDeck[1]] = [newDeck[1], newDeck[0]];
                    }

                    setDeck(newDeck);

                    return 0;
                }

                return nextIndex;
            });
        }, ROTATE_INTERVAL_MS);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [deck, shouldReduceMotion]);

    const currentImage = deck[index] || HERO_IMAGES[0];

    return (
        <section
            className="
                relative
                flex
                h-[calc(90vh-var(--header-height))]
                min-h-125
                w-full
                items-center
                justify-start
                overflow-hidden
                pl-22
                max-mobile:pl-0
            "
        >
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={currentImage}
                        src={currentImage}
                        alt={t("index.welcome.accessibility.heroImage")}
                        initial={{
                            opacity: 0,
                            scale: 1.08,
                            x: -30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1.12,
                            x: 30,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            opacity: {
                                duration: 1.2,
                                ease: "easeInOut",
                            },
                            scale: {
                                duration: ROTATE_INTERVAL_MS / 1000,
                                ease: "linear",
                            },
                            x: {
                                duration: ROTATE_INTERVAL_MS / 1000,
                                ease: "linear",
                            },
                        }}
                        className="absolute inset-0 h-full w-full object-cover object-[50%_15%] max-mobile:object-[65%_20%]"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-linear-to-b from-black/0 from-0% to-[#171723] to-100%" />
            </div>

            <div className="relative z-10 flex flex-col items-start max-mobile:items-center gap-8 px-6 pt-120 max-mobile:pt-60 text-center">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-8xl max-mobile:text-6xl text-balance font-black text-yellow-100 uppercase font-body-condensed"
                >
                    {t("index.welcome.title")}
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="max-w-xl text-pretty text-start max-mobile:text-center text-2xl max-mobile:text-lg text-violet-200 font-medium"
                >
                    {t("index.welcome.description")}
                </motion.p>

                <motion.a
                    href="#explore"
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mt-4 rounded-full bg-pink-200 px-10 max-mobile:px-12 max-mobile:py-4 py-5 text-2xl max-mobile:text-lg font-semibold tracking-wide text-[#3B304E] transition-colors duration-500 hover:bg-pink-300 relative"
                >
                    <div className="absolute inset-0 -z-10 rounded-full bg-pink-400/20 blur-lg animate-pulse" />
                    {t("index.welcome.button")}
                </motion.a>
            </div>
        </section>
    );
}
