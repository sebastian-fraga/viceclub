import type { MaybeLocalizedText } from "@/types/localizedText";

export interface ChecklistTextEntry {
    icon?: string;
    text: MaybeLocalizedText;
}

export interface ChecklistItemData {
    id: string;
    icon?: string;
    text?: MaybeLocalizedText;
    texts?: ChecklistTextEntry[];
    tooltip?: MaybeLocalizedText;
}

export interface ChecklistSectionData {
    id: string;
    icon?: string;
    title: MaybeLocalizedText;
    items: ChecklistItemData[];
}

export interface ChecklistTabData {
    id: string;
    label: string;
    sections: ChecklistSectionData[];
}

export interface ChecklistData {
    tabs?: ChecklistTabData[];
    sections?: ChecklistSectionData[];
}
