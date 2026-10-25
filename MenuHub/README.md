# MenuHub

A mobile-friendly digital menu and WhatsApp ordering experience for **BackBenchers Cafe, Kollengode, Palakkad, Kerala**.

MenuHub helps customers browse the cafe menu, search items, choose a table number, build an order, and hand it off through WhatsApp. The project includes English/Malayalam menu support and a Data Saver option. A Firebase-backed owner workflow for editing menu details and stock availability has also been developed.

## Project status

- Customer menu and ordering experience: in the repository.
- English/Malayalam toggle: merged into `main`.
- Data Saver mode: merged into `main`.
- Firebase admin stock editor: `admin.html` and `firestore.rules` are now present in `main`, and the customer page includes the Firebase inventory listener. The deployed website still needs configuration verification and browser testing before the feature is considered live.
- Firebase project configuration, authentication, and security rules must be verified in the Firebase Console before the admin workflow is considered live.
- Browser and device testing is still required before production use.

## Features

### Customer menu
- Responsive menu for mobile and desktop.
- Categories, item descriptions and prices.
- Search and cart interactions.
- Table-number selection and WhatsApp order hand-off.
- English/Malayalam toggle for supported labels and menu items.
- Data Saver option that skips menu photo requests and reduces decorative animation.

### Owner stock management
The admin implementation provides:
- Firebase Email/Password sign-in and password-reset email.
- Editing item names, descriptions and prices.
- Available / Sold Out status for each item.
- Firestore live listeners so customer menus can receive stock changes.
- A one-time Initialize Menu action to seed default menu items.
- Firestore rules intended to allow public menu reads and restrict writes to the designated owner email.

**Do not consider admin stock management production-ready until the correct files are deployed, the Firebase config is verified, the owner account exists, rules are published, and a real stock change has been tested from a customer session.**

## Repository map

| Path | Purpose |
| --- | --- |
| `index.html` | Customer-facing menu and ordering experience |
| `admin.html` | Owner/admin login and menu/stock editor |
| `firestore.rules` | Firestore access policy for menu reads and owner-only writes |
| `docs/FIREBASE_SETUP.md` | Firebase setup, security, and verification checklist |

## Quick start

1. Open `index.html` in a browser or deploy it using a static website host.
2. Check the language toggle and Data Saver option.
3. Test category browsing, search, cart quantity changes, table-number selection, and WhatsApp order creation.
4. For Firebase-backed admin features, follow [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md), deploy the reviewed rules, and complete the acceptance tests.

This is a static HTML project in its current form, so no frontend build step is required. CDN-hosted resources require an internet connection.

## Deployment checklist

- Serve the site over HTTPS.
- Verify that the intended `index.html`, `admin.html`, and `firestore.rules` versions are in the deployed branch.
- Use the same Firebase web configuration in customer and admin pages.
- Enable Email/Password in Firebase Authentication.
- Create the authorized owner account.
- Publish restrictive Firestore rules before allowing admin use.
- Initialize the menu once after signing in.
- Test login, password reset, editing an item, marking an item Sold Out, and the customer-side result.
- Test on a real phone and desktop browser, including the WhatsApp hand-off.

## Security and privacy

- Use Firebase Authentication; never put a password directly in HTML or JavaScript.
- Firestore rules must enforce access server-side. Hiding admin controls in the UI is not security.
- The configured owner email is intended to be `admin.test@gmail.com`; verify that the published Firebase rules match the actual account.
- Public read access is intended only for the public menu collection. Keep other collections denied unless a specific need and secure rule are added.
- Never put Firebase service-account credentials, private keys, or privileged server secrets in browser code.
- Firebase web configuration is client-side configuration; it is not a replacement for security rules.
- Do not store customer personal information in the menu collection.

## Development workflow

- Use feature branches and pull requests for feature work.
- Keep `main` deployable.
- Update this README and related docs whenever behavior or setup changes.
- Before release, verify deployed files, Firebase configuration, rules, login, menu initialization, stock changes, and customer-side Sold Out behavior.

## Related links

- [Firebase setup and troubleshooting](docs/FIREBASE_SETUP.md)
- [GitHub repository](https://github.com/rihaas/MenuHub)
- [Admin stock management PR](https://github.com/rihaas/MenuHub/pull/5)
- [English/Malayalam and Data Saver PR](https://github.com/rihaas/MenuHub/pull/4)
