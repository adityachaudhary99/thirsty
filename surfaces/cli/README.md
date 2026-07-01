# @thirsty/cli — Claude Code integration

Shows the water / energy / CO₂ footprint of the **current Claude Code session**,
computed from *exact* token usage in the session transcript.

```
💧 0.4 mL · ⚡ 210 mWh · 🌿 95 mg CO₂e
```

## Build

```bash
npm run build --workspace @thirsty/cli
# -> surfaces/cli/dist/statusline.mjs  (self-contained, core bundled in)
```

## Option A — statusline (recommended)

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "node /ABS/PATH/thirsty/surfaces/cli/dist/statusline.mjs"
  }
}
```

Claude Code pipes a JSON payload (including `transcript_path`) to the command on
every render; we sum `message.usage` across the transcript and print the meter.

## Option B — hook (per-turn notification)

The same script works from a `Stop` hook if you'd rather see the footprint only
when a turn finishes. In `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [ { "type": "command", "command": "node /ABS/PATH/thirsty/surfaces/cli/dist/statusline.mjs" } ] }
    ]
  }
}
```

## Why this surface is the accurate one

The browser extension estimates tokens from on-screen text (~4 chars/token).
Here we read the transcript's real `usage` numbers, so token counts are exact —
only the energy/water *coefficients* remain estimates. See the root README for
methodology and how to swap in your own coefficients.
