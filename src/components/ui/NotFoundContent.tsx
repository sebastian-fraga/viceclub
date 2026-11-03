import useT from "@/hooks/useT";
import { IconMoodPuzzled } from "@tabler/icons-react";
import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "compact" | "fill" | "panel";

interface Props {
    message?: ReactNode;
    icon?: ReactNode;
    variant?: Variant;
    className?: string;
}

const variants = {
    compact: {
        container:
            "gap-2 rounded-xl border-white/15 p-8 text-sm text-white/70 max-mobile:text-xs",
        icon: "size-6 max-mobile:size-5",
    },
    fill: {
        container:
            "flex-1 min-h-0 justify-center gap-3 rounded-2xl border-white/30 px-6 text-lg text-white max-mobile:px-4 max-mobile:text-xs",
        icon: "size-8 text-white/80",
    },
    panel: {
        container:
            "justify-center gap-3 rounded-2xl border-white/25 bg-(--button-bg)/40 px-6 py-14 text-base text-white/80 max-mobile:py-10 max-mobile:text-sm",
        icon: "size-8 text-white/70 max-mobile:size-7",
    },
} satisfies Record<Variant, { container: string; icon: string }>;

export default function NotFoundContent({
    message,
    icon,
    variant = "compact",
    className,
}: Props) {
    const t = useT();
    const styles = variants[variant];

    return (
        <div
            role="status"
            className={clsx(
                "flex flex-col items-center border border-dashed text-center bg-linear-120",
                styles.container,
                className,
            )}
        >
            {icon ?? (
                <IconMoodPuzzled aria-hidden="true" className={styles.icon} />
            )}
            <span>{message ?? t("common.other.notAvailable")}</span>
        </div>
    );
}
