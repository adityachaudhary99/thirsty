/**
 * Injected CSS for the meter widget. Namespaced under .thirsty- to avoid clashes.
 *
 * The card is INLINE — it flows in the conversation column, mounted right after
 * the bot's latest reply (like the original mockup), not as a floating overlay.
 */
export const CSS = `
.thirsty-card {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 14px 0 6px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(24, 24, 27, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  color: #ededed;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
.thirsty-top { display: flex; align-items: center; gap: 12px; }
.thirsty-glass { flex: 0 0 auto; width: 38px; height: 46px; }
.thirsty-heading { flex: 1 1 auto; min-width: 0; }
.thirsty-title { font-size: 14px; font-weight: 650; letter-spacing: -0.01em; }
.thirsty-sub { font-size: 11px; color: #9a9a9f; margin-top: 1px; }
.thirsty-value { margin-top: 10px; font-size: 32px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.thirsty-value .u { font-size: 15px; font-weight: 600; color: #b7b7bd; margin-left: 4px; }
.thirsty-bar { margin-top: 11px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
.thirsty-bar > span {
  display: block; height: 100%; border-radius: 999px; min-width: 4px;
  background: linear-gradient(90deg, #38bdf8, #2563eb);
  transition: width .35s ease;
}
.thirsty-meta { margin-top: 11px; display: flex; gap: 8px; }
.thirsty-chip {
  flex: 1 1 0; padding: 8px; border-radius: 10px; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.05);
}
.thirsty-chip .k { font-size: 10px; color: #8a8a90; text-transform: uppercase; letter-spacing: .04em; }
.thirsty-chip .v { font-size: 13px; font-weight: 650; margin-top: 2px; }
.thirsty-foot { margin-top: 10px; display: flex; align-items: center; justify-content: space-between; }
.thirsty-tag { font-size: 10px; color: #8a8a90; }
.thirsty-tag[data-mode="meme"] { color: #f59e0b; }
.thirsty-meme { font-size: 11px; color: #9a9a9f; display: flex; align-items: center; gap: 5px; cursor: pointer; user-select: none; }
.thirsty-meme input { accent-color: #f59e0b; }
`;
