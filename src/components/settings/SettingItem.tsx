import { useTranslation } from "react-i18next";

import type { SelectOption, Setting } from "@/types/settings";

import Select from "./ui/Select";
import Toggle from "./ui/Toggle";

interface Props {
    setting: Setting;
    value: string | boolean;
    onChange: (value: string | boolean) => void;
    options?: SelectOption[];
    disabled?: boolean;
}

export default function SettingItem({
    setting,
    value,
    onChange,
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
                return <button>Button</button>;
        }
    };

    const itemStyles = setting.destructive
        ? "flex items-center justify-between w-full px-4 py-3.5 bg-red-500/5 rounded-md text-red-200"
        : "flex items-center justify-between w-full px-4 py-3.5 bg-slate-500/5 rounded-md";

    const iconStyles = setting.destructive ? "text-red-400" : "text-purple-300";
    return (
        <div className={itemStyles}>
            {}
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {Icon && <Icon size={20} className={iconStyles} />}

                <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm truncate">{t(setting.name)}</span>

                    {setting.description && (
                        <span className="text-xs text-gray-400 max-w-90">
                            {t(setting.description)}
                        </span>
                    )}
                </div>
            </div>

            {renderControl()}
        </div>
    );
}
