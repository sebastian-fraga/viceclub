import { motion } from "framer-motion";

const barCount = 3;
const barDelays = [0, 0.15, 0.3];

export function EqualizerBars() {
    return (
        <div className="flex items-end gap-0.5 h-4 w-4">
            {barDelays.map((delay, i) => (
                <motion.span
                    key={i}
                    className="w-1 rounded-full bg-violet-400"
                    animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                    }}
                />
            ))}
        </div>
    );
}
