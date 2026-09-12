const FILENAME_PREFIX = "viceclub-backup";

export function exportAllLocalStorage(): string {
    const data: Record<string, string> = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            data[key] = localStorage.getItem(key) ?? "";
        }
    }

    return JSON.stringify(data, null, 2);
}

export function downloadLocalStorageBackup(): void {
    const json = exportAllLocalStorage();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${FILENAME_PREFIX}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

export interface ImportResult {
    success: boolean;
    error?: string;
}

export function importAllLocalStorage(json: string): ImportResult {
    let parsed: unknown;

    try {
        parsed = JSON.parse(json);
    } catch {
        return { success: false, error: "invalid_json" };
    }

    if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
    ) {
        return { success: false, error: "invalid_format" };
    }

    const entries = Object.entries(parsed as Record<string, unknown>);
    const isValid = entries.every(([, value]) => typeof value === "string");

    if (!isValid) {
        return { success: false, error: "invalid_format" };
    }

    localStorage.clear();
    entries.forEach(([key, value]) => {
        localStorage.setItem(key, value as string);
    });

    return { success: true };
}

export function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}
