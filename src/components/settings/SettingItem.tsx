import { useTranslation } from "react-i18next";

import type { SelectOption, Setting } from "@/types/settings";

import Select from "./ui/Select";
import Toggle from "./ui/Toggle";
import {  IconChevronRight } from "@tabler/icons-react";

interface Props {
    setting: Setting;
    value: string | boolean;
    onChange: (value: string | boolean) => void;
    onAction?: (id: string) => void;
    options?: SelectOption[];
    disabled?: boolean;
}

export default function SettingItem({
    setting,
    value,
    onChange,
    onAction,
    options,
    disabled,
}: Props) {
    const { t } = useTranslation();
    const Icon = setting.icon;

    const renderControl = () => {
        switch (setting.type) {
            case "toggle":
                return (
                    <Toggle
                        setting={setting}
                        value={value as boolean}
                        onChange={onChange}
                    />
                );

            case "select":
                return (
                    <Select
                        setting={setting}
                        value={value as string}
                        onChange={onChange}
                        options={options}
                        disabled={disabled}
                    />
                );

            case "action":
                return (
                    <button
                        onClick={() => onAction?.(setting.id)}
                        disabled={disabled}
                        className={`shrink-0 px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1 not-only-of-type:disabled:cursor-not-allowed cursor-pointer disabled:opacity-40 ${
                            setting.destructive
                                ? "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                                : "bg-white/10 text-white/80 hover:bg-white/15"
                        }`}
                    >
                        {t(
                            setting.destructive
                                ? "common.buttons.reset"
                                : "common.buttons.open",
                        )}
                        <IconChevronRight size={14}/>
                    </button>
                );
        }
    };

    const itemStyles = setting.destructive
        ? "flex items-center justify-between w-full px-4 py-3.5 bg-red-500/5 rounded-md text-red-200"
        : "flex items-center justify-between w-full px-4 py-3.5 bg-slate-500/5 rounded-md";

    const iconStyles = setting.destructive ? "text-red-400" : "text-purple-300";
    return (
        <div className={itemStyles}>
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {Icon && <Icon size={20} className={`${iconStyles} shrink-0`}  />}

                <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm truncate">{t(setting.name)}</span>

                    {setting.description && (
                        <span className="text-xs text-gray-400 max-mobile:max-w-90 pr-2">
                            {t(setting.description)}
                        </span>
                    )}
                </div>
            </div>

            {renderControl()}
        </div>
    );
}
