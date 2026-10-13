import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const LOCALE_SLUGS = ["es", "en", "fr", "pt-br"];

function localeRedirect() {
    const handler = (req, res, next) => {
        const accept = req.headers.accept ?? "";
        if (req.method !== "GET" || !accept.includes("text/html"))
            return next();

        const { pathname, search } = new URL(
            req.url ?? "/",
            "http://localhost",
        );

        const skip =
            pathname.includes(".") ||
            pathname.startsWith("/@") ||
            pathname.startsWith("/_") ||
            pathname.startsWith("/src/") ||
            pathname.startsWith("/node_modules/") ||
            LOCALE_SLUGS.some(
                (slug) =>
                    pathname === `/${slug}` || pathname.startsWith(`/${slug}/`),
            );

        if (skip) return next();

        res.statusCode = 302;
        res.setHeader(
            "Location",
            `/es${pathname === "/" ? "" : pathname}${search}`,
        );
        res.end();
    };

    return {
        name: "dev-locale-redirect",
        configureServer(server) {
            server.middlewares.use(handler);
        },
        configurePreviewServer(server) {
            server.middlewares.use(handler);
        },
    };
}

export default defineConfig({
    site: "https://www.viceclub.app",
    trailingSlash: "never",

    i18n: {
        defaultLocale: "es",
        locales: [
            "es",
            "en",
            "fr",
            {
                path: "pt-br",
                codes: ["pt"],
            },
        ],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },

    integrations: [
        sitemap({
            i18n: {
                defaultLocale: "es",
                locales: {
                    es: "es",
                    en: "en",
                    fr: "fr",
                    "pt-br": "pt-BR",
                },
            },
        }),
        react(),
    ],

    vite: {
        plugins: [tailwindcss(), localeRedirect()],

        server: {
            watch: {
                usePolling: true,
            },
            host: true,
            allowedHosts: true,
        },
        optimizeDeps: {
            include: ["astro/toolbar", "i18next", "react-i18next"],
        },
    },
});
