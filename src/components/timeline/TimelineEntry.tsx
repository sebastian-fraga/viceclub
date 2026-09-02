import { Tooltip } from "@/components/ui/Tooltip";
import useT from "@/hooks/useT";
import {
    formatTimelineDateOnly,
    formatTimelineDateTime,
    type DateFormat,
    type TimeFormat,
} from "@/lib/timeline/formatTimelineTime";
import { getTimelineIcon } from "@/lib/timeline/timelineIcons";
import parse from "html-react-parser";
import { useState } from "react";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import "./timeline.css";

export interface TimelineEvent {
    time?: string;
    text: string;
    icon?: string;
    image?: string;
    footerText?: string;
    secondaryText?: string[];
    spoiler?: {
        text: string[];
        image?: string;
        footerText?: string;
    };
}

export interface TimelineEntryProps {
    date: string;
    time?: string;
    icon?: string;
    text?: string;
    image?: string;
    footerText?: string;
    secondaryText?: string[];
    spoiler?: {
        text: string[];
        image?: string;
        footerText?: string;
    };
    events?: TimelineEvent[];
    showDate?: boolean;
    timezone: string;
    timeFormat: TimeFormat;
    dateFormat: DateFormat;
    locale: string;
}

export default function TimelineEntry({
    date,
    time,
    icon = "timeline",
    text,
    image,
    footerText,
    secondaryText,
    spoiler,
    events,
    showDate = true,
    timezone,
    timeFormat,
    dateFormat,
    locale,
}: TimelineEntryProps) {
    const t = useT();

    const itemsToRender: TimelineEvent[] = events ?? [
        {
            time,
            text: text ?? "",
            icon,
            image,
            footerText,
            secondaryText,
            spoiler,
        },
    ];

    const representativeTime = time ?? itemsToRender[0]?.time;

    const displayDate = representativeTime
        ? formatTimelineDateTime(
              date,
              representativeTime,
              timeFormat,
              timezone,
              dateFormat,
              locale,
          ).date
        : formatTimelineDateOnly(date, dateFormat);

    return (
        <article className="timeline-entry flex flex-col">
            {showDate && (
                <div className="flex items-baseline gap-1.5 mb-3 ml-2 max-mobile:ml-0">
                    <h3 className="text-sm font-bold tracking-wide text-slate-100 uppercase">
                        {displayDate}
                    </h3>
                </div>
            )}

            <div className="flex flex-col gap-6 ml-2 max-mobile:gap-4 max-mobile:ml-0">
                {itemsToRender.map((event, index) => (
                    <div
                        key={index}
                        className="timeline-event-enter"
                        style={
                            { "--stagger-index": index } as React.CSSProperties
                        }
                    >
                        <TimelineEventItem
                            event={event}
                            t={t}
                            date={date}
                            timezone={timezone}
                            timeFormat={timeFormat}
                            dateFormat={dateFormat}
                            locale={locale}
                        />
                    </div>
                ))}
            </div>
        </article>
    );
}

function TimelineEventItem({
    event,
    t,
    date,
    timezone,
    timeFormat,
    dateFormat,
    locale,
}: {
    event: TimelineEvent;
    t: any;
    date: string;
    timezone: string;
    timeFormat: TimeFormat;
    dateFormat: DateFormat;
    locale: string;
}) {
    const [spoilerOpen, setSpoilerOpen] = useState(false);
    const {
        icon = "timeline",
        time,
        text,
        image,
        footerText,
        secondaryText,
        spoiler,
    } = event;

    const { icon: Icon, label, style } = getTimelineIcon(icon);

    const displayTime = time
        ? formatTimelineDateTime(
              date,
              time,
              timeFormat,
              timezone,
              dateFormat,
              locale,
          ).time
        : undefined;

    return (
        <div className="timeline-event">
            <div className="timeline-event-body">
                <div
                    className={`timeline-node shrink-0 w-9 h-9 max-mobile:w-8 max-mobile:h-8 rounded-lg shadow-md flex items-center justify-center relative z-10 ${style.bg} ${style.shadow}`}
                >
                    <Tooltip
                        label={t(`timeline.icons.${label}`)}
                        position="bottom"
                    >
                        <Icon
                            size={22}
                            className={`hover:cursor-help max-mobile:size-4.5 ${style.text}`}
                            stroke={2}
                        />
                    </Tooltip>
                </div>

                <div className="timeline-content flex-1 min-w-0">
                    {displayTime && (
                        <div className="timeline-event-time mb-1">
                            <h4 className="text-sm text-slate-500 font-medium">
                                {displayTime}
                            </h4>
                        </div>
                    )}

                    <div className="timeline-main">
                        <div className="timeline-copy">
                            <p className="timeline-text text-xl max-mobile:text-lg text-pretty leading-relaxed text-slate-200 mb-3.5 text-styles">
                                {parse(text)}
                            </p>

                            {secondaryText?.map((paragraph, i) => (
                                <p
                                    key={i}
                                    className="text-base/6 max-mobile:text-sm/6 max-w-210 text-gray-300/90 mb-2 text-styles"
                                >
                                    {parse(paragraph)}
                                </p>
                            ))}
                        </div>

                        {image && (
                            <div className="timeline-image">
                                <img
                                    src={image}
                                    loading="lazy"
                                    className="w-full rounded-xl border-slate-500 border-2 drop-shadow-xl drop-shadow-indigo-400/20"
                                    alt={t(
                                        "timeline.accessibility.timelineImage",
                                    )}
                                />
                                {footerText && (
                                    <div className="text-xs flex items-center mt-0.5 ml-1.5 pt-2 pl-1 text-gray-300 relative">
                                        <div className="absolute rounded-full left-0.5 h-full w-0.5 bg-purple-300/80"></div>

                                        <p className="italic pl-2">
                                            {footerText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {spoiler && (
                        <div className="spoiler-container relative mt-4 w-full rounded-2xl bg-(--button-bg)/40 overflow-hidden">
                            <div className="flex items-center justify-between gap-2 px-4 py-3.5 max-mobile:px-3 max-mobile:py-2 border-b border-indigo-950/50 bg-(--button-bg)/40">
                                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                                    <IconEye size={14} stroke={2} />
                                    Spoiler
                                </span>

                                {spoilerOpen && (
                                    <button
                                        type="button"
                                        onClick={() => setSpoilerOpen(false)}
                                        aria-expanded={true}
                                        aria-controls="spoiler-content"
                                        className="flex items-center gap-1.5 rounded-full bg-(--button-bg) text-white px-3 py-1 text-xs font-medium backdrop-blur-sm cursor-pointer hover:bg-(--button-bg-hover) transition"
                                    >
                                        <IconEyeOff size={14} stroke={2} />
                                        {t("timeline.buttons.hideSpoilers")}
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <div
                                    id="spoiler-content"
                                    role="region"
                                    aria-label={t(
                                        "timeline.accessibility.spoilerContent",
                                    )}
                                    aria-hidden={!spoilerOpen}
                                    className={`px-5 py-6 max-mobile:px-4 max-mobile:py-5 transition-[filter,opacity] duration-300 ${
                                        spoilerOpen
                                            ? "opacity-100"
                                            : "blur-sm select-none opacity-60"
                                    }`}
                                >
                                    <div className="text-base leading-relaxed text-indigo-100 max-w-full">
                                        {spoiler.text.map(
                                            (paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className={
                                                        index > 0 ? "mt-4" : ""
                                                    }
                                                >
                                                    {parse(paragraph)}
                                                </p>
                                            ),
                                        )}
                                    </div>

                                    {spoiler.image && (
                                        <div className="mt-3 rounded-lg overflow-hidden max-w-lg">
                                            <img
                                                src={spoiler.image}
                                                loading="lazy"
                                                className="block w-full h-auto object-cover"
                                                alt={t(
                                                    "timeline.accessibility.timelineImage",
                                                )}
                                            />

                                            {spoiler.footerText && (
                                                <div className="px-2.5 py-1.5 text-xs text-gray-400 bg-white">
                                                    {spoiler.footerText}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {!spoilerOpen && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/20">
                                        <button
                                            type="button"
                                            onClick={() => setSpoilerOpen(true)}
                                            aria-expanded={false}
                                            aria-controls="spoiler-content"
                                            className="flex items-center gap-2 rounded-full bg-indigo-300 px-5 py-2.5 max-mobile:px-4 max-mobile:py-2 max-mobile:text-sm text-sm font-medium text-blue-950 cursor-pointer hover:bg-indigo-600 hover:text-white shadow-lg active:scale-[0.98] transition"
                                        >
                                            <IconEye size={18} stroke={2} />
                                            {t("timeline.buttons.showSpoilers")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
