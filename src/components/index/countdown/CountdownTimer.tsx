import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Transition,
} from "framer-motion";

type Props = {
    value: number;
    label: string;
};

export default function CountdownTimer({ value, label }: Props) {
    const shouldReduceMotion = useReducedMotion();
    const displayValue = value.toString().padStart(2, "0");

    const digitTransition: Transition = shouldReduceMotion
        ? { duration: 0.15 }
        : { duration: 0.3, ease: "easeOut" };

    return (
        <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="relative h-10 w-14 sm:h-14 sm:w-20 md:h-16 md:w-24 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={displayValue}
                        initial={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { y: 12, opacity: 0 }
                        }
                        animate={{ y: 0, opacity: 1 }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { y: -12, opacity: 0 }
                        }
                        transition={digitTransition}
                        className="absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-bold leading-none text-white tabular-nums"
                    >
                        {displayValue}
                    </motion.span>
                </AnimatePresence>
            </div>

            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide sm:tracking-widest text-slate-50">
                {label}
            </span>
        </div>
    );
}
