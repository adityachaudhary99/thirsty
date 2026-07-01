# plugins/

This directory is a **workspace glob** (`plugins/*` in the root `package.json`),
so you can drop a new repo or folder here and it becomes part of the build with
no wiring. This is the extension seam.

Two kinds of plugin:

### 1. Provider / grid coefficient packs

Register new AI providers or grid profiles so every surface can estimate them.
See `provider-xai/` for a complete example — it's ~15 lines:

```ts
import { registerProvider } from '@thirsty/core';
registerProvider({ id: 'xai', label: 'xAI Grok', defaultModel: 'grok', models: { /* … */ } });
```

Import the plugin once from a surface's entry point and it self-registers.

### 2. New surfaces

A surface is any package that consumes `@thirsty/core` and renders/reports the
estimate: a browser extension, a CLI, an API middleware, a Slack bot, a Grafana
exporter… Copy the shape of `surfaces/browser-extension` or `surfaces/cli`.
Put it under `surfaces/` (product surfaces) or `plugins/` (community add-ons) —
both are workspace globs, so either works.

### Contract

Every plugin only ever touches these public exports from `@thirsty/core`:
`registerProvider`, `registerGrid`, `setDefaults`, `estimate`, `total`,
`approxTokens`, `fromUsage`, `detectModel`, and the `format*` helpers.
Nothing reaches into the engine internals, so the core can evolve freely.
