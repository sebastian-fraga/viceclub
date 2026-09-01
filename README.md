![Vice Club banner](public/assets/images/app/banner.png)

GTA III, Vice City, San Andreas, Liberty City Stories, Vice City Stories, GTA IV, GTA V, and GTA VI fan site: cheats, information, artworks, mods, achievements, interactive maps, and more.

![Last commit](https://img.shields.io/github/last-commit/sebastian-fraga/viceclub)
![License](https://img.shields.io/github/license/sebastian-fraga/viceclub?cacheSeconds=1)
![Languages](https://img.shields.io/badge/i18n-ES_|_EN_|_FR_|_PT--BR-blue)

🔗 [viceclub.app](https://viceclub.app)

## Preview

<div align="center">
  <img src="public/assets/images/app/screenshots/preview-index.png" width="49%" />
  <img src="public/assets/images/app/screenshots/preview-home.png" width="49%" />
  <img src="public/assets/images/app/screenshots/preview-radio.png" width="49%" />
  <img src="public/assets/images/app/screenshots/preview-artworks.png" width="49%" />
</div>

## Tech stack

![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat&logo=i18next&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-232F3E?style=flat&logo=amazonaws&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

## Features

| Feature         | Status |
| --------------- | ------ |
| 📰 News         | ✅     |
| 📋 Checklists   | ✅     |
| 🎨 Artworks     | ✅     |
| 🛠️ Tools & mods | 🚧     |
| 🏆 Achievements | 🚧     |
| 🗺️ Map          | 🚧     |
| 📻 Radio        | ✅     |
| 🕒 Timeline     | ✅     |
| 🎮 Cheats       | ✅     |

## Structure

```text
src/
├── components/
│   ├── artworks/
│   ├── home/
│   ├── index/
│   ├─── radio/
│   └── ...
├── layouts/
│   ├── BaseLayout.astro
│   └── ErrorLayout.astro
├── pages/
│   ├── [game].astro
│   └── static routes
```

## Local development

```bash
git clone https://github.com/sebastian-fraga/viceclub.git
cd viceclub
pnpm install
pnpm run dev
```

## Conventions

- Custom breakpoints: `max-mobile:` for inverse mobile-first overrides
- Per-game theming via `--game-accent` (CSS custom property)
- Shared hooks in `useSettings`/`AppContext` for persistence (localStorage)
