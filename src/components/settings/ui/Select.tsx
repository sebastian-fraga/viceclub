import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { BR, ES, FR, GB } from "country-flag-icons/react/3x2";

import type { SelectOption, SelectSetting } from "@/types/settings";

interface Props {
    setting: SelectSetting;
    value: string;
    onChange: (value: string) => void;
    options?: SelectOption[];
    disabled?: boolean;
}

export default function Select({
    setting,
    value,
    onChange,
    options,
    disabled = false,
}: Props) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, openUp: false });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const selectOptions = options ?? setting.options;

    const flags = {
        ES,
        EN: GB,
        FR,
        PT: BR,
    };

    const selectedOption = selectOptions.find(
        (option) => option.value === value,
    );

    useLayoutEffect(() => {
        if (!open || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const menuHeight = selectOptions.length * 32 + 8;
        const spaceBelow = window.innerHeight - rect.bottom;
        const openUp = spaceBelow < menuHeight && rect.top > menuHeight;

        setCoords({
            top: openUp ? rect.top - menuHeight - 4 : rect.bottom + 4,
            left: rect.right - 128,
            openUp,
        });
    }, [open, selectOptions]);

    const SelectedFlag = selectedOption
        ? flags[selectedOption.value.toUpperCase() as keyof typeof flags]
        : undefined;

    return (
        <div className="relative shrink-0">
            <button
                ref={buttonRef}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-md transition-colors ${
                    disabled
                        ? "text-white/30 bg-white/5 cursor-not-allowed"
                        : "text-white bg-white/10 hover:bg-white/15 cursor-pointer"
                }`}
            >
                {SelectedFlag && (
                    <SelectedFlag
                        title={selectedOption?.label}
                        className="w-5 h-auto"
                    />
                )}

                {t(selectedOption?.label ?? "settings.options.select")}

                <IconChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <>
                                <div
                                    className="fixed inset-0 z-20050"
                                    onClick={() => setOpen(false)}
                                />

                                <motion.ul
                                    role="listbox"
                                    initial={{
                                        opacity: 0,
                                        y: coords.openUp ? 4 : -4,
                                        scale: 0.97,
                                    }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        y: coords.openUp ? 4 : -4,
                                        scale: 0.97,
                                    }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        top: coords.top,
                                        left: coords.left,
                                    }}
                                    className="fixed min-w-32 bg-[#1c1c28] border border-white/10 rounded-md shadow-lg overflow-hidden z-20100 max-h-60 scroll-settings overflow-y-auto"
                                >
                                    {selectOptions.map((option) => {
                                        const Flag =
                                            flags[
                                                option.value.toUpperCase() as keyof typeof flags
                                            ];

                                        return (
                                            <li
                                                key={option.value}
                                                role="option"
                                                aria-selected={
                                                    option.value === value
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        onChange(option.value);
                                                        setOpen(false);
                                                    }}
                                                    className="flex items-center justify-between w-full px-3 py-1.5 text-xs text-left text-gray-200 hover:bg-white/5 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {Flag && (
                                                            <Flag
                                                                title={
                                                                    option.label
                                                                }
                                                                className="w-5 h-auto"
                                                            />
                                                        )}
                                                        <span>
                                                            {t(option.label)}
                                                        </span>
                                                    </div>
                                                    {option.value === value && (
                                                        <IconCheck
                                                            size={12}
                                                            className="text-purple-300"
                                                        />
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </motion.ul>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}
