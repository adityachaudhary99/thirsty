# @thirsty/browser-extension

MV3 extension that injects a live water/energy/CO₂ meter into **claude.ai**.

## Build & load

```bash
npm run build --workspace @thirsty/browser-extension   # -> dist/content.js
```

Then in Chrome/Edge: `chrome://extensions` → enable **Developer mode** →
**Load unpacked** → select this `surfaces/browser-extension/` folder.

## Preview without logging in

```bash
npm run build --workspace @thirsty/browser-extension
npx http-server surfaces/browser-extension -p 8777   # or: python -m http.server 8777
# open http://localhost:8777/demo.html
```

`demo.html` is a mock claude.ai conversation, so you can see the card render and
try `meme mode` without a real session.

## Verify on your real (logged-in) Claude

Two ways, depending on whether you want to *see* it or have me *drive & verify* it.

### A. Just see it (fastest, no restart)

1. `chrome://extensions` → enable **Developer mode** → **Load unpacked** →
   pick `surfaces/browser-extension/`.
2. Open any conversation on claude.ai. The card appears below the latest reply.

Nothing about your login changes; the extension only reads the page DOM.

### B. Let the agent drive & auto-tune selectors (CDP)

This launches **your** Chrome profile (so you're already logged in) with the
extension loaded and a debug port the agent can attach to.

> **Fully quit Chrome first** (all windows) or the flags are ignored.

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\Users\adity\AppData\Local\Google\Chrome\User Data" `
  --profile-directory="Default" `
  --load-extension="C:\Users\adity\Documents\projects\thirsty\surfaces\browser-extension" `
  "https://claude.ai"
```

Open a conversation, then the agent runs:

```bash
node surfaces/browser-extension/scripts/verify-live.mjs
```

It attaches over CDP, confirms the card mounted on the real DOM, screenshots it,
and prints selector counts — so if claude.ai's markup differs from our adapter,
we see exactly which selector to fix. It does **not** close your Chrome.

## How it works

The content script mounts a **fixed overlay** (never inside React's tree, so it
survives re-renders) and, on a debounced `MutationObserver`, re-scrapes the
visible user/assistant text, approximates tokens (~4 chars/token), runs
`@thirsty/core`, and repaints. All claude.ai selectors live in one adapter block
at the top of [`src/content.ts`](src/content.ts) — the only thing to update if
claude.ai's DOM shifts.

> Tokens here are **estimated** from on-screen text. For exact numbers use the
> `@thirsty/cli` (transcript) or `@thirsty/api-wrapper` (API `usage`) surfaces.
