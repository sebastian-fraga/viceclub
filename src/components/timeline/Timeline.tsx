import TimelineEntry from "@/components/timeline/TimelineEntry";
import Title from "@/components/ui/Title";
import useSettings from "@/hooks/useSettings";
import type { DateFormat } from "@/lib/timeline/formatTimelineTime";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface TimelineSpoiler {
    text: string[];
    image?: string;
    footerText?: string;
}

export interface TimelineEvent {
    time?: string;
    text: string;
    icon?: string;
    image?: string;
    footerText?: string;
    secondaryText?: string[];
    spoiler?: TimelineSpoiler;
}

interface TimelineEntryData {
    date: string;
    time?: string;
    text?: string;
    icon?: string;
    image?: string;
    footerText?: string;
    secondaryText?: string[];
    spoiler?: TimelineSpoiler;
    events?: TimelineEvent[];
}

export interface TimelineData {
    title: string;
    lastUpdated: string;
    entries: TimelineEntryData[];
}

interface TimelineProps {
    gameCode: string;
    initialData?: TimelineData | null;
}

interface TimeSettings {
    timezone: string;
    timeFormat: "12h" | "24h";
    dateFormat: DateFormat;
}

export default function Timeline({ gameCode, initialData }: TimelineProps) {
    const { t, i18n } = useTranslation();
    const { settings } = useSettings();

    const [data, setData] = useState<TimelineData | null>(initialData ?? null);
    const [hasError, setHasError] = useState(false);

    const [timeSettings, setTimeSettings] = useState<TimeSettings>({
        timezone: settings.timezone as string,
        timeFormat: settings.timeformat as "12h" | "24h",
        dateFormat: settings.dateformat as DateFormat,
    });

    useEffect(() => {
        const handleSettingsChange = (e: Event) => {
            const detail = (e as CustomEvent).detail as
                | Record<string, string | boolean>
                | undefined;

            if (!detail) return;

            if (
                typeof detail.timezone === "string" ||
                typeof detail.timeformat === "string" ||
                typeof detail.dateformat === "string"
            ) {
                setTimeSettings((prev) => ({
                    timezone:
                        typeof detail.timezone === "string"
                            ? detail.timezone
                            : prev.timezone,
                    timeFormat:
                        typeof detail.timeformat === "string"
                            ? (detail.timeformat as "12h" | "24h")
                            : prev.timeFormat,
                    dateFormat:
                        typeof detail.dateformat === "string"
                            ? (detail.dateformat as DateFormat)
                            : prev.dateFormat,
                }));
            }
        };

        window.addEventListener("settings-change", handleSettingsChange);
        return () =>
            window.removeEventListener("settings-change", handleSettingsChange);
    }, []);

    useEffect(() => {
        if (initialData) return;

        let cancelled = false;

        async function loadTimeline() {
            try {
                const response = await fetch(
                    `https://viceclub.s3.us-east-1.amazonaws.com/${gameCode}/timeline.json?t=${Date.now()}`,
                );
                const json: TimelineData = await response.json();
                if (!cancelled) setData(json);
            } catch (err) {
                console.error("Error al cargar el JSON:", err);
                if (!cancelled) setHasError(true);
            }
        }

        loadTimeline();

        return () => {
            cancelled = true;
        };
    }, [gameCode, initialData]);

    if (!data) {
        return (
            <section className="w-full max-w-400 mx-auto max-mobile:px-4 mobile:px-6 flex gap-8 flex-col mb-12 mt-12">
                <div className="max-w-fit">
                    <Title label="timeline.titles.vi" />
                </div>

                {hasError && (
                    <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <p className="text-slate-400 text-sm">
                            No pudimos cargar la línea de tiempo. Puede ser un
                            problema temporal.
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-full bg-indigo-300 px-5 py-2 text-sm font-medium text-blue-950 cursor-pointer hover:bg-indigo-600 hover:text-white transition"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
            </section>
        );
    }

    let lastYear: string | null = null;

    return (
        <section className="w-full max-w-400 mx-auto max-mobile:px-4 mobile:px-6 flex gap-8 flex-col mb-12 mt-12">
            <div className="max-w-fit">
                <Title label="timeline.titles.vi" />
            </div>

            {data.entries.map((entry, entryIdx) => {
                const year = entry.date.split(" ").at(-1);
                const showDivider = lastYear !== null && lastYear !== year;

                lastYear = year ?? null;

                return (
                    <div key={entryIdx}>
                        {showDivider && (
                            <div className="border-t border-gray-200/10 py-8" />
                        )}

                        <TimelineEntry
                            date={entry.date}
                            time={entry.time}
                            icon={entry.icon}
                            text={entry.text}
                            image={entry.image}
                            footerText={entry.footerText}
                            secondaryText={entry.secondaryText}
                            spoiler={entry.spoiler}
                            events={entry.events}
                            showDate
                            timezone={timeSettings.timezone}
                            timeFormat={timeSettings.timeFormat}
                            dateFormat={timeSettings.dateFormat}
                            locale={i18n.language}
                        />
                    </div>
                );
            })}
        </section>
    );
}
