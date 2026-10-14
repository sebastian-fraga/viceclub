import type { MaybeLocalizedText } from "@/types/localizedText";
import type { DateFormat, TimeFormat } from "@/lib/timeline/formatTimelineTime";

export interface TimelineSpoiler {
    text: MaybeLocalizedText[];
    image?: string;
    footerText?: MaybeLocalizedText;
}

export interface TimelineEvent {
    time?: string;
    text: MaybeLocalizedText;
    icon?: string;
    image?: string;
    footerText?: MaybeLocalizedText;
    secondaryText?: MaybeLocalizedText[];
    spoiler?: TimelineSpoiler;
}

export interface TimelineEntryProps {
    date: string;
    time?: string;
    icon?: string;
    text?: MaybeLocalizedText;
    image?: string;
    footerText?: MaybeLocalizedText;
    secondaryText?: MaybeLocalizedText[];
    spoiler?: TimelineSpoiler;
    events?: TimelineEvent[];
    showDate?: boolean;
    timezone: string;
    timeFormat: TimeFormat;
    dateFormat: DateFormat;
    locale: string;
}
