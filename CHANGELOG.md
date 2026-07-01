# Changelog

All notable changes to Thirsty are documented here.

## [0.1.0] — 2026-07-01

Initial release.

### Core (`@thirsty/core`)
- Estimation engine: tokens → energy → water / CO₂, with a pluggable registry of
  provider (Anthropic / OpenAI / Google) and grid coefficient packs.
- Humanized formatting (mL/L, glasses/bottles), plus a labelled `meme` satire mode.

### Browser extension (claude.ai)
- Injects a "Water Used" card as a full-width block below the latest **completed**
  reply (waits out streaming — no flicker while Claude is thinking).
- DOM adapter targets current claude.ai (`[data-is-streaming]`, `.font-claude-response`,
  `[data-testid="user-message"]`) with legacy fallbacks.
- Honest by default; optional meme mode always labelled "not real".
- Icons, store listing, privacy docs, and packaging (`npm run package` → `thirsty.zip`).

### Other surfaces
- `@thirsty/cli` — Claude Code statusline/hook (exact, from the transcript).
- `@thirsty/api-wrapper` — server-side footprint per request/tenant.
- `plugins/provider-xai` — example coefficient-pack plugin.
