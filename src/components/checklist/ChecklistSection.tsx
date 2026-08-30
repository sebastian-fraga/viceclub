import { Tooltip } from "@/components/ui/Tooltip";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import useT from "@/hooks/useT";
import { useLocalizedText } from "../../hooks/useLocalizedText";
import type { ChecklistSectionData } from "../../types/checklist";
import { ChecklistItem } from "./ChecklistItem";

interface ChecklistSectionProps {
    section: ChecklistSectionData;
    game: string;
    checked: Record<string, boolean>;
    onToggleItem: (id: string) => void;
    onToggleAll: (ids: string[], value: boolean) => void;
}

export function ChecklistSection({
    section,
    game,
    checked,
    onToggleItem,
    onToggleAll,
}: ChecklistSectionProps) {
   const i18n = useT()
    const t = useLocalizedText();
    const [open, setOpen] = useState(false);

    const ids = useMemo(() => section.items.map((i) => i.id), [section.items]);
    const doneCount = ids.filter((id) => checked[id]).length;
    const allDone = ids.length > 0 && doneCount === ids.length;

    const handleCheckAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleAll(ids, !allDone);
    };

    return (
        <article
            className={`overflow-hidden rounded-4xl border transition-colors ${
                allDone
                    ? "border-(--game-accent)/10 bg-(--game-accent)/5"
                    : "border-white/10 bg-white/3"
            }`}
        >
            <h3
                className="flex items-center gap-3.5 px-6 py-3 cursor-pointer select-none max-mobile:px-3 max-mobile:py-2.5"
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }
                }}
            >
                {section.icon && (
                    <img
                        src={`/assets/images/icons/blips/${game}/${section.icon}.webp`}
                        className="h-auto max-w-6 w-auto"
                        alt={t("checklist.accessibility.entryIcon")}
                        loading="lazy"
                    />
                )}
                <span className="flex-1 text-lg font-bold text-white/90 max-mobile:text-[13px]">
                    {t(section.title)}
                </span>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 tabular-nums">
                        {doneCount} / {ids.length}
                    </span>
                    <Tooltip
                        position="bottom"
                        label={
                            allDone
                                ? i18n("checklist.markAsUncompleted")
                                : i18n("checklist.markAsCompleted")
                        }
                    >
                        <button
                            className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all cursor-pointer hover:brightness-80 ${
                                allDone
                                    ? "border-(--game-accent) bg-(--game-accent) text-black"
                                    : "border-white/20 text-white/40"
                            }`}
                            onClick={handleCheckAll}
                        >
                            <IconCheck size={16} />
                        </button>
                    </Tooltip>
                    <motion.span
                        className="flex text-white/50"
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <IconChevronDown size={18} />
                    </motion.span>
                </div>
            </h3>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <ul className="flex flex-col gap-1.5 px-3 pb-3 max-mobile:px-2 max-mobile:pb-2">
                            {section.items.map((item) => (
                                <ChecklistItem
                                    key={item.id}
                                    item={item}
                                    game={game}
                                    checked={!!checked[item.id]}
                                    onToggle={onToggleItem}
                                />
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
}
