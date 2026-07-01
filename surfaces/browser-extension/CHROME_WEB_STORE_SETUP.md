# Chrome Web Store — Publishing

## The short version (what's manual vs automated)

- **First publish is MANUAL.** You upload `thirsty.zip` once via the dashboard,
  fill the listing + privacy practices, and submit for Google's review. This is
  required to get an **Extension ID** (and is how tab-relay / x-purge shipped too).
- **Build + package + GitHub release is automated** via a `v*` git tag (see
  `.github/workflows/release.yml`).
- **CWS auto-upload of future versions is optional** — the workflow step is present
  but commented out. Enable it only after the first manual publish, following the
  credential steps below. Every uploaded version still goes through Google review.

## First publish (manual, ~15 min)

1. Pay the one-time **$5** developer fee at
   <https://chrome.google.com/webstore/devconsole> (if you haven't already).
2. `npm run package --workspace @thirsty/browser-extension` → `thirsty.zip`.
3. **New item** → upload `thirsty.zip`.
4. Fill **Store listing** from `STORE_LISTING.md` (+ screenshots from the demo).
5. Fill **Privacy practices** from `PRIVACY_PRACTICES.md` (check nothing under data
   collection; add the Privacy Policy URL).
6. **Submit for review.** Copy the **Item ID** from the dashboard URL — you'll need
   it to enable automation.

## (Optional) Enable automated version publishing

Only worth it once you're shipping updates regularly.

### 1. Enable the API + OAuth (one time)

1. <https://console.cloud.google.com> → new project (e.g. `Thirsty Extension`).
2. **APIs & Services → Library** → enable **Chrome Web Store API**.
3. **OAuth consent screen** → External → fill app name/emails → add yourself as a
   test user → **Publish App** (so the refresh token doesn't expire in 7 days).
4. **Credentials → Create credentials → OAuth client ID → Desktop app**. Save the
   **Client ID** and **Client Secret**.

### 2. Get a refresh token

Open this in a browser (replace `YOUR_CLIENT_ID`), approve, copy the `4/...` code:

```
https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_id=YOUR_CLIENT_ID
```

Exchange it for a refresh token:

```bash
curl "https://oauth2.googleapis.com/token" \
  -d "client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&code=YOUR_AUTH_CODE&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob"
```

Copy `refresh_token` (starts with `1//`).

### 3. Wire it into GitHub

1. Repo → **Settings → Secrets and variables → Actions** → add:
   `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET`, `CWS_REFRESH_TOKEN`.
2. In `.github/workflows/release.yml`, **uncomment** the "Publish to Chrome Web Store"
   step and set `extension-id` to your Item ID.

Now `git tag v0.2.0 && git push origin v0.2.0` builds, packages, creates a GitHub
release, and uploads the new version to the store (still pending Google review).
