import type { Game } from "@/types/game";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useT from "@/hooks/useT";
import Title from "../ui/Title";
import { Tooltip } from "../ui/Tooltip";

interface TechSheetProps {
    game: string;
    variantId: string;
    title: string;
    developers: string[];
    publisher: string;
    producer: string;
    writers: string[];
    platforms: string[];
    dates: Game["technicalSheet"]["dates"];
    engines: string[];
    sales?: string;
}

function ChevronIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

interface CollapsibleRowProps {
    label: string;
    children: React.ReactNode;
}

function CollapsibleRow({ label, children }: CollapsibleRowProps) {
    const t = useT();
    const [open, setOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-lg bg-(--button-bg-hover)/40">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-left"
            >
                <span className="shrink-0 text-neutral-300 text-base font-body-condensed">
                    {t(label)}
                </span>

                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-100"
                >
                    <ChevronIcon />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-3">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Row({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    const t = useT();

    return (
        <div className="flex items-start justify-between gap-3 rounded-md bg-(--button-bg-hover)/40 px-3 py-2 max-mobile:gap-2">
            <dt className="shrink-0 text-neutral-300 text-base font-body-condensed">
                {t(label)}
            </dt>

            <dd className="text-right font-bold max-mobile:text-xs">
                {children}
            </dd>
        </div>
    );
}

function PlatformChip({ label }: { label: string }) {
    return (
        <span className="mb-1 rounded-full bg-neutral-100 px-4.5 py-1.5 text-sm font-bold text-neutral-800 max-mobile:px-2 max-mobile:py-0.5 max-mobile:text-xs">
            {label}
        </span>
    );
}

const ACRONYM_TOOLTIPS: Record<string, string> = {
    NA: "common.editionLabels.NA",
    EU: "common.editionLabels.EU",
    AU: "common.editionLabels.AU",
    "10TH": "common.editionLabels.10th",
    DE: "common.editionLabels.DE",
    E: "common.editionLabels.E",
    "E&E": "common.editionLabels.E&E",
};

function parseTag(raw: string): { text: string; tag: string | null } {
    const match = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);

    if (!match) {
        return {
            text: raw,
            tag: null,
        };
    }

    return {
        text: match[1].trim(),
        tag: match[2].trim(),
    };
}

function AcronymBadge({ tag }: { tag: string }) {
    const t = useT();

    const labelKey = ACRONYM_TOOLTIPS[tag.toUpperCase()];

    const badge = (
        <span className="cursor-help rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90">
            {tag}
        </span>
    );

    if (!labelKey) return badge;

    return (
        <Tooltip label={t(labelKey)} position="right">
            {badge}
        </Tooltip>
    );
}

function DateLine({
    date,
}: {
    date: Game["technicalSheet"]["dates"][number]["dates"][number];
}) {
    const t = useT();

    return (
        <span className="inline-flex items-center gap-1.5 pl-4 text-sm text-neutral-400 max-mobile:text-[11px]">
            {t(date.key)}
            {date.tag && <AcronymBadge tag={date.tag} />}
        </span>
    );
}

export default function TechSheet({
    game,
    variantId,
    title,
    developers,
    publisher,
    producer,
    writers,
    dates,
    engines,
    sales,
}: TechSheetProps) {
    const t = useT();
    return (
        <motion.section
            className="flex flex-col items-start gap-3 max-mobile:w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
        >
            <Title label="home.titles.technicalSheet" align="left" />

            <div className="mt-8 w-full max-w-lg rounded-2xl bg-(--button-bg) p-4 shadow-2xl shadow-black/40 max-mobile:mt-5 max-mobile:p-3">
                <img
                    src={`/assets/images/main/boxarts/portada_${variantId}.webp`}
                    alt={`Portada de ${title}🌴`}
                    className="mx-auto mb-4 block w-full rounded-lg max-mobile:mb-3"
                />

                <dl className="flex flex-col gap-1.5 text-sm">
                    <Row
                        label={
                            developers.length > 1
                                ? "home.technicalSheet.developers"
                                : "home.technicalSheet.developer"
                        }
                    >
                        {developers.map((d) => (
                            <span key={d} className="block">
                                {d}
                            </span>
                        ))}
                    </Row>

                    <Row label="home.technicalSheet.publisher">{publisher}</Row>

                    <Row label="home.technicalSheet.producer">{producer}</Row>

                    <Row label="home.technicalSheet.writers">
                        {writers.map((w) => (
                            <span key={w} className="block">
                                {w}
                            </span>
                        ))}
                    </Row>

                    <Row label="home.technicalSheet.engine">
                        {engines.map((engine) => {
                            const { text, tag } = parseTag(engine);

                            return (
                                <span key={engine} className="block">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    />
                                    {tag && (
                                        <>
                                            {" "}
                                            <AcronymBadge tag={tag} />
                                        </>
                                    )}
                                </span>
                            );
                        })}
                    </Row>

                    {sales && (
                        <Row label="home.technicalSheet.sales">{t(sales)}</Row>
                    )}
                </dl>

                <div className="mt-1.5">
                    <CollapsibleRow label="home.technicalSheet.releaseDate">
                        <div className="mt-2 flex flex-col gap-5.5">
                            {dates.map((entry, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex flex-wrap gap-1.5">
                                        {entry.platforms.map((p) => (
                                            <PlatformChip key={p} label={p} />
                                        ))}
                                    </div>

                                    {entry.dates.map((date) => (
                                        <DateLine key={date.key} date={date} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </CollapsibleRow>
                </div>
            </div>
        </motion.section>
    );
}
