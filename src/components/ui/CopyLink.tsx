import { Tooltip } from "@/components/ui/Tooltip";
import useT from "@/hooks/useT";
import { IconCheck, IconLink } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

interface CopyLinkProps {
    id: string;
    label: string;
    searchParams?: Record<string, string>;
}

export default function CopyLink({ id, label, searchParams }: CopyLinkProps) {
    const t = useT();
    const copiedTimeout = useRef<number | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    async function handleCopyLink() {
        const url = new URL(window.location.href);

        Object.entries(searchParams ?? {}).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        url.hash = id;

        try {
            await navigator.clipboard.writeText(url.toString());
            setCopied(true);
            window.clearTimeout(copiedTimeout.current);
            copiedTimeout.current = window.setTimeout(
                () => setCopied(false),
                1200,
            );
        } catch (err) {
            console.error("No se pudo copiar el link:", err);
        }
    }

    useEffect(() => {
        if (window.location.hash.slice(1) !== id) return;

        const scrollToTarget = () => {
            const el = document.getElementById(id);
            if (!el) return false;
            el.scrollIntoView();
            return true;
        };

        if (scrollToTarget()) return;

        const observer = new MutationObserver(() => {
            if (scrollToTarget()) observer.disconnect();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        const timeout = window.setTimeout(() => observer.disconnect(), 10000);

        return () => {
            observer.disconnect();
            window.clearTimeout(timeout);
        };
    }, [id]);

    useEffect(() => {
        return () => window.clearTimeout(copiedTimeout.current);
    }, []);
    return (
        <Tooltip
            label={
                copied
                    ? t("common.buttons.copiedLink")
                    : t("common.buttons.copyLink")
            }
        >
            <button
                type="button"
                onClick={handleCopyLink}
                aria-label={
                    copied
                        ? t("common.buttons.copiedLink")
                        : t("common.buttons.copyLinkTo", { label })
                }
                className={`relative ml-1 size-6 shrink-0 cursor-pointer transition duration-250 hover:text-yellow-100 focus-visible:opacity-100 max-mobile:opacity-100 group-hover:opacity-100 ${
                    copied ? "opacity-100" : "opacity-0"
                }`}
            >
                <IconLink
                    aria-hidden="true"
                    className={`absolute inset-0 transition duration-300 motion-reduce:transition-none ${
                        copied
                            ? "scale-50 rotate-90 opacity-0 blur-[2px]"
                            : "scale-100 rotate-0 opacity-100 blur-0"
                    }`}
                />
                <IconCheck
                    aria-hidden="true"
                    className={`absolute inset-0 transition duration-300 motion-reduce:transition-none ${
                        copied
                            ? "scale-100 rotate-0 opacity-100 blur-0"
                            : "scale-50 -rotate-90 opacity-0 blur-[2px]"
                    }`}
                />
            </button>
        </Tooltip>
    );
}
