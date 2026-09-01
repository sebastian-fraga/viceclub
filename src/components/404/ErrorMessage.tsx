import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";

import useT from "@/hooks/useT";

export default function ErrorMessage() {
    const t = useT()
    return (
        <div className="flex flex-col items-center gap-8 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-2"
            >
                <h1 className="text-5xl font-body-condensed">
                    {t("404.title")}
                </h1>
                <span className="text-lg text-center text-gray-100/80">
                    {t("404.subtitle")}
                </span>
            </motion.div>

            <motion.a
                href="/"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-yellow-200 px-8 py-4 text-lg font-medium text-yellow-900 transition-colors hover:bg-yellow-300 hover:text-black duration-400"
            >
                <IconArrowLeft />
                {t("404.backToHome")}
            </motion.a>
        </div>
    );
}
