import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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

    integrations: [sitemap(), react()],

    vite: {
        plugins: [tailwindcss()],

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
