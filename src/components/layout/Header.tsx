import useLocalePath from "@/hooks/useLocalePath";
import useT from "@/hooks/useT";
import { useEffect, useState } from "react";

export default function Header() {
    const i18n = useT();
    const lp = useLocalePath();
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
        <header className="fixed top-(--banner-height) inset-x-0 z-100 flex h-22 items-center justify-start max-mobile:justify-center overflow-hidden bg-slate-950 shadow-2xl transition-[top] duration-700 ease-in-out">
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
                className="flex mobile:hidden absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:text-white bg-white/10 transition z-10 cursor-pointer max-mobile:ml-2"
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
                href={lp("/")}
                className="m-0 p-0 leading-none transition-all duration-400 ease-in-out active:scale-90 hover:brightness-75 flex items-center justify-start gap-3 max-mobile:flex-none max-mobile:gap-2 max-mobile:mr-2"
            >
                <img
                    className="ml-10 w-16 max-mobile:ml-0 max-mobile:w-14 fill-pink-50"
                    src="/public/assets/images/app/logos/logo.webp"
                    alt="Vice Club logo"
                />
                <span className="select-none text-center font-body-condensed tracking-tighter text-5xl bg-linear-to-b from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent [-webkit-text-stroke:1.5px_#101525] drop-shadow-[0_2px_6px_#667AFF4A]">
                    VICE CLUB
                </span>
            </a>
        </header>
    );
}
