import { useState } from "react";
import { motion } from "framer-motion";

import type { Setting } from "@/types/settings";

interface Props {
    setting: Setting;
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function Toggle({ setting, value, onChange }: Props) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            aria-label={setting.name}
            onClick={() => onChange(!value)}
            className={`relative w-10 h-6 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer ${
                value ? "bg-purple-400" : "bg-white/10"
            }`}
        >
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="block w-5 h-5 bg-white rounded-full shadow-sm"
                style={{ marginLeft: value ? 18 : 2 }}
            />
        </button>
    );
}
