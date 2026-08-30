import { Tooltip } from "@/components/ui/Tooltip";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import type { ChecklistItemData } from "@/types/checklist";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChecklistItemProps {
    item: ChecklistItemData;
    game: string;
    checked: boolean;
    onToggle: (id: string) => void;
    hasDropdown?: boolean;
    children?: React.ReactNode;
}

export function ChecklistItem({
    item,
    game,
    checked,
    onToggle,
    hasDropdown = false,
    children,
}: ChecklistItemProps) {
    const { t } = useTranslation();
    const localizedText = useLocalizedText();
    const [open, setOpen] = useState(false);

    const toggleDropdown = () => {
        if (hasDropdown) setOpen((prev) => !prev);
    };

    const ariaLabel = item.texts
        ? item.texts.map((e) => localizedText(e.text)).join(" / ")
        : item.text
          ? localizedText(item.text)
          : "";
    return (
        <li
            className={`rounded-4xl transition-colors duration-200 ${
                checked ? "bg-white/2" : "bg-white/5"
            }`}
            data-id={item.id}
        >
            <div
                className="flex items-center gap-3 px-5 py-2.5 cursor-pointer max-mobile:px-2.5 max-mobile:py-2"
                role="checkbox"
                aria-checked={checked}
                aria-label={ariaLabel}
                tabIndex={0}
                onClick={() => onToggle(item.id)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggle(item.id);
                    }
                }}
            >
                <Tooltip
                    position="bottom"
                    label={
                        checked
                            ? t("checklist.markAsUncompleted")
                            : t("checklist.markAsCompleted")
                    }
                >
                    <label
                        className="relative shrink-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={checked}
                            tabIndex={-1}
                            aria-hidden="true"
                            onChange={() => onToggle(item.id)}
                        />
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-100 peer-checked:border-(--game-accent) peer-checked:bg-(--game-accent)">
                            <IconCheck
                                size={14}
                                className={`text-black transition-opacity duration-200 ${
                                    checked ? "opacity-100" : "opacity-0"
                                }`}
                            />
                        </span>
                    </label>
                </Tooltip>
                <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    {item.texts
                        ? item.texts.map((entry, i) => (
                              <span
                                  key={i}
                                  className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                                      checked
                                          ? "text-indigo-100/50 line-through decoration-white/30"
                                          : i > 0
                                            ? "text-indigo-100/90"
                                            : "text-indigo-100/90"
                                  }`}
                              >
                                  {entry.icon && (
                                      <img
                                          src={`/assets/images/icons/blips/${game}/${entry.icon}.webp`}
                                          className="h-auto max-w-6 w-auto"
                                          alt={t(
                                              "checklist.accessibility.entryIcon",
                                          )}
                                          loading="lazy"
                                      />
                                  )}
                                  <span className="truncate font-bold">
                                      {localizedText(entry.text)}
                                  </span>
                              </span>
                          ))
                        : item.text && (
                              <span
                                  className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                                      checked
                                          ? "text-indigo-100/50 line-through decoration-white/30"
                                          : "text-indigo-100/90"
                                  }`}
                              >
                                  {item.icon && (
                                      <img
                                          src={`/assets/images/icons/blips/${game}/${item.icon}.webp`}
                                          className="h-auto max-w-6 w-auto"
                                          alt={t(
                                              "checklist.accessibility.entryIcon",
                                          )}
                                          loading="lazy"
                                      />
                                  )}
                                  <span className="truncate font-bold">
                                      {localizedText(item.text)}
                                  </span>
                              </span>
                          )}
                </div>

                {hasDropdown && (
                    <button
                        className="shrink-0 text-white/50 transition-transform hover:text-white/80"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                        }}
                    >
                        <motion.span
                            className="flex"
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <IconChevronDown size={16} />
                        </motion.span>
                    </button>
                )}
            </div>

            {hasDropdown && (
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="px-3 pb-3 pt-1 text-sm text-white/60 max-mobile:px-2.5">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </li>
    );
}
