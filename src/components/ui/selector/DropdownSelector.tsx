import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Option<T extends string = string> {
    id: T;
    label: string;
    labelEdition?: string;
    icon?: ComponentType<any>;
}

interface Props<T extends string = string> {
    placeholder?: string;
    selectedOption?: Option<T>;
    options: Option<T>[];
    onSelect: (id: T) => void;
    disabled?: boolean;
}

export default function DropdownSelector<T extends string = string>({
    placeholder,
    selectedOption,
    options,
    onSelect,
    disabled,
}: Props<T>) {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);

    const handleSelect = (id: T) => {
        onSelect(id);
        setIsOpen(false);
    };

    return (
        <div
            ref={dropdownRef}
            className="relative w-full max-w-90 max-mobile:max-w-80"
        >
            <button
                type="button"
                disabled={disabled}
                className={`rounded-full w-full flex items-center justify-between px-6 py-4 max-mobile:px-4 max-mobile:py-3 bg-(--button-bg) text-indigo-50 ${
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "transition cursor-pointer hover:bg-(--button-bg-hover)"
                }`}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
            >
                <span className="font-medium">
                    {selectedOption?.label ?? "Selecciona una plataforma"}
                </span>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <IconChevronDown />
                </motion.div>
            </button>

            {!disabled && (
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute flex flex-col bg-(--button-bg) max-h-65 mt-2 rounded-3xl w-full pl-5 max-mobile:pl-4 pt-5 pb-3"
                        >
                            <span className="font-medium text-lg mb-4 shrink-0">
                                {placeholder}
                            </span>

                            <div
                                className="flex flex-col items-start gap-2 pr-5 max-mobile:pr-4 overflow-y-auto scroll-selector"
                                data-lenis-prevent
                            >
                                {options.map((option) => {
                                    const isSelected =
                                        option.id === selectedOption?.id;

                                    return (
                                        <button
                                            type="button"
                                            key={option.id}
                                            onClick={() =>
                                                handleSelect(option.id)
                                            }
                                            className={`duration-300 cursor-pointer transition w-full p-2 rounded-xl grid grid-cols-[auto_1fr] gap-3.5 ${
                                                isSelected
                                                    ? "bg-white"
                                                    : "bg-(--button-bg-hover) hover:bg-[#4E4A7B]"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center row-span-full self-center bg-[#1F1F38] rounded-lg w-12 h-12 p-2">
                                                {option.icon && (
                                                    <option.icon className="size-max" />
                                                )}
                                            </div>

                                            <div
                                                className={`flex flex-col items-start ${
                                                    !option.labelEdition
                                                        ? "justify-center h-full"
                                                        : ""
                                                } ${
                                                    isSelected
                                                        ? "text-[#2F2E52]"
                                                        : "text-pink-50"
                                                }`}
                                            >
                                                <span
                                                    className={`text-base font-bold ${
                                                        !option.labelEdition
                                                            ? "row-span-2"
                                                            : ""
                                                    }`}
                                                >
                                                    {option.label}
                                                </span>

                                                {option.labelEdition && (
                                                    <span className="text-sm font-thin text-start">
                                                        {t(option.labelEdition)}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
