/**
 * Mobile layout math. Work cards keep desktop 700×450 ratio. Hero is its own tall card (~90vh).
 */
export const DESKTOP_PROJECT_W = 700;
export const DESKTOP_PROJECT_H = 450;
export const MOBILE_CARD_GAP = 60;

export function computeWorkCardSize(vw: number): { workW: number; workH: number } {
  const workW = Math.min(Math.max(vw - 72, 240), 340);
  const workH = workW * (DESKTOP_PROJECT_H / DESKTOP_PROJECT_W);
  return { workW, workH };
}

/** Hero card matches Figma frame aspect 384×816.65 so the inner layout scales 1:1 when possible. */
const MOBILE_HERO_FRAME_ASPECT = 384 / 816.65;

export function computeHeroCardSize(vw: number, vh: number): { heroW: number; heroH: number } {
  const maxW = Math.min(vw * 0.94, 396);
  const maxH = Math.min(vh * 0.88, 840);
  let heroW = maxW;
  let heroH = heroW / MOBILE_HERO_FRAME_ASPECT;
  if (heroH > maxH) {
    heroH = maxH;
    heroW = heroH * MOBILE_HERO_FRAME_ASPECT;
  }
  return { heroW, heroH };
}

/** Inline project detail column to the right of the hub (matches mock proportions). */
export function computeMobileDetailPanelWidth(vw: number): number {
  return Math.min(440, Math.max(300, Math.floor(vw * 0.88)));
}
