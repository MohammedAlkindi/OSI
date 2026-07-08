# Oman Space Initiative Website

A polished public website for Oman Space Initiative, a youth-led platform focused on strengthening Oman’s space-sector pipeline through awareness, education, and hands-on experience.

## Overview

The site presents OSI’s mission, programs, impact logic, leadership contacts, and partnership channels. It uses the OSI mark as the favicon/app icon and hero visual, with TypeScript-driven motion for the starfield, section reveals, mobile navigation, and lightweight stat animation.

## Project Structure

```text
.
├── public/
│   └── assets/          # Favicons and OSI logo assets
├── src/
│   ├── main.ts          # Navigation, animation, reveal, and canvas behavior
│   └── styles.css       # Responsive visual system
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Tech Stack

- Vite
- TypeScript
- CSS
- HTML

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The static production site is generated in `dist/`.

## Deployment

For GitHub Pages, deploy the built `dist/` folder. The Vite config uses `base: './'` so the generated assets work on project pages such as `/OSI/`.

## Repository

`MohammedAlkindi/OSI`
