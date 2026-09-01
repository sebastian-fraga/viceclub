import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";

import useT from "@/hooks/useT";

interface UnderConstructionProps {
    gameId?: string;
}

export default function UnderConstruction({ gameId }: UnderConstructionProps) {
    const t = useT();

    const handleBack = () => {
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;

        if (referrer.startsWith(currentOrigin)) {
            window.history.back();
            return;
        }

        if (gameId) {
            window.location.href = `/${gameId}/inicio`;
            return;
        }

        window.location.href = "/";
    };

    return (
        <div className="flex flex-col items-center gap-8 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
            >
                <h1 className="font-body-condensed text-5xl">
                    {t("404.underConstruction.title")}
                </h1>

                <p className="max-w-160 text-pretty text-base text-gray-100/80">
                    {t("404.underConstruction.subtitle")}
                </p>
            </motion.div>

            <motion.button
                type="button"
                onClick={handleBack}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.15,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-yellow-200 px-8 py-4 text-lg font-medium text-yellow-900 transition-colors duration-400 hover:bg-yellow-300 hover:text-black cursor-pointer"
            >
                <IconArrowLeft />
                {t("common.buttons.goBack")}
            </motion.button>
        </div>
    );
}
