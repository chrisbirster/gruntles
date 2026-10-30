# Gruntles ♡

**Little things worth remembering.** A playful, private evening journaling app.

## Apps

- `apps/web`: React + Vite + Tailwind CSS v4 + React Router landing page and browser journal.
- `apps/mobile`: Expo / React Native app for iOS and Android.
- `packages/shared`: TypeScript prompt catalog, journal types, and helpers shared by both apps.

Stateful journal editing uses **use-immer** in both apps. MVP journal entries stay **local to each device**: browser localStorage on web and AsyncStorage on mobile. There is no account, sync, server, analytics, or notification service yet. Web supports editing, deleting and JSON export of entries; mobile supports deleting entries and sharing a JSON backup through the native share sheet. Web can validate and restore a versioned JSON backup without overwriting existing entries. Mobile does not yet import backups.

## Start

Prerequisites: Node.js 22+ and npm.

```sh
npm ci
npm run dev:web
npm run dev:mobile # in another terminal; Expo Go or a simulator
npm run test
npm run typecheck
npm run build
npm run export:ios -w @gruntles/mobile
npm run export:android -w @gruntles/mobile
```

Web routes: `/` (landing) and `/journal` (interactive daily journaling). The mobile app contains Home, Guided Journal, Saved, and Archive flows.

The hero uses an optimized WebP crop of the **first selected Gruntles concept image** (`apps/web/public/art/approved-mascot.webp`). Original, reusable SVG artwork is also included for the web, and a compatible vector mascot is drawn with `react-native-svg` for Expo. Before production, export high-resolution standalone mascot poses, app-store icons, screenshots, and verify accessibility.

## Product principles

Three short reflections per evening, entirely optional answers, no forced positivity, no punitive streaks, and a gentle archive of moments that might otherwise be forgotten.

## Next steps

Create a secure sync and account design only if users need cross-device access; add local encryption or device-level protection for sensitive journal text, plus backup/export/delete controls before public release. CI checks Expo JavaScript export bundles for iOS and Android; native signed builds and real-device checks still require EAS credentials, signing setup and device testing. Configure App Store / Google Play identifiers and EAS credentials before submission.
