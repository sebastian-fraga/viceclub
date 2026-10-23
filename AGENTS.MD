# AGENTS.md

Operational guide for AI agents working on Vice Club. User-facing documentation, screenshots, and badges are in `README.md`.

## 1. Project overview

Vice Club is a fan site for the Grand Theft Auto saga (III, Vice City, San Andreas, Liberty City Stories, Vice City Stories, IV, V, and VI). It offers news, cheats, 100% checklists, artworks, interactive maps, radio stations, mods, achievements, and a timeline. It is multilingual (ES, EN, FR, PT-BR), open source under the MIT license, and deployed at https://www.viceclub.app.

## 2. Stack and key dependencies

Versions according to `package.json`:

- **Astro `^7.2.4`** with static output and `@astrojs/react ^6.0.4`; `@astrojs/sitemap ^3.7.3`.
- **React `^19.2.8`** / React DOM, **TypeScript `^7.0.2`**.
- **Tailwind CSS `^4.3.3`** via `@tailwindcss/vite` (CSS-first configuration, no `tailwind.config`).
- **i18next `^26.4.0`** + **react-i18next `^17.0.12`**, plus Astro's native i18n.
- **UI/animation:** `@tabler/icons-react ^3.46.0`, `framer-motion ^12.43.0`, `radix-ui ^1.6.7`, `@base-ui/react ^1.7.0`, `shadcn ^4.18.0`, `clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`.
- **Maps:** `leaflet ^1.9.4`, `react-leaflet ^5.0.0`, `react-leaflet-cluster ^4.1.3`.
- **External content:** `@sanity/client ^7.26.2` + `@sanity/image-url ^2.1.1`; assets and JSON from AWS S3.
- **OG images:** `satori ^0.33.4`, `@resvg/resvg-js ^2.6.2`, `sharp ^0.35.4`.
- **Other:** `embla-carousel-react`, `lenis`, `canvas-confetti`, `country-flag-icons`, `html-react-parser`, `@vercel/analytics`, `@fontsource-variable/geist`.
- **Dev:** `playwright ^1.64.0`.
- **Sanity Studio `^6.9.2`** in `studio/`, a separate workspace package (`viceclub-studio`) with its own TypeScript `^5.8`, ESLint `^9.28`, and Prettier.

The project uses **pnpm** (`pnpm-lock.yaml` and `pnpm-workspace.yaml`). Do not use npm or yarn.

## 3. Commands

Root (Astro site):

```bash
pnpm install              # installs root and workspace
pnpm dev                  # Astro dev; defaults to http://localhost:4321
pnpm start                # alias for dev
pnpm build                # static build to dist/
pnpm preview              # serves the build
pnpm astro <args>         # Astro CLI
pnpm thumbs [-- --dry-run]
pnpm webkit [url] [device]
```

Sanity Studio (`studio/`, package `viceclub-studio`):

```bash
pnpm --filter viceclub-studio dev          # local Studio
pnpm --filter viceclub-studio build        # build the Studio
pnpm --filter viceclub-studio run deploy   # deploy; "run" is required because `pnpm deploy` is a built-in pnpm command
```

- `pnpm thumbs`: generates/uploads map thumbnails to S3 and adjusts `Cache-Control`. Requires an authenticated AWS CLI; uses `S3_BUCKET` (default `viceclub`). Options are documented in `scripts/generate-map-thumbs.mjs`.
- `pnpm webkit`: opens Playwright WebKit in headed mode; defaults to `http://localhost:4321` and `iPhone 14`.
- Manual scripts without aliases: `node scripts/unused-i18n-keys.mjs`, `node scripts/find-key.mjs "term"`, `./scripts/Convert-Images.ps1` (requires ImageMagick).

**The root has no lint, test, or typecheck scripts.** The main verification is `pnpm build`. `studio/` includes ESLint and Prettier as devDependencies but does not define a `lint` script either.

## 4. Folder structure

```text
public/             Static assets: GTA Art Deco fonts, icons, images, robots, manifest
scripts/            Node/PowerShell utilities: S3 thumbnails, WebKit, i18n audit, image conversion
src/
  components/       React and Astro components grouped by feature
    home/ index/ layout/ sidebar/ maps/ radio/ cheats/ checklist/ artworks/ mods/
    timeline/ settings/ icons/ ui/ providers/ 404/
  config/           Constants and types: games/sections, languages, platforms, stores, settings, breakpoints
  data/             Content: games/ (TS), artworks|cheats|checklists|maps|radio (JSON), mods/ (TS),
                    seo/ (TS per language), lang/ (i18next translations), characters.json
  hooks/            Shared React hooks: settings, locale, progress, UI
  layouts/          BaseLayout.astro (site) and ErrorLayout.astro (404)
  lib/              Non-React utilities: theme, localized text, loaders, Sanity/S3 clients, prefetch
  pages/            Astro routes: [locale]/..., og/ (images), 404
  styles/           main.css (Tailwind entry) + scroll.css + typography.css
  types/            Shared TypeScript types
  utils/            Pure utilities: locale, progress reset, confetti, platform selector
studio/             Separate Sanity Studio (current schema: notificationBanner)
```

## 5. Code conventions

- **Naming:** `PascalCase.tsx` components; `useSomething.ts` hooks; `camelCase.ts` utilities; Astro pages lowercase with public slugs in Spanish (`herramientas-y-mods`, `trucos`, `mapa`). Game IDs uppercase (`III`, `VC`, `SA`, `LCS`, `VCS`, `IV`, `V`, `VI`).
- **Organization:** each feature lives in its own folder under `components/` and may contain `hooks/`, `lib/`, `types/`, `utils/`, and its own CSS.
- **Root formatting:** 4 spaces, double quotes, semicolons. `studio/` has its own Prettier config (2 spaces, single quotes, no semicolons).
- **Imports:** alias `@/*` → `src/*` (defined in `tsconfig.json`). Relative imports are allowed within the same feature.
- **Typing:** local `Props` interfaces in components; shared types in `src/types`. Avoid introducing new `any` (existing ones are in integrations such as Sanity/satori).
- **Astro vs React components:** `.astro` for routes, layouts, and shells; React only for interactive islands. Use `client:load`, `client:visible`, or `client:idle` as needed; `client:only="react"` only for libraries that cannot handle SSR (Leaflet/maps).
- **Styling:** inline Tailwind classes. Per-feature CSS only when complexity justifies it (`artworks.css`, `map.css`, `radio.css`, etc.). Do not create a `tailwind.config`; the theme is defined in `src/styles/main.css`.
- **Breakpoints:** `mobile` = 660px and `max-mobile:` for inverse overrides (see `src/config/breakpoints.ts` and `@theme` in `main.css`).
- **UI i18n:** all visible text comes from `src/data/lang/*` via `useT()`/`useTranslation()` or `i18n.t()`. Do not hardcode copy (temporary exception: the 🌴 marker, see section 7).
- **Content text:** use `MaybeLocalizedText` + `resolveLocalizedText`/`useLocalizedText`; falls back to `es`.
- **Per-game data:** JSON/TS in `src/data`, loaded with `import.meta.glob({ eager: true })` + `createDataLoader` (`src/lib/data/createDataLoader.ts`).
- **View Transitions:** add `transition:persist` to global islands that must survive navigation and listen for `astro:after-swap` to resync state.
- **Commits:** in English, with a Conventional Commits-style prefix (`fix(maps): ...`, `refactor(scripts): ...`).

## 6. Architecture and important decisions

### Routes and static generation

- The site is **SSG**: every localized page exports `getStaticPaths()` and combines `LOCALES` with the available games.
- Routes: `/{locale}` (home), `/{locale}/{game}/inicio|100|artworks|herramientas-y-mods|logros|mapa|radio|trucos`, `/{locale}/VI/timeline`, `/404` (via `404.astro`), and `/og/[game].jpg`, `/og/fallback.jpg`.
- **Pages do not exist for every game.** Each `getStaticPaths` filters based on available data (cheats/radio/artworks/checklist JSON, `GAME_MODS`, SEO entries, or `games`). If the source is missing, the route is not generated. Keep this in mind when adding content.
- `src/config/games.ts` defines `GameId`, `SectionId`, sidebar metadata, `GAME_SECTIONS`, and `UNFINISHED_SECTIONS`.
- `trailingSlash: "never"` in Astro and `cleanUrls`/`trailingSlash: false` in Vercel. Canonical URLs are written without a trailing slash.

### i18n

- Internal languages: `es`, `en`, `fr`, `pt`. Public locale: `pt-br` maps internally to `pt` (`LOCALE_TO_LANG`).
- The default locale is `es` and is **always prefixed** (`/es/...`).
- `BaseLayout.astro` calls `await i18n.changeLanguage(...)` based on the route parameter; React islands consume that instance.
- Redirects for URLs without a locale: the `dev-locale-redirect` middleware in `astro.config.mjs` (dev/preview only) and rules in `vercel.json` (production). They rely on the `language` cookie and `Accept-Language`.
- UI fallbacks in `src/i18n.ts`: `fr`/`pt` → `en` → `es`; `en` → `es`.
- Per-language SEO in `src/data/seo/` with a fallback chain (`getPageSeo`): `es` → `es`; `en` → `en`,`es`; `fr`/`pt` → language, `en`, `es`.

### Content sources

- **Build-time/local:** games, mods, characters, translations, SEO, and artworks/cheats/checklists/maps/radio JSON live in `src/data`.
- **S3 at runtime:** artworks/map images, `news.json`, `{game}/timeline.json`, and other assets. The base URL is hardcoded: `https://viceclub.s3.us-east-1.amazonaws.com`.
- **Sanity at runtime:** only the notification banner (`NotificationBanner.tsx`). Project `8nstyewt`, dataset `production`; the Studio is in `studio/`.
- **There are no data API routes**; islands fetch directly from S3/Sanity. The only API routes are the OG images, prerendered with satori/resvg/sharp.

### State and cross-island communication

- There is no global store or Redux/Zustand. Local state uses `useState` + `localStorage` persistence.
- Keys used: `viceclub-settings`, `viceclub_checklist_{game}_{tabId}`, `completed_collectibles_{game}_{variantId}`, `viceclub:sidebar-expanded`, `radio-volume`, `notification-banner-dismissed`.
- Cross-island communication uses `CustomEvent` on `window`/`document`: `settings-change`, `checklist-progress-reset`, `map-progress-reset`, `vc:toggle-sidebar`, `vc:sidebar-state`.
- `useSettings` centralizes reading/validating settings and emits `settings-change`. `useSettingsStorage` is the direct `localStorage` access layer.

### Theming and styles

- Each game defines a `theme` in `src/data/games/*.ts`. `themeToCssVars()` converts it into CSS variables (`--game-accent`, `--game-buttons-*`) on the page wrapper.
- The global layout relies on `--sidebar-width`, `--header-height`, and `--banner-height`; the sidebar and banner modify them at runtime.
- Tailwind v4 is configured in CSS (`@theme`); `main.css` imports scroll, typography, `tw-animate-css`, and `shadcn/tailwind.css`.
- Icons: the project uses `@tabler/icons-react`. `components.json` declares `lucide` for the shadcn CLI, but the actual code uses Tabler; do not mix them.

### Performance and navigation

- `prefetch: false` in Astro is intentional: `src/lib/prefetchIslands.ts` preloads island chunks on hover/focus/pointerdown, with caching and respect for slow connections.
- `ClientRouter` + `transition:persist` keep the header, sidebar, banner, and providers alive across navigations.
- `NotificationBanner` adjusts `--banner-height`; the 404 page detects language from the route, cookie, or browser.

### Adding a game or section

1. Update `src/config/games.ts` (`GameId`, `gamesList`, `GAME_SECTIONS`, `UNFINISHED_SECTIONS`).
2. Create/update `src/data/games/{ID}.ts` and register it in `src/data/games/index.ts`.
3. Add the data sources for each section (`src/data/*/{ID}.json|ts`) and, if applicable, the loader.
4. Add SEO entries in `src/data/seo/seo.ts` and its language variants.
5. Add translation keys to all four dictionaries if there is new copy.
6. Verify that `getStaticPaths` generates the expected routes and that the sidebar displays them.

## 7. Rules for the agent

**Do**

- Prefer simple solutions with minimal dependencies. Do not add new libraries without justification.
- Work incrementally with small, verifiable changes.
- Explain the reasoning behind technical decisions.
- When modifying a file, deliver it in full, not just fragments.
- Always keep commit messages **in English**.
- Reuse existing patterns: loaders, CSS variables, events, hooks, i18n, and feature-based structure.
- Run `pnpm build` before considering a task complete.
- Temporary exception to the i18n rule: when a new or modified user-facing string is written directly in Spanish (visible text, `alt`, `aria-label`, `title`, `placeholder`, etc.) instead of going through a translation key, it must end with a space followed by 🌴 (e.g. `"Guardar cambios 🌴"`). The marker means "pending migration to a translation key in all four languages", so it can be found with `grep -rn "🌴" src/`. Apply it only to Spanish strings that skip i18n; never add it to strings that already use a translation key, to existing strings you did not touch, or to code, comments, or commit messages.

**Don't**

- Do not touch generated files, lockfiles, or build folders: `dist/`, `.astro/`, `node_modules/`, `temp/`, `.vercel/`, `pnpm-lock.yaml`.
- Do not hardcode new credentials, project IDs, or S3 bases; reuse `src/lib/app/sanityClient.ts` and the existing constants.
- Do not rename public Spanish slugs (`trucos`, `mapa`, `artworks`, etc.) without adding redirects.
- Do not add visible text without going through i18n (the only exception is the temporary 🌴 marker described in the Do list).
- Do not use `client:only` if the component can render on the server.
- Do not assume a page exists for every game: check the `getStaticPaths` filters.

## 8. How to verify changes

1. `pnpm build`: the most complete verification (validates routes, `getStaticPaths`, data, and build errors).
2. `pnpm dev` and test the affected route in all four locales (`/es`, `/en`, `/fr`, `/pt-br`), including sidebar navigation and view transitions.
3. If translations changed: run `node scripts/unused-i18n-keys.mjs` and review missing/unused keys.
4. If responsive behavior or Safari was touched: run `pnpm webkit [url] [device]`.
5. If maps/thumbnails changed: run `pnpm thumbs -- --dry-run` and confirm that `src/data/map-thumb-widths.json` matches the uploaded widths.
6. There is no automated lint/test/typecheck; do not invent commands that do not exist.

## 9. Known issues / things to keep in mind

- **The build depends on network access for VI:** `src/pages/[locale]/VI/timeline.astro` fetches from S3 in `getStaticPaths`. If it fails, the error is logged and the island fetches the JSON again on the client; the build does not fail.
- **External content at runtime:** the banner (Sanity), news (`news.json`), and timeline depend on the network. They are not shown offline.
- **Hardcoded S3:** the base `https://viceclub.s3.us-east-1.amazonaws.com` appears in several modules. If the bucket/domain changes, it must be updated everywhere.
- **Map thumbnails:** the frontend builds the `srcset` from `src/data/map-thumb-widths.json`; if different widths are generated with `pnpm thumbs --widths=...`, images will be missing.
- **Silently omitted pages:** if a game's JSON/SEO/mods are missing, its route is not generated. Confirm the route list in the build output.
- **Environment:** the app does not read environment variables in `src/` (only `import.meta.env.DEV/PROD`). `.env.local` contains only `VERCEL_OIDC_TOKEN`. `pnpm thumbs` does use `S3_BUCKET` and AWS CLI credentials.
- **Achievements:** the section renders `UnderConstruction` and `UNFINISHED_SECTIONS` marks it as unfinished for several games.