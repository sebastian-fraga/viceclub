const STORAGE_KEY = "viceclub-settings";

export function loadSettings<T>(): Partial<T> {
    if (typeof window === "undefined") {
        return {};
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return {};
    }

    try {
        return JSON.parse(stored);
    } catch {
        return {};
    }
}

export function saveSettings<T>(settings: T) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings),
    );
}

export function clearSettings() {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
}