import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://www.viceclub.app",

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
