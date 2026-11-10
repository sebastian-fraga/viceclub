import ViceClubLogo from "@/components/ui/ViceClubLogo";
import useT from "@/hooks/useT";
import { APP_VERSION, COMMIT } from "@/lib/app/version";
import { IconBrandGithub, IconBrandX, IconMail } from "@tabler/icons-react";
import Support from "../index/support/Support";

const anchorClasses =
    "inline-flex items-center justify-center px-12 py-3 mobile:px-8 mobile:py-3 rounded-full transition-colors duration-200 text-white bg-(--button-bg)/30 hover:bg-(--button-bg)/50";

const footerDisclaimerClasses =
    "text-slate-300/70 text-center text-[11px] mobile:text-xs text-balance leading-relaxed";

export default function Footer() {
    const t = useT();

    return (
        <footer
            style={{ transition: "margin-left 0.3s" }}
            className="relative z-20 ml-0 mobile:ml-(--sidebar-width) bg-slate-950 pt-16 text-neutral-50 flex flex-col overflow-hidden border-t border-white/10"
        >
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 px-6 mobile:px-12 lg:px-32 pb-12">
                <div className="relative flex items-center gap-4 shrink-0">
                    <div className="absolute inset-0 z-0 bg-linear-to-r from-pink-700/40 via-yellow-200/25 to-blue-500/30 blur-2xl"></div>

                    <ViceClubLogo className="relative z-1 w-20 h-20 max-mobile:w-15 max-mobile:h-15 fill-slate-100/90" />

                    <span className="relative z-1 select-none text-center font-body-condensed text-4xl text-slate-100/90 max-mobile:text-[2.3em]">
                        VICE CLUB
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-4 w-full lg:w-auto">
                    <nav
                        aria-label={t("footer.socialNetworks")}
                        className="flex items-center gap-3"
                    >
                        <a
                            href="https://github.com/sebastian-fraga/viceclub"
                            aria-label="GitHub"
                            className={`${anchorClasses} hover:text-pink-300`}
                        >
                            <IconBrandGithub stroke={1.5} size={20} />
                        </a>

                        <a
                            href="https://x.com/ViceClubApp"
                            aria-label="X"
                            className={`${anchorClasses} hover:text-yellow-200`}
                        >
                            <IconBrandX stroke={1.5} size={20} />
                        </a>

                        <a
                            href="mailto:contact@viceclub.app"
                            aria-label="Email"
                            className={`${anchorClasses} hover:text-blue-300`}
                        >
                            <IconMail stroke={1.5} size={20} />
                        </a>
                    </nav>

                    <Support />
                </div>
            </div>

            <div className="w-full border-t border-white/5 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 mobile:gap-12 text-sm mobile:text-base text-center">
                    <span className="text-slate-400 font-medium">
                        © {new Date().getFullYear()} VICE CLUB
                    </span>

                    <span className="text-slate-400 font-light">
                        v{APP_VERSION} •{" "}
                        <a
                            href={`https://github.com/sebastian-fraga/viceclub/commit/${COMMIT}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition underline decoration-slate-700 hover:decoration-slate-400 underline-offset-2"
                        >
                            {COMMIT}
                        </a>
                    </span>
                </div>

                <div className="flex flex-col items-center gap-2 max-mobile:gap-4 max-w-4xl mx-auto mt-6 px-4 max-mobile:px-2 max-mobile:pb-8">
                    <p className={footerDisclaimerClasses}>
                        {t("footer.disclaimer.1")}
                    </p>

                    <p className={footerDisclaimerClasses}>
                        {t("footer.disclaimer.2")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
