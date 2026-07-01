/**
 * The "Water Used" widget — framework-free DOM, so it survives claude.ai's
 * React re-renders (we mount it as a fixed overlay, not inside the chat tree).
 */
import {
  formatWater,
  formatEnergy,
  formatCarbon,
  waterComparison,
  waterFraction,
} from '@thirsty/core';
import { CSS } from './styles';

export interface CardState {
  waterMl: number;
  energyWh: number;
  co2g: number;
  exact: boolean;
  turns: number;
  /** comedic multiplier; 1 = honest. */
  satire: number;
}

const GLASS_ICON = `
<svg class="thirsty-glass" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M6 4 h28 l-3 40 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 z" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" fill="rgba(255,255,255,0.03)"/>
  <clipPath id="thirsty-clip"><path d="M6 4 h28 l-3 40 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 z"/></clipPath>
  <rect class="thirsty-fill" x="4" y="44" width="32" height="0" clip-path="url(#thirsty-clip)" fill="url(#thirsty-grad)"/>
  <defs><linearGradient id="thirsty-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#2563eb"/>
  </linearGradient></defs>
</svg>`;

let styleInjected = false;

function injectStyleOnce(root: Document | ShadowRoot): void {
  if (styleInjected) return;
  const style = document.createElement('style');
  style.textContent = CSS;
  (root instanceof Document ? root.head : root).appendChild(style);
  styleInjected = true;
}

export function buildCard(onToggleMeme: (on: boolean) => void): HTMLElement {
  injectStyleOnce(document);
  const el = document.createElement('div');
  el.className = 'thirsty-card';
  el.innerHTML = `
    <div class="thirsty-top">
      ${GLASS_ICON}
      <div class="thirsty-heading">
        <div class="thirsty-title">Water Used</div>
        <div class="thirsty-sub" data-thirsty="sub">Estimated for this conversation</div>
      </div>
    </div>
    <div class="thirsty-value"><span data-thirsty="value">0</span></div>
    <div class="thirsty-bar"><span data-thirsty="bar" style="width:0%"></span></div>
    <div class="thirsty-meta">
      <div class="thirsty-chip"><div class="k">Energy</div><div class="v" data-thirsty="energy">–</div></div>
      <div class="thirsty-chip"><div class="k">Carbon</div><div class="v" data-thirsty="co2">–</div></div>
    </div>
    <div class="thirsty-foot">
      <span class="thirsty-tag" data-thirsty="tag">estimate</span>
      <label class="thirsty-meme"><input type="checkbox" data-thirsty="meme" autocomplete="off"> meme mode</label>
    </div>`;

  const memeBox = el.querySelector<HTMLInputElement>('[data-thirsty="meme"]')!;
  memeBox.checked = false; // always boot in honest mode, ignore browser form-restore
  memeBox.addEventListener('change', (e) => {
    onToggleMeme((e.target as HTMLInputElement).checked);
  });
  return el;
}

export function updateCard(el: HTMLElement, s: CardState): void {
  const q = <T extends Element>(sel: string) => el.querySelector<T>(sel)!;
  const meme = s.satire > 1;

  // headline number, split into value + unit for styling
  const water = formatWater(s.waterMl, { satire: s.satire });
  const [num, unit] = splitUnit(water);
  q<HTMLElement>('[data-thirsty="value"]').innerHTML = `${num}<span class="u">${unit}</span>`;

  // progress bar + glass fill, relative to one glass (250 mL)
  const frac = waterFraction(s.waterMl, 250, { satire: s.satire });
  q<HTMLElement>('[data-thirsty="bar"]').style.width = `${Math.max(frac * 100, s.waterMl > 0 ? 3 : 0)}%`;
  const fill = el.querySelector<SVGRectElement>('.thirsty-fill');
  if (fill) {
    const h = 40 * frac;
    fill.setAttribute('height', String(h));
    fill.setAttribute('y', String(44 - h));
  }

  q<HTMLElement>('[data-thirsty="energy"]').textContent = formatEnergy(s.energyWh);
  q<HTMLElement>('[data-thirsty="co2"]').textContent = formatCarbon(s.co2g);

  q<HTMLElement>('[data-thirsty="sub"]').textContent = meme
    ? `${waterComparison(s.waterMl, { satire: s.satire })} · ${s.turns} turns`
    : `${waterComparison(s.waterMl)} · ${s.turns} turns`;

  const tag = q<HTMLElement>('[data-thirsty="tag"]');
  tag.textContent = meme ? 'meme mode — not real' : s.exact ? 'estimate (exact tokens)' : 'estimate';
  tag.setAttribute('data-mode', meme ? 'meme' : 'honest');
}

function splitUnit(s: string): [string, string] {
  const m = s.match(/^(<?[\d.]+)\s*(\S+)$/);
  return m ? [m[1]!, m[2]!] : [s, ''];
}
