import useT from "@/hooks/useT";
import { useEffect, useState } from "react";

export default function Header() {
    const i18n = useT();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onSidebarState = (event: Event) => {
            setOpen((event as CustomEvent<{ open: boolean }>).detail.open);
        };

        document.addEventListener("vc:sidebar-state", onSidebarState);

        return () => {
            document.removeEventListener("vc:sidebar-state", onSidebarState);
        };
    }, []);

    const toggleSidebar = () => {
        document.dispatchEvent(new CustomEvent("vc:toggle-sidebar"));
    };

    return (
        <header className="fixed top-(--banner-height) inset-x-0 z-100 flex h-22 items-center justify-start max-mobile:justify-center overflow-hidden border-b-2 border-slate-700/40 bg-linear-90 from-[#15151F] via-slate-950 to-[#15151F] transition-[top] duration-200 ease-out">
            <button
                type="button"
                id="mobile-menu-toggle"
                onClick={toggleSidebar}
                aria-expanded={open}
                aria-label={
                    open
                        ? i18n("common.accessibility.closeSidebar")
                        : i18n("common.accessibility.openSidebar")
                }
                className="flex mobile:hidden absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:text-white bg-white/10 transition z-10 cursor-pointer"
            >
                <svg
                    id="mobile-menu-icon-hamburger"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
            </button>

            <a
                href="/"
                className="m-0 p-0 leading-none transition-all duration-400 ease-in-out active:scale-90 hover:brightness-75 flex items-center justify-start gap-4 max-mobile:flex-none max-mobile:gap-2"
            >
                <img
                    className="ml-7.5 w-[4em] drop-shadow-2xl drop-shadow-purple-800/40 max-mobile:ml-0 max-mobile:w-15"
                    src="/assets/images/app/logo.webp"
                    alt=""
                />
                <span className="select-none text-center font-body-condensed text-5xl tracking-tight bg-linear-to-b from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent [-webkit-text-stroke:1.5px_#101525] drop-shadow-[0_2px_6px_#667AFF4A] transition-all ease-in-out max-mobile:text-[2.3em]">
                    VICE CLUB
                </span>
            </a>
        </header>
    );
}
