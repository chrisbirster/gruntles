# Gruntles ♡

**Little things worth remembering.** A playful, private evening journaling app.

## Apps

- `apps/web`: React + Vite + Tailwind CSS v4 + React Router landing page and browser journal.
- `apps/mobile`: Expo / React Native app for iOS and Android.
- `packages/shared`: TypeScript prompt catalog, journal types, and helpers shared by both apps.

Stateful journal editing uses **use-immer** in both apps. MVP journal entries stay **local to each device**: browser localStorage on web and AsyncStorage on mobile. There is no account, sync, server, analytics, or notification service yet.

## Start

Prerequisites: Node.js 22+ and npm.

```sh
npm install
npm run dev:web
npm run dev:mobile # in another terminal; Expo Go or a simulator
npm run typecheck
npm run build
```

Web routes: `/` (landing) and `/journal` (interactive daily journaling). The mobile app contains Home, Guided Journal, Saved, and Archive flows.

The brand illustration is an original SVG approximation of the selected cozy concept. The raster concept artwork is **not yet committed** to this repo; production artwork, responsive exports, store icons, and accessibility review remain follow-up tasks.

## Product principles

Three short reflections per evening, entirely optional answers, no forced positivity, no punitive streaks, and a gentle archive of moments that might otherwise be forgotten.

## Next steps

Create a secure sync and account design only if users need cross-device access; add local encryption or device-level protection for sensitive journal text, plus backup/export/delete controls before public release. Configure App Store / Google Play identifiers and EAS credentials before builds.
