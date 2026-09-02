const SPANISH_MONTHS: Record<string, number> = {
    ene: 0,
    feb: 1,
    mar: 2,
    abr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dic: 11,
};

function parseArgentinaDate(
    date: string,
): { day: number; month: number; year: number } | null {
    const parts = date.trim().toLowerCase().split(" ");
    if (parts.length !== 3) return null;

    const [day, monthAbbr, year] = parts;
    const month = SPANISH_MONTHS[monthAbbr];
    if (month === undefined) return null;

    return { day: Number(day), month, year: Number(year) };
}

function parseArgentinaDateTime(date: string, time: string): Date | null {
    const parsedDate = parseArgentinaDate(date);
    if (!parsedDate) return null;

    const [hours, minutes] = time.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    const iso = `${parsedDate.year}-${String(parsedDate.month + 1).padStart(
        2,
        "0",
    )}-${String(parsedDate.day).padStart(2, "0")}T${String(hours).padStart(
        2,
        "0",
    )}:${String(minutes).padStart(2, "0")}:00-03:00`;

    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export type TimeFormat = "12h" | "24h";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY";

export interface FormattedTimelineDateTime {
    date: string;
    time: string;
}

export function formatTimelineDateOnly(
    date: string,
    dateFormat: DateFormat,
): string {
    const parsed = parseArgentinaDate(date);
    if (!parsed) return date;

    const day = String(parsed.day).padStart(2, "0");
    const month = String(parsed.month + 1).padStart(2, "0");
    const year = parsed.year;

    return dateFormat === "DD/MM/YYYY"
        ? `${day}/${month}/${year}`
        : `${month}/${day}/${year}`;
}

export function formatTimelineDateTime(
    date: string,
    time: string,
    timeFormat: TimeFormat,
    timezoneOffset: string,
    dateFormat: DateFormat,
    locale: string,
): FormattedTimelineDateTime {
    const parsed = parseArgentinaDateTime(date, time);
    if (!parsed) return { date, time };

    const offsetHours = Number(timezoneOffset);
    if (Number.isNaN(offsetHours)) return { date, time };

    const shifted = new Date(parsed.getTime() + offsetHours * 3600_000);

    let formattedTime = time;
    try {
        formattedTime = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: timeFormat === "12h",
            timeZone: "UTC",
        }).format(shifted);
    } catch {
        formattedTime = time;
    }

    const day = String(shifted.getUTCDate()).padStart(2, "0");
    const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
    const year = shifted.getUTCFullYear();

    const formattedDate =
        dateFormat === "DD/MM/YYYY"
            ? `${day}/${month}/${year}`
            : `${month}/${day}/${year}`;

    return { date: formattedDate, time: formattedTime };
}
