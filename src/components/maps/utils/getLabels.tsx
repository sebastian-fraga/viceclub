import type { Description, LocalizedRequirement } from "@/components/maps/types";

export function getDescription(description: Description, lang: string): string {
    return typeof description === "string"
        ? description
        : (description[lang] ?? description["es"]);
}

export function getRequirement(
    requirement: LocalizedRequirement,
    lang: string,
): string {
    return typeof requirement === "string"
        ? requirement
        : (requirement[lang as keyof typeof requirement] ?? requirement.es);
}