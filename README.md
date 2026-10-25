# Menuhub Pro — Digital Menu & WhatsApp Ordering

<div align="center">

![Aidable Logo](MenuHub/icons/icon-192.png)

**A fast, mobile-first digital menu and WhatsApp ordering experience**  
Built for **BackBenchers Cafe, Kollengode, Palakkad, Kerala**  
Deployed at **[aidable.tech](https://aidable.tech)**

![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![PWA](https://img.shields.io/badge/PWA-Ready-blue?logo=googlechrome)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## What it does

Customers can open the site on any phone, browse the full cafe menu, filter by category or diet (Veg / Non-Veg), search for items, add to cart, pick a table number, and send a formatted WhatsApp order directly to the cafe — no app install required.

The cafe owner can log in to the admin panel to update prices, toggle items sold out, and push live changes to all connected customers via Firebase Firestore.

---

## Features

| Feature | Details |
|---|---|
| 📱 Mobile-first UI | Responsive layout, safe-area insets, 44px tap targets |
| 🔍 Search | Live search across all menu items |
| 🗂️ Categories | Coffee & Tea, Shakes, Snacks, Mains, Desserts |
| 🥗 Diet filter | All / Veg / Non-Veg filter pills |
| 🛒 Cart | Quantity stepper, floating cart bar, slide-out drawer |
| 💬 WhatsApp ordering | One-tap formatted order sent to the cafe's WhatsApp |
| 🌐 Malayalam toggle | English ↔ Malayalam menu labels |
| 💡 Data Saver mode | Hides photos and disables animations on slow connections |
| 🔴 Live stock sync | Firebase Firestore real-time sold-out updates |
| 🔐 Owner admin panel | Secure login, edit prices/descriptions, toggle availability |
| 📲 PWA installable | Works offline, installable on home screen |

---

## Tech stack

- **Pure HTML / CSS / JavaScript** — no build step, no framework
- **Tailwind CSS** (CDN) — utility-first styling
- **Firebase JS SDK v10** (CDN) — Firestore + Authentication
- **Firebase Hosting** — global CDN, HTTPS, custom domain
- **Service Worker** — offline shell caching (network-first for HTML)

---

## Project structure

```
.
├── firebase.json          # Firebase Hosting config
├── .firebaserc            # Firebase project alias (menuhub-be21e)
└── MenuHub/               # Deployable site root
    ├── index.html         # Customer menu & ordering (1881 lines, self-contained)
    ├── admin.html         # Owner login & stock editor
    ├── manifest.json      # PWA web app manifest
    ├── sw.js              # Service worker (network-first + CDN cache)
    ├── firestore.rules    # Firestore security rules
    ├── robots.txt
    ├── sitemap.xml
    ├── icons/
    │   ├── icon-192.png   # PWA icon
    │   └── icon-512.png   # PWA icon
    └── docs/
        └── FIREBASE_SETUP.md  # Firebase setup & verification checklist
```

---

## Local development

No build tools required. Open directly in a browser:

```powershell
# Option 1 — just open the file
start MenuHub\index.html

# Option 2 — serve locally (avoids service worker scope issues)
npx serve MenuHub
```

> CDN resources (Tailwind, Firebase, Google Fonts, FontAwesome) require an internet connection.

---

## Deployment

The site is deployed to **Firebase Hosting** and served at [aidable.tech](https://aidable.tech).

```powershell
# Install Firebase CLI (once)
npm install -g firebase-tools

# Log in
firebase login

# Deploy from the repo root
firebase deploy --only hosting
```

### Custom domain

The domain `aidable.tech` is registered on Gandi and pointed to Firebase Hosting via DNS `A` and `TXT` records configured in the Firebase Console.

---

## Firebase setup

See **[MenuHub/docs/FIREBASE_SETUP.md](MenuHub/docs/FIREBASE_SETUP.md)** for the full step-by-step guide covering:

1. Firebase project & web app registration
2. Email/Password Authentication setup
3. Firestore database creation
4. Security rules deployment
5. Menu initialisation
6. Acceptance test checklist

---

## Security notes

- The Firebase **web config** (`apiKey`, `projectId`, etc.) in the HTML is safe to be public — it identifies the app, it does not grant write access.
- All write access is enforced by **Firestore security rules** server-side.
- No service-account keys, private keys, or server credentials are in this repository.
- Admin writes require a Firebase-authenticated user whose email matches the allowlist in `firestore.rules`.

---

## License

[MIT](MenuHub/LICENSE) — © 2025 BackBenchers Cafe, Kollengode
