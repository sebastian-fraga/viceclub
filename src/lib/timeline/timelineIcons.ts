import {
    IconCalendarCancel,
    IconCrown,
    IconMessageExclamation,
    IconNews,
    IconRosetteDiscountCheck,
    IconSpeakerphone,
    IconTimeline,
    type Icon,
} from "@tabler/icons-react";

export interface TimelineIconStyle {
    bg: string;
    text: string;
    shadow: string;
}

export interface TimelineIcon {
    icon: Icon;
    label: string;
    style: TimelineIconStyle;
}

const defaultStyle: TimelineIconStyle = {
    bg: "bg-indigo-300",
    text: "text-blue-950",
    shadow: "shadow-indigo-500/40",
};

export const timelineIcons: Record<string, TimelineIcon> = {
    official: {
        icon: IconRosetteDiscountCheck,
        label: "official",
        style: defaultStyle,
    },
    marketing: {
        icon: IconSpeakerphone,
        label: "marketing",
        style: {
            bg: "bg-fuchsia-300",
            text: "text-fuchsia-950",
            shadow: "shadow-fuchsia-500/40",
        },
    },
    leak: {
        icon: IconMessageExclamation,
        label: "leak",
        style: {
            bg: "bg-rose-300",
            text: "text-rose-950",
            shadow: "shadow-rose-500/40",
        },
    },
    milestone: {
        icon: IconCrown,
        label: "milestone",
        style: {
            bg: "bg-amber-300",
            text: "text-amber-950",
            shadow: "shadow-amber-500/40",
        },
    },
    delay: {
        icon: IconCalendarCancel,
        label: "delay",
        style: {
            bg: "bg-orange-300",
            text: "text-orange-950",
            shadow: "shadow-orange-500/40",
        },
    },
    press: {
        icon: IconNews,
        label: "press",
        style: {
            bg: "bg-sky-300",
            text: "text-sky-950",
            shadow: "shadow-sky-500/40",
        },
    },
};

export function getTimelineIcon(icon?: string): TimelineIcon {
    return (
        timelineIcons[icon ?? ""] ?? {
            icon: IconTimeline,
            label: "Línea de tiempo",
            style: defaultStyle,
        }
    );
}
