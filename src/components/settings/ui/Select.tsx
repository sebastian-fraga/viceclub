import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { BR, ES, FR, GB } from "country-flag-icons/react/3x2";

import type { SelectOption, SelectSetting } from "@/types/settings";

const MENU_MARGIN = 8;
const MENU_GAP = 4;
const ROW_HEIGHT = 44;
const MENU_MAX_HEIGHT = 240;
const MENU_MIN_WIDTH = 208;

interface Props {
    setting: SelectSetting;
    value: string;
    onChange: (value: string) => void;
    options?: SelectOption[];
    disabled?: boolean;
}

interface MenuCoords {
    top?: number;
    bottom?: number;
    right: number;
    maxWidth: number;
    maxHeight: number;
    openUp: boolean;
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
    const [coords, setCoords] = useState<MenuCoords>({
        top: 0,
        right: MENU_MARGIN,
        maxWidth: MENU_MIN_WIDTH,
        maxHeight: MENU_MAX_HEIGHT,
        openUp: false,
    });
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
        const contentHeight = selectOptions.length * ROW_HEIGHT;

        const spaceBelow =
            window.innerHeight - rect.bottom - MENU_GAP - MENU_MARGIN;
        const spaceAbove = rect.top - MENU_GAP - MENU_MARGIN;

        const openUp = contentHeight > spaceBelow && spaceAbove > spaceBelow;
        const available = openUp ? spaceAbove : spaceBelow;

        const maxHeight = Math.max(0, Math.min(MENU_MAX_HEIGHT, available));

        const right = Math.max(MENU_MARGIN, window.innerWidth - rect.right);
        const maxWidth = window.innerWidth - right - MENU_MARGIN;

        setCoords({
            top: openUp ? undefined : rect.bottom + MENU_GAP,
            bottom: openUp
                ? window.innerHeight - rect.top + MENU_GAP
                : undefined,
            right,
            maxWidth,
            maxHeight,
            openUp,
        });
    }, [open, selectOptions]);

    useEffect(() => {
        if (!open) return;

        const close = () => setOpen(false);
        window.addEventListener("resize", close);

        return () => window.removeEventListener("resize", close);
    }, [open]);

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
                className={`group flex items-center justify-center gap-2 px-3.5 py-2 max-mobile:py-2.5 text-xs rounded-full min-w-30 max-mobile:min-w-0 transition-colors ${
                    disabled
                        ? "text-indigo-100/30 bg-(--button-bg)/40 cursor-not-allowed"
                        : "text-indigo-100 bg-(--button-bg) hover:bg-(--button-bg-hover) cursor-pointer"
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
                    className={`text-gray-400 transition-colors duration-200 group-hover:text-indigo-200 ${
                        open ? "rotate-180" : ""
                    } ${disabled ? "text-white/20" : ""}`}
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
                                        bottom: coords.bottom,
                                        right: coords.right,
                                        minWidth: Math.min(
                                            MENU_MIN_WIDTH,
                                            coords.maxWidth,
                                        ),
                                        maxWidth: coords.maxWidth,
                                        maxHeight: coords.maxHeight,
                                    }}
                                    className="fixed bg-[#1c1c28] rounded-md shadow-lg overflow-hidden z-20100 scroll-settings overflow-y-auto"
                                    data-lenis-prevent
                                >
                                    {selectOptions.map((option) => {
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
                                                    className={`flex items-center justify-between w-full px-3 py-3.5 text-xs text-left duration-200 transition-colors cursor-pointer ${
                                                        option.value === value
                                                            ? "bg-(--button-bg) text-white"
                                                            : "text-gray-200 hover:bg-(--button-bg-hover)/40 group"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium px-3">
                                                            {t(option.label)}
                                                        </span>
                                                    </div>

                                                    <input
                                                        type="radio"
                                                        checked={
                                                            option.value ===
                                                            value
                                                        }
                                                        readOnly
                                                        tabIndex={-1}
                                                        className="appearance-none w-4 h-4 rounded-full border-2 border-indigo-300/25 bg-[#1c1c28] relative cursor-pointer transition-colors duration-150 checked:border-indigo-300/80 group-hover:border-indigo-300 before:absolute before:inset-1 before:rounded-full before:bg-indigo-300/80 before:scale-0 checked:before:scale-200 before:transition-transform before:duration-150"
                                                    />
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
