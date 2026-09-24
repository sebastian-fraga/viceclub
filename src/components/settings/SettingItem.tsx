import useT from "@/hooks/useT";

import type { SelectOption, Setting } from "@/types/settings";

import { IconChevronRight } from "@tabler/icons-react";
import Select from "./ui/Select";
import Toggle from "./ui/Toggle";

export interface SettingStatusMessage {
    text: string;
    variant: "error" | "success";
}

interface Props {
    setting: Setting;
    value: string | boolean;
    onChange: (value: string | boolean) => void;
    onAction?: (id: string) => void;
    options?: SelectOption[];
    disabled?: boolean;
    statusMessage?: SettingStatusMessage;
}

export default function SettingItem({
    setting,
    value,
    onChange,
    onAction,
    options,
    disabled,
    statusMessage,
}: Props) {
    const t = useT();
    const Icon = setting.icon;

    const hasDescription = Boolean(setting.description);

    const mobileGrid = hasDescription
        ? "max-mobile:grid max-mobile:grid-cols-[auto_minmax(0,1fr)_auto] max-mobile:gap-x-3 max-mobile:gap-y-1"
        : "";
    const mobileContents = hasDescription ? "max-mobile:contents" : "";
    const placeIcon = hasDescription
        ? "max-mobile:col-start-1 max-mobile:row-start-1"
        : "";
    const placeName = hasDescription
        ? "max-mobile:col-start-2 max-mobile:row-start-1"
        : "";
    const placeControl = hasDescription
        ? "max-mobile:col-start-3 max-mobile:row-start-1"
        : "";
    const placeDescription = hasDescription
        ? "max-mobile:col-start-2 max-mobile:col-span-2 max-mobile:row-start-2"
        : "";

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

            case "action": {
                const hasCustomIcon = Boolean(setting.actionIcon);
                const ActionIcon = setting.actionIcon ?? IconChevronRight;

                const label = t(
                    setting.actionLabel ??
                        (setting.destructive
                            ? "common.buttons.reset"
                            : "common.buttons.open"),
                );

                return (
                    <button
                        onClick={() => onAction?.(setting.id)}
                        disabled={disabled}
                        className={`shrink-0 rounded-md transition-colors flex items-center justify-center gap-2 px-3.5 py-2 text-xs min-w-30 max-mobile:min-w-0 max-mobile:py-2.5 disabled:cursor-not-allowed cursor-pointer disabled:opacity-40 group ${
                            setting.destructive
                                ? "bg-red-500/15 text-red-300 hover:bg-red-500/25"
                                : "bg-white/10 text-white/80 hover:bg-white/15"
                        }`}
                    >
                        {hasCustomIcon ? (
                            <>
                                <ActionIcon size={14} />
                                {label}
                            </>
                        ) : (
                            <>
                                {label}
                                <ActionIcon
                                    size={14}
                                    className={
                                        setting.destructive
                                            ? "text-red-300/60 group-hover:text-red-300/80 transition-colors"
                                            : ""
                                    }
                                />
                            </>
                        )}
                    </button>
                );
            }
        }
    };

    const itemBase =
        "flex items-center justify-between w-full gap-3 px-4 py-3.5 max-mobile:px-3 rounded-md";

    const itemStyles = `${itemBase} ${
        setting.destructive ? "bg-red-500/5 text-red-200" : "bg-slate-500/5"
    } ${mobileGrid}`;

    const iconStyles = setting.destructive ? "text-red-400" : "text-yellow-200";

    const descriptionStyles =
        statusMessage?.variant === "error"
            ? "text-xs text-pretty text-red-400 max-mobile:max-w-90 pr-2"
            : statusMessage?.variant === "success"
              ? "text-xs text-pretty text-emerald-400 max-mobile:max-w-90 pr-2"
              : "text-xs text-pretty text-gray-400 max-mobile:max-w-90 pr-2";

    return (
        <div className={itemStyles}>
            <div
                className={`flex items-center gap-3 min-w-0 flex-1 ${mobileContents}`}
            >
                {Icon && (
                    <Icon
                        size={20}
                        className={`${iconStyles} shrink-0 ${placeIcon}`}
                    />
                )}

                <div
                    className={`flex flex-col gap-0.5 min-w-0 ${mobileContents}`}
                >
                    <span className={`text-sm mobile:truncate ${placeName}`}>
                        {t(setting.name)}
                    </span>

                    {statusMessage ? (
                        <span
                            className={`${descriptionStyles} ${placeDescription}`}
                        >
                            {statusMessage.text}
                        </span>
                    ) : (
                        setting.description && (
                            <span
                                className={`${descriptionStyles} ${placeDescription}`}
                            >
                                {t(setting.description)}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className={`shrink-0 ${placeControl}`}>{renderControl()}</div>
        </div>
    );
}
