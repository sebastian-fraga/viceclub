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

export interface TimelineIcon {
    icon: Icon;
    label: string;
}

export const timelineIcons: Record<string, TimelineIcon> = {
    official: {
        icon: IconRosetteDiscountCheck,
        label: "official",
    },
    marketing: {
        icon: IconSpeakerphone,
        label: "marketing",
    },
    leak: {
        icon: IconMessageExclamation,
        label: "leak",
    },
    milestone: {
        icon: IconCrown,
        label: "milestone",
    },
    delay: {
        icon: IconCalendarCancel,
        label: "delay",
    },
    press: {
        icon: IconNews,
        label: "press",
    },
};

export function getTimelineIcon(icon?: string): TimelineIcon {
    return (
        timelineIcons[icon ?? ""] ?? {
            icon: IconTimeline,
            label: "Línea de tiempo",
        }
    );
}