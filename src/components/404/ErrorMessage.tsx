import { IconArrowLeft } from "@tabler/icons-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import useErrorPageLanguage from "@/hooks/useErrorPageLanguage";
import useLocalePath from "@/hooks/useLocalePath";
import useT from "@/hooks/useT";

export default function ErrorMessage() {
    const t = useT();
    const lp = useLocalePath();
    const reduceMotion = useReducedMotion();

    useErrorPageLanguage();

    const container: Variants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <div className="relative flex flex-col items-center px-4 text-center">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/10 blur-3xl sm:size-96"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-body-condensed text-[10rem] leading-none text-white/3 sm:text-[16rem]"
            >
                404
            </span>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative flex flex-col items-center gap-6"
            >

                <motion.div
                    variants={item}
                    className="flex flex-col items-center gap-3"
                >
                    <h1 className="font-body-condensed text-balance bg-linear-to-b from-white to-white/60 bg-clip-text text-4xl tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        {t("404.title")}
                    </h1>
                    <p className="max-w-160 text-pretty text-base text-gray-100/70 md:text-lg">
                        {t("404.subtitle")}
                    </p>
                </motion.div>

                <motion.a
                    variants={item}
                    href={lp("/")}
                    whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className="group mt-2 flex items-center gap-2 rounded-full bg-yellow-200 px-8 py-4 text-lg font-medium text-yellow-900 shadow-[0_8px_30px_-8px] shadow-yellow-200/40 ring-1 ring-inset ring-white/30 transition-[background-color,color,box-shadow] duration-300 hover:bg-yellow-300 hover:text-black hover:shadow-yellow-200/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200"
                >
                    <IconArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                    {t("404.backToHome")}
                </motion.a>
            </motion.div>
        </div>
    );
}
