const MIN_UTC_OFFSET = -12;
const MAX_UTC_OFFSET = 14;

export const utcOffsetOptions = Array.from(
    { length: MAX_UTC_OFFSET - MIN_UTC_OFFSET + 1 },
    (_, index) => {
        const offset = MIN_UTC_OFFSET + index;

        return {
            label: offset === 0
                ? "UTC"
                : `UTC${offset > 0 ? "+" : ""}${offset}`,
            value: String(offset),
        };
    },
);

const localOffset = -new Date().getTimezoneOffset() / 60;

export const defaultUtcOffset = String(localOffset);