# Firebase setup for MenuHub

This guide describes the Firebase setup for the optional owner stock-management workflow. Complete each step in the Firebase Console and verify it before using the admin page with real customers.

## 1. Firebase project and web app

The intended project ID is `menuhub-be21e`.

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select the MenuHub project.
3. In Project settings → General → Your apps, select the registered web app.
4. Copy the web configuration values: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId`.
5. Use the same configuration in `index.html` and `admin.html` in the branch being deployed.

Firebase web config is designed to be included in a browser app. It does not grant database write access by itself. Never expose a service-account JSON file, private key, or privileged server credential in frontend code.

## 2. Enable Email/Password authentication

1. In Firebase Console, open **Build → Authentication**.
2. Select **Get started** if it appears.
3. Open **Sign-in method**.
4. Enable **Email/Password** and save.
5. In the **Users** tab, create the owner account for the email you intend to authorize. The configured owner email for this project is `admin.test@gmail.com`.
6. Use a strong, unique password. Do not commit or share it.

If the email already exists, do not create a duplicate. Confirm that you can sign in with that account.

## 3. Create Firestore Database

1. Open **Build → Firestore Database**.
2. Create a database using **Standard edition**.
3. Choose a location suitable for your users. The location cannot easily be changed after database creation.
4. Keep access restricted. Do not enable unrestricted public writes.

## 4. Publish Firestore security rules

The rules should allow customers to read menu items, but only the authenticated allowlisted owner to create, update, or delete them. All other database paths should be denied unless a specific requirement is added.

Review the repository's `firestore.rules` file in the exact branch you deploy. The intended owner check is `admin.test@gmail.com`. In Firebase Console → Firestore Database → Rules:

1. Paste the reviewed rules from the deployed repository version.
2. Confirm the email allowlist matches the actual Firebase Authentication account.
3. Click **Publish**.
4. Re-open the Rules tab and confirm the published rules are the expected version.

**Publishing a rules file to GitHub does not publish it to Firebase automatically.** Rules must be deployed separately in the Firebase Console or through a configured Firebase CLI deployment.

## 5. Initialize the menu

Only after `admin.html` is present in the branch you are testing:

1. Open the admin page through your local test server or deployed site over HTTPS.
2. Sign in using the owner account.
3. Select **Initialize menu** once.
4. Confirm that the default menu items appear in Firestore under the `menuItems` collection.
5. Avoid repeatedly initializing while testing changes unless you understand how the current initializer handles saved values.

The customer page should listen to changes in `menuItems` and update availability when documents change.

## 6. Acceptance test

Use a separate browser window or device for the customer page.

- [ ] Admin can sign in with the authorized account.
- [ ] An incorrect password is rejected.
- [ ] Password reset sends an email for the registered account.
- [ ] The admin page loads the menu items.
- [ ] Admin can change an item's price or description and save it.
- [ ] Admin can mark an item Sold Out.
- [ ] The customer page shows the sold-out state after the update.
- [ ] A customer cannot increase the quantity of a sold-out item.
- [ ] A signed-out visitor cannot write to Firestore.
- [ ] An account using a different email cannot write to Firestore.
- [ ] Unrelated Firestore collections remain inaccessible.
- [ ] Cart, table-number selection, and WhatsApp order hand-off still work.

Do not launch the admin feature until the checks above pass.

## Troubleshooting

### Admin login fails
- Confirm Email/Password is enabled.
- Confirm the account exists in Firebase Authentication.
- Check the email and password, then inspect the browser console for Firebase errors.
- Confirm the Firebase config's `projectId` and `authDomain` are for the intended project.

### Login works but saving is denied
- Confirm the published Firestore rules allow the exact owner email.
- Confirm the user is signed in to the expected Firebase project.
- Check that the database was created in the same project ID as the frontend configuration.
- Do not fix this by opening writes to everyone.

### Customer menu does not update
- Confirm the customer page contains the Firebase listener and uses the same project config.
- Confirm menu documents exist in the `menuItems` collection.
- Inspect the browser console and network connection.
- Confirm the deployed customer page is the latest version.

### The admin page is missing
The admin workflow was developed on `feat/admin-stock-management` and its PR was merged into that branch's base. Verify that `admin.html` and `firestore.rules` exist in the branch currently deployed. If they do not, bring the admin changes into `main` before deploying.

## Cost and production notes

Firebase has usage limits and pricing that depend on product, region, and usage. Review the current Firebase pricing before public launch. Apply appropriate abuse protections, monitor usage, and keep rules restrictive. This project has not yet been independently browser-tested as part of this documentation; run the acceptance tests before production use.
