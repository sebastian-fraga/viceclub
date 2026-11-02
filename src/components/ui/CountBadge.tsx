interface CountBadgeProps {
    count: number | string;
}

export default function CountBadge({ count }: CountBadgeProps) {
    return (
        <span className="shrink-0 rounded-[4px] bg-(--button-bg) px-2 py-0.5 font-body-condensed text-sm">
            {count}
        </span>
    );
}
