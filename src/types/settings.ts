import type { TablerIcon } from "@tabler/icons-react";

type BaseSetting = {
    id: string;
    name: string;
    description?: string;
    destructive?: boolean;
    icon?: TablerIcon;
    hideOnMobile?: boolean
};

export type SelectOption = {
    label: string;
    value: string;
};

export type ToggleSetting = BaseSetting & {
    type: "toggle";
    defaultValue: boolean;
};

export type SelectSetting = BaseSetting & {
    type: "select";
    defaultValue: string;
    options: SelectOption[];
};

export type ActionSetting = BaseSetting & {
    type: "action";
};

export type Setting =
    | ToggleSetting
    | SelectSetting
    | ActionSetting;

export type SettingsSection = {
    id: string;
    name: string;
    settings: Setting[];
};

export type SettingValue<T extends Setting> =
    T extends ToggleSetting
    ? boolean
    : T extends SelectSetting
    ? string
    : never;