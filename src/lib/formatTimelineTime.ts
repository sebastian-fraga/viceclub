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

function parseArgentinaDateTime(date: string, time: string): Date | null {
    const parts = date.trim().toLowerCase().split(" ");
    if (parts.length !== 3) return null;

    const [day, monthAbbr, year] = parts;
    const month = SPANISH_MONTHS[monthAbbr];
    if (month === undefined) return null;

    const [hours, minutes] = time.split(":").map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        Number(day),
    ).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(
        minutes,
    ).padStart(2, "0")}:00-03:00`;

    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export type TimeFormat = "12h" | "24h";

export function formatTimelineTime(
    date: string,
    time: string,
    timeFormat: TimeFormat,
    timezoneOffset: string,
    locale: string,
): string {
    const parsed = parseArgentinaDateTime(date, time);
    if (!parsed) return time;

    const offsetHours = Number(timezoneOffset);
    if (Number.isNaN(offsetHours)) return time;

    const shifted = new Date(parsed.getTime() + offsetHours * 3600_000);

    try {
        return new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: timeFormat === "12h",
            timeZone: "UTC",
        }).format(shifted);
    } catch {
        return time;
    }
}
