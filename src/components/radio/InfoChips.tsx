import { Tooltip } from "@/components/ui/Tooltip";
import clsx from "clsx";
import type { ComponentType } from "react";

import { ScrollableChips } from "./ScrollableChips";

interface InfoChipsProps {
    items: string[];
    icon: ComponentType<{ className?: string }>;
    tooltipLabel: string;
    getLabel?: (item: string) => string;
    chipClassName: string;
    iconClassName: string;
    textClassName: string;
}

export function InfoChips({
    items,
    icon: Icon,
    tooltipLabel,
    getLabel,
    chipClassName,
    iconClassName,
    textClassName,
}: InfoChipsProps) {
    if (items.length === 0) return null;

    return (
        <ScrollableChips contentKey={items}>
            {items.map((item) => (
                <div
                    key={item}
                    className={clsx(
                        "flex items-center gap-2 px-8 max-mobile:px-3 py-1.5 rounded-full shrink-0 max-w-full max-mobile:first:ml-auto max-mobile:last:mr-auto",
                        chipClassName,
                    )}
                >
                    <Tooltip position="bottom" label={tooltipLabel}>
                        <Icon
                            className={clsx(
                                "shrink-0 cursor-help",
                                iconClassName,
                            )}
                        />
                    </Tooltip>

                    <span
                        className={clsx(
                            "text-base max-mobile:text-sm truncate min-w-0 font-medium",
                            textClassName,
                        )}
                    >
                        {getLabel ? getLabel(item) : item}
                    </span>
                </div>
            ))}
        </ScrollableChips>
    );
}
