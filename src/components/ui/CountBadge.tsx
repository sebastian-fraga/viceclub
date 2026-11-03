interface CountBadgeProps {
    count: number | string;
    backgroundColor?: string;
    color?: string;
}

export default function CountBadge({
    count,
    backgroundColor = "var(--button-bg)",
    color = "inherit"
}: CountBadgeProps) {
    return (
        <span
            className="shrink-0 rounded-[4px] px-2 py-0.5 font-body-condensed text-sm"
            style={{ backgroundColor, color }}
        >
            {count}
        </span>
    );
}
