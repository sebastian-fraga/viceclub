import useT from "@/hooks/useT";
import {
    formatTimelineDateOnly,
    formatTimelineDateTime,
} from "@/lib/timeline/formatTimelineTime";
import TimelineEventItem from "./TimelineEventItem";
import type { TimelineEntryProps, TimelineEvent } from "./types";
import "./timeline.css";

interface DateGroup {
    date: string;
    items: { event: TimelineEvent; index: number }[];
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

    const entryDate = representativeTime
        ? formatTimelineDateTime(
              date,
              representativeTime,
              timeFormat,
              timezone,
              dateFormat,
              locale,
          ).date
        : formatTimelineDateOnly(date, dateFormat);

    const groups: DateGroup[] = [];
    itemsToRender.forEach((event, index) => {
        const lastGroup = groups[groups.length - 1];

        const eventDate = event.time
            ? formatTimelineDateTime(
                  date,
                  event.time,
                  timeFormat,
                  timezone,
                  dateFormat,
                  locale,
              ).date
            : (lastGroup?.date ?? entryDate);

        if (lastGroup && lastGroup.date === eventDate) {
            lastGroup.items.push({ event, index });
        } else {
            groups.push({ date: eventDate, items: [{ event, index }] });
        }
    });

    return (
        <article className="timeline-entry flex flex-col">
            {groups.map((group, groupIndex) => {
                const shouldShowDate = groupIndex > 0 || showDate;

                return (
                    <div
                        key={`${group.date}-${groupIndex}`}
                        className={groupIndex > 0 ? "mt-6" : ""}
                    >
                        {shouldShowDate && (
                            <div className="flex items-baseline gap-1.5 mb-5 ml-2 max-mobile:ml-0">
                                <h3 className="text-xl tracking-wide text-slate-100 uppercase font-body-condensed">
                                    {group.date}
                                </h3>
                            </div>
                        )}

                        <div className="flex flex-col gap-6 ml-2 max-mobile:gap-4 max-mobile:ml-0">
                            {group.items.map(({ event, index }) => (
                                <div
                                    key={index}
                                    className="timeline-event-enter"
                                    style={
                                        {
                                            "--stagger-index": index,
                                        } as React.CSSProperties
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
                    </div>
                );
            })}
        </article>
    );
}
