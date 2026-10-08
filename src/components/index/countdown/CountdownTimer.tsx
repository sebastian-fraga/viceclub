import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Transition,
} from "framer-motion";

type Props = {
    value: number | null;
    label: string;
};

export default function CountdownTimer({ value, label }: Props) {
    const shouldReduceMotion = useReducedMotion();
    const displayValue =
        value === null ? "--" : value.toString().padStart(2, "0");

    const digitTransition: Transition = shouldReduceMotion
        ? { duration: 0.15 }
        : { duration: 0.3, ease: "easeOut" };

    return (
        <div className="flex flex-col items-center gap-1 max-mobile:gap-2">
            <div className="relative h-16 w-24 max-mobile:h-7 max-mobile:w-12 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
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
                        className="absolute inset-0 flex items-center justify-center max-mobile:text-3xl text-6xl leading-none text-cyan-50/95 tabular-nums drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] font-body-condensed"
                    >
                        {displayValue}
                    </motion.span>
                </AnimatePresence>
            </div>

            <span className="text-xl max-mobile:text-xs uppercase tracking-wide text-cyan-100/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] font-body-condensed">
                {label}
            </span>
        </div>
    );
}
