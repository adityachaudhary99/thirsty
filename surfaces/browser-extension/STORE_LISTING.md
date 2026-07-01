# Chrome Web Store — Listing copy

Paste these into the item's **Store listing** tab.

## Name (max 45)

```
Thirsty — AI Water Meter
```

## Summary / short description (max 132)

```
See the water, energy & CO2 behind your Claude chats. Honest per-prompt estimates, computed 100% in your browser.
```

## Category

`Productivity` (alt: `Developer Tools`)

## Detailed description

```
Ever seen the memes claiming every AI prompt "drinks a bottle of water"? Thirsty
turns that curiosity into an honest, on-screen number.

When you chat on claude.ai, Thirsty shows a small "Water Used" card below each
finished reply — estimating the water, energy, and CO2 for the whole conversation.

The honest part: per prompt, it's tiny. A fraction of a millilitre — not the litres
the memes suggest. Credible 2025 figures put a typical text prompt around a quarter
of a millilitre of water. Thirsty shows you that reality, transparently.

• Honest by default — real, order-of-magnitude estimates, clearly labelled as estimates
• Meme mode — flip on the viral "litres!" exaggeration for laughs (always labelled "not real")
• Water + energy + CO2, for the current conversation
• Waits for the reply to finish — no flicker while Claude is thinking
• 100% local — no servers, no tracking, nothing leaves your browser

How it estimates: tokens (from the visible text) → energy (per-model Wh/token) →
water (datacenter cooling + electricity generation) + CO2 (grid intensity). Every
coefficient is a documented public estimate; methodology and source live in the repo.

Free and open source. Not affiliated with Anthropic.
```

## Fields

- **Language:** English
- **Website / homepage:** the GitHub repo URL
- **Support:** GitHub issues URL

## Graphic assets to upload

- **Icon:** `icons/icon-128.png` (already generated)
- **Screenshot 1 (ready):** `docs/media/store-screenshot-1.png` — 1280×800, the real card
  on claude.ai with the brand headline. Upload this as the first screenshot.
- **More screenshots (1280×800 or 640×400), up to 5:** capture while recording the demo —
  1) Hello + card, 2) longer reply + card, 3) meme mode on, 4) energy/carbon chips,
  5) full conversation with card.
- **Small promo tile (440×280):** optional; can reuse a cropped screenshot on brand blue.

## Notes

- "AI"/"Claude" in the name: allowed as descriptive use; we state "Not affiliated with
  Anthropic" in the description to avoid confusion.
- Keep the "estimates only" framing everywhere — it's the honest hook and avoids
  overclaiming.
