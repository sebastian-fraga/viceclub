import useT from "@/hooks/useT";
import { IconMoodPuzzled } from "@tabler/icons-react";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "compact" | "fill";

interface Props {
    message?: ReactNode;
    icon?: ReactNode;
    variant?: Variant;
    className?: string;
}

const variantClasses: Record<Variant, string> = {
    compact:
        "gap-2 rounded-xl border-white/15 p-8 text-sm text-white/70 max-mobile:text-xs",
    fill: "flex-1 min-h-0 justify-center gap-3 rounded-2xl border-white/30 px-6 text-lg text-white max-mobile:px-4 max-mobile:text-xs",
};

const iconClasses: Record<Variant, string> = {
    compact: "size-6 max-mobile:size-5",
    fill: "size-8 text-white/80",
};

export default function NotFoundContent({
    message,
    icon,
    variant = "compact",
    className,
}: Props) {
    const t = useT();

    return (
        <div
            className={clsx(
                "flex flex-col items-center border border-dashed text-center bg-linear-120",
                variantClasses[variant],
                className,
            )}
        >
            {icon ?? <IconMoodPuzzled className={iconClasses[variant]} />}
            <span>{message ?? t("common.other.notAvailable")}</span>
        </div>
    );
}
