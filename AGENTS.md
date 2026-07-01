# AGENTS.md — thirsty

AI prompt-footprint meter. Estimates water / energy / CO₂ behind AI chats.
Origin: a meme by @immasiddx ("imagine if Claude showed water used per prompt").

## Layout (npm workspaces — plug-in platform)

- `packages/core` — `@thirsty/core`: pure estimation engine + pluggable
  provider/grid registries. **No DOM, no I/O.** Consumed as TS source
  (esbuild bundles it per surface; vitest runs it directly). Source of truth for
  all numbers — change coefficients in `src/profiles/`.
- `surfaces/*` — one consumer of core per integration:
  - `browser-extension` (MV3, claude.ai card — the MVP; esbuild → `dist/content.js`)
  - `cli` (Claude Code statusline/hook — exact, reads transcript; esbuild → `dist/statusline.mjs`)
  - `api-wrapper` (server-side helper, consumed as source)
- `plugins/*` — workspace glob for community coefficient packs / surfaces.
  `provider-xai` is the worked example.

## Conventions

- **Imports are extensionless** (moduleResolution: Bundler). Do NOT add `.js`.
- Every published number is an **estimate**; label it as such in any UI. Keep the
  honest/`meme` split — meme mode must always render "not real".
- Node surfaces bundle core with esbuild (see each `esbuild.mjs`); core stays
  source-first (its `exports` point at `src/`), so there's no core build step.
- Add a provider/grid via `registerProvider` / `registerGrid` — never edit the
  engine to add a model.

## Commands

```bash
npm install
npm test                                          # all workspaces (vitest)
npm run build --workspace @thirsty/browser-extension
npm run build --workspace @thirsty/cli
```

## Verification

- Extension: `demo.html` + Playwright screenshot (see `docs/media/`).
- CLI: pipe a JSON payload with `transcript_path` into `dist/statusline.mjs`.

## Not done / next

Real extension icons; publish flow; a settings/options page (grid region picker);
optional exact-token path for the extension via a network intercept. See
`.project/status.md`.
