/**
 * Mobile layout math. Work cards keep desktop 700×450 ratio. Hero is its own tall card (~90vh).
 */
export const DESKTOP_PROJECT_W = 700;
export const DESKTOP_PROJECT_H = 450;
/** Default gap when viewport width is unknown (legacy gallery layout). */
export const MOBILE_CARD_GAP = 52;

export function computeMobileCardGap(vw: number): number {
  return vw < 380 ? 44 : vw < 420 ? 52 : 60;
}

export function computeWorkCardSize(vw: number): { workW: number; workH: number } {
  const workW = Math.min(Math.max(vw - 48, 268), 360);
  const workH = workW * (DESKTOP_PROJECT_H / DESKTOP_PROJECT_W);
  return { workW, workH };
}

/** Hero card matches Figma frame aspect 384×816.65 so the inner layout scales 1:1 when possible. */
const MOBILE_HERO_FRAME_ASPECT = 384 / 816.65;

export function computeHeroCardSize(vw: number, vh: number): { heroW: number; heroH: number } {
  const maxW = Math.min(vw * 0.9, 384);
  const maxH = Math.min(vh * 0.86, 820);
  let heroW = maxW;
  let heroH = heroW / MOBILE_HERO_FRAME_ASPECT;
  if (heroH > maxH) {
    heroH = maxH;
    heroW = heroH * MOBILE_HERO_FRAME_ASPECT;
  }
  return { heroW, heroH };
}

/** Full-width detail sheet — avoids crushing 1400px artboards into a narrow column. */
export function computeMobileDetailPanelWidth(vw: number): number {
  return Math.max(320, vw);
}

/**
 * Floor scale for 1400px case studies so body copy stays readable on phones (~15px+ effective).
 * May introduce slight horizontal scroll inside the detail sheet.
 */
export const MOBILE_CASE_STUDY_MIN_SCALE = 0.3;

export function computeMobileStationGutter(vw: number): number {
  return Math.round(Math.max(36, Math.min(88, vw * 0.1)));
}
