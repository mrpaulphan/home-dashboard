# Family Hub

Mobile-first PWA for shared package tracking with Web Push notifications for both phones.

## Requirements

- Node.js 20.19+ (recommended: 24.x via `.nvmrc`)
- Firebase project: `home-dashboard-a6669`
- HTTPS hosting for PWA install and push (localhost works for dev UI only)

## Setup

1. Copy env template and fill in secrets:

```bash
cp .env.example .env
```

2. Required values in `.env`:

- Firebase client vars (`VITE_FIREBASE_*`) — already set if you used the provided web app config
- Firebase Admin service account (`FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) from Firebase Console → Project Settings → Service Accounts
- VAPID keys — generate with `npx web-push generate-vapid-keys`
- `WEBHOOK_SECRET` — random string for the iOS Shortcut header

3. Deploy Firestore rules:

```bash
npx firebase-tools@latest login
npx firebase-tools@latest deploy --only firestore:rules
```

## Development

```bash
nvm use
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run preview
```

Preview serves the Nitro server (API routes + SSR).

## Deploy (Render)

1. Push repo to GitHub
2. Create a Render Web Service from `render.yaml`
3. Add all `.env` values in Render dashboard
4. Deploy — Render provides HTTPS automatically

Alternative: any Node host that runs `node .output/server/index.mjs` after `npm run build`.

## Install on both phones

### iPhone (required order)

1. Open the HTTPS URL in **Safari**
2. Share → **Add to Home Screen**
3. Open **Family Hub** from the home screen icon
4. Tap **Enable notifications**

Push does **not** work in a normal Safari tab on iOS.

### Android

1. Open in Chrome
2. Tap **Install app** when prompted (or use browser menu → Install)
3. Tap **Enable notifications**

## iOS Shortcut webhook

```
POST https://your-domain.com/api/webhook/packages
Content-Type: application/json
x-webhook-secret: <WEBHOOK_SECRET>

{
  "message": "<package room text>",
  "recipient": "paul"
}
```

Use `"girlfriend"` in a second shortcut, or prompt for recipient in one shortcut.

## Verify push

1. Install on both phones and enable notifications
2. Confirm two docs in Firestore `push_subscriptions`
3. Send a test webhook POST
4. Both phones should get an OS notification

## Project structure

```
src/
  components/       InstallPrompt, EnableNotifications, PwaShell
  lib/              firebase-client, firebase-admin, push, push-client
  routes/
    index.tsx       Home page
    api/
      subscribe.ts           Save push subscription
      webhook.packages.ts    Package ingest + push broadcast
  sw.ts             Service worker (push + notification click)
public/
  manifest.webmanifest
  icons/
  sw.js             Built from src/sw.ts
```
