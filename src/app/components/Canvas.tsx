import React from 'react';
import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'motion/react';

/** Share of the wordmark bbox that must overlap a dark surface before switching to white type. */
const LOGO_INVERT_OVERLAP = 0.2;

function rectOverlapFraction(logo: DOMRectReadOnly, surface: DOMRectReadOnly): number {
  const left = Math.max(logo.left, surface.left);
  const right = Math.min(logo.right, surface.right);
  const top = Math.max(logo.top, surface.top);
  const bottom = Math.min(logo.bottom, surface.bottom);
  const iw = Math.max(0, right - left);
  const ih = Math.max(0, bottom - top);
  if (iw === 0 || ih === 0) return 0;
  const logoArea = Math.max(1, logo.width * logo.height);
  return (iw * ih) / logoArea;
}

/** Pixel deltas for wheel/trackpad (deltaMode 1/2 are lines/pages on some browsers/mice). */
function normalizeWheelDelta(e: WheelEvent): { dx: number; dy: number } {
  let dx = e.deltaX;
  let dy = e.deltaY;
  if (e.deltaMode === 1) {
    dx *= 16;
    dy *= 16;
  } else if (e.deltaMode === 2) {
    dx *= window.innerWidth;
    dy *= window.innerHeight;
  }
  return { dx, dy };
}
import { Hero } from './Hero';
import { AboutStation, ABOUT_STATION_HEIGHT } from './AboutStation';
import { Projects } from './Projects';
import { ProjectDetail } from './ProjectDetail';
import { CurvedLine } from './CurvedLine';
import {
  KineticPlayProvider,
  KineticStylePanel,
  KineticHeroStage,
} from './KineticPlayground';
import { ZoomIn, ZoomOut, Moon, Sun, Home } from 'lucide-react';
import { CLOUDINARY_ASSETS, CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';
import { useViewportSize } from '../../hooks/useViewportSize';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video' | 'component';
  mediaUrl: string;
}

const projects: Project[] = [
  {
    id: 'proj1',
    title: 'WAR DIARY',
    description: 'A comprehensive brand identity system for a tech startup, including logo design, color palette, and visual guidelines. This project involved creating a complete visual language that speaks to innovation while maintaining accessibility and timeless appeal.',
    category: 'Brand Identity',
    mediaType: 'video',
    mediaUrl: CLOUDINARY_VIDEOS.wardiary_cover,
  },
  {
    id: 'proj2',
    title: 'A WEATHER',
    description: 'Magazine layout and typography design for a quarterly publication focused on contemporary art and culture. The design emphasizes readability while creating visual interest through bold typography and thoughtful white space.',
    category: 'Magazine Design',
    mediaType: 'component',
    mediaUrl: '',
  },
  {
    id: 'proj3',
    title: 'THE KITE RUNNER',
    description: 'This project presents an opening sequence for a series adaptation of The Kite Runner.',
    category: 'Motion Design',
    mediaType: 'image',
    mediaUrl: CLOUDINARY_ASSETS.thekiterunner_bg,
  },
  {
    id: 'proj4',
    title: '(the) ONE',
    description: 'What made them the greatest was (the) one.',
    category: 'Brand Identity',
    mediaType: 'image',
    mediaUrl: CLOUDINARY_ASSETS['e082e465b1c842283a9dff49617174df4bc97f7d'],
  },
];

/**
 * Camera translate (on the outer motion layer) so that, at zoom z and rowScale cluster scale:
 * - the works column is horizontally centered in the viewport
 * - the top edge of the first work card (canvas y = worksTop) sits at firstCardTopPx from the viewport top
 *
 * Matches transform order: inner `scale(rowScale)` about (scaleOriginX, scaleOriginY), then outer
 * `scale(z)` about viewport center, then translate(cameraX, cameraY).
 */
function computeWorksListCamera(args: {
  z: number;
  vw: number;
  vh: number;
  rowScale: number;
  scaleOriginX: number;
  scaleOriginY: number;
  worksTop: number;
  worksColumnLeft: number;
  projectWidth: number;
  firstCardTopPx: number;
}): { camX: number; camY: number } {
  const {
    z,
    vw,
    vh,
    rowScale,
    scaleOriginX,
    scaleOriginY,
    worksTop,
    worksColumnLeft,
    projectWidth,
    firstCardTopPx,
  } = args;

  const topInnerY = scaleOriginY + rowScale * (worksTop - scaleOriginY);
  const camY = firstCardTopPx - vh / 2 - z * (topInnerY - vh / 2);

  const columnCenterX = worksColumnLeft + projectWidth / 2;
  const focusInnerX = scaleOriginX + rowScale * (columnCenterX - scaleOriginX);
  const camX = -z * (focusInnerX - vw / 2);

  return { camX, camY };
}

/**
 * Camera so the detail panel’s top edge lands `detailTopInsetPx` below the viewport top (room for fixed
 * wordmark), and the panel is horizontally centered — same transform stack as works list.
 */
function computeDetailPanelCamera(args: {
  z: number;
  vw: number;
  vh: number;
  rowScale: number;
  scaleOriginX: number;
  scaleOriginY: number;
  detailColumnLeft: number;
  detailWidth: number;
  worksTop: number;
  projectStride: number;
  detailRowIndex: number;
  detailTopInsetPx: number;
}): { camX: number; camY: number } {
  const {
    z,
    vw,
    vh,
    rowScale,
    scaleOriginX,
    scaleOriginY,
    detailColumnLeft,
    detailWidth,
    worksTop,
    projectStride,
    detailRowIndex,
    detailTopInsetPx,
  } = args;

  const detailCenterX = detailColumnLeft + detailWidth / 2;
  const detailTopY = worksTop + detailRowIndex * projectStride;

  const innerX = scaleOriginX + rowScale * (detailCenterX - scaleOriginX);
  const camX = -z * (innerX - vw / 2);

  const topInnerY = scaleOriginY + rowScale * (detailTopY - scaleOriginY);
  const camY = detailTopInsetPx - vh / 2 - z * (topInnerY - vh / 2);

  return { camX, camY };
}

/** Camera so the About station (below hero) is centered in the viewport at zoom z. */
function computeAboutPanelCamera(args: {
  z: number;
  vw: number;
  vh: number;
  rowScale: number;
  scaleOriginX: number;
  scaleOriginY: number;
  heroX: number;
  heroY: number;
  heroWidth: number;
  heroHeight: number;
  cardGap: number;
  aboutHeight: number;
}): { camX: number; camY: number } {
  const {
    z,
    vw,
    vh,
    rowScale,
    scaleOriginX,
    scaleOriginY,
    heroX,
    heroY,
    heroWidth,
    heroHeight,
    cardGap,
    aboutHeight,
  } = args;

  const centerX = heroX + heroWidth / 2;
  const aboutTop = heroY + heroHeight + cardGap;
  const centerY = aboutTop + aboutHeight / 2;

  const innerX = scaleOriginX + rowScale * (centerX - scaleOriginX);
  const innerY = scaleOriginY + rowScale * (centerY - scaleOriginY);

  return {
    camX: -z * (innerX - vw / 2),
    camY: -z * (innerY - vh / 2),
  };
}

/** Vertical midpoint of the band below the fixed wordmark (hero centers here, not raw vh/2). */
function contentBandMidY(vh: number, topInsetPx: number): number {
  const inset = Math.max(0, topInsetPx);
  return inset + (vh - inset) / 2;
}

/**
 * Pan values after changing `zoomMotion` so the scene under the viewport center stays fixed.
 * Matches the stack: translate(cam) outside, scale(z) with origin at viewport center on the inner layer.
 */
function cameraForViewportCenterAfterZoom(args: {
  vw: number;
  vh: number;
  zOld: number;
  zNew: number;
  camX0: number;
  camY0: number;
}): { camX: number; camY: number } {
  const { vw, vh, zOld, zNew, camX0, camY0 } = args;
  const z0 = Math.max(zOld, 1e-6);
  const Sx = vw / 2;
  const Sy = vh / 2;
  const Cx = Sx;
  const Cy = Sy;
  const t = zNew / z0;
  return {
    camX: Sx - Cx - t * (Sx - camX0 - Cx),
    camY: Sy - Cy - t * (Sy - camY0 - Cy),
  };
}

/**
 * Hero-only zoom target (cluster span = hero width). Same value on first visit and whenever Play opens,
 * including after Explore / other routes, so framing always matches the first Play click.
 */
function computeCanonicalHeroZoomTarget(args: {
  vw: number;
  vh: number;
  heroWidth: number;
  heroHeight: number;
  heroViewFrac: number;
  layoutMargin: number;
  zoomMin: number;
  zoomMax: number;
  minRowScale: number;
}): number {
  const clusterSpan = Math.max(args.heroWidth, 1);
  const rowScale = Math.min(
    1,
    Math.max(args.minRowScale, (args.vw - args.layoutMargin * 2) / clusterSpan),
  );
  const ideal = Math.min(
    (args.heroViewFrac * args.vw) / (args.heroWidth * rowScale),
    (args.heroViewFrac * args.vh) / (args.heroHeight * rowScale),
  );
  const cap = (args.vw - 2 * args.layoutMargin) / (rowScale * clusterSpan);
  return Math.min(args.zoomMax, Math.max(args.zoomMin, Math.min(ideal, cap)));
}

/** Row scale for hero-width cluster only (same as inside `computeCanonicalHeroZoomTarget`). */
function heroOnlyRowScale(
  vw: number,
  heroWidth: number,
  layoutMargin: number,
  minRowScale: number,
): number {
  const span = Math.max(heroWidth, 1);
  return Math.min(1, Math.max(minRowScale, (vw - layoutMargin * 2) / span));
}

/**
 * When Explore is open, layout `rowScale` shrinks the whole cluster; bump zoom so hero matches first-time Play
 * (approximately: canonicalZ × heroRowScale ≈ playZ × layoutRowScale).
 */
function zoomMatchingHeroRowScale(
  canonicalZ: number,
  heroRowScale: number,
  layoutRowScale: number,
  zoomMin: number,
  zoomMax: number,
): number {
  if (layoutRowScale <= 0.001) return canonicalZ;
  const z = canonicalZ * (heroRowScale / layoutRowScale);
  return Math.min(zoomMax, Math.max(zoomMin, z));
}

/** Camera so the hero card alone is centered at zoom z (e.g. after closing about). */
function computeHeroCenterCamera(args: {
  z: number;
  vw: number;
  vh: number;
  rowScale: number;
  scaleOriginX: number;
  scaleOriginY: number;
  heroX: number;
  heroY: number;
  heroWidth: number;
  heroHeight: number;
  /** Where to place the hero’s vertical center in viewport px (default vh/2). */
  viewportCenterY?: number;
}): { camX: number; camY: number } {
  const centerX = args.heroX + args.heroWidth / 2;
  const centerY = args.heroY + args.heroHeight / 2;
  const innerX = args.scaleOriginX + args.rowScale * (centerX - args.scaleOriginX);
  const innerY = args.scaleOriginY + args.rowScale * (centerY - args.scaleOriginY);
  const vcy = args.viewportCenterY ?? args.vh / 2;
  return {
    camX: -args.z * (innerX - args.vw / 2),
    camY: -args.z * (innerY - vcy),
  };
}

/** White dot + difference blend: reads dark on light UI, light on black video/cards. */
function DesktopInvertCursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onBlur = () => setPos(null);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  if (pos == null) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[200] rounded-full bg-white mix-blend-difference"
      style={{
        width: 22,
        height: 22,
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export function Canvas() {
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lastOpenedProjectIndex, setLastOpenedProjectIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringDetail, setIsHoveringDetail] = useState(false);
  /** User + auto framing zoom (multiplies rowScale cluster). Animated for Explore / detail open. */
  const zoomMotion = useMotionValue(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playModeActive, setPlayModeActive] = useState(false);
  const [isHoveringPlayCard, setIsHoveringPlayCard] = useState(false);
  /** Bumps on each Explore click so we re-center the projects column even if it was already open. */
  const [exploreFocusTick, setExploreFocusTick] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  /** Bumps on each About click so framing re-runs when already open (mirrors Explore). */
  const [aboutFocusTick, setAboutFocusTick] = useState(0);
  const lastAboutVisibleRef = useRef(false);
  /** When true, next hero-only layout pass recenters camera+zoom on the hero (Home). */
  const forceHeroFramingRef = useRef(false);
  /** When true, next zoom layout pass snaps camera+zoom+rowScale like a fresh load (Play → RESTART). */
  const canvasResetToInitialRef = useRef(false);
  const [homeResetTick, setHomeResetTick] = useState(0);
  /** Hero idle framing: only snap camera when viewport size changes (avoid fighting user pan). */
  const lastHeroIdleLayoutRef = useRef<{ vw: number; vh: number } | null>(null);
  const prevPlayModeActiveRef = useRef(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);

  // Node dimensions
  const heroWidth = 1100;
  const heroHeight = 650;
  const GRID_SIZE = 40;
  
  // Project card dimensions - Base size (700:450 aspect ratio)
  const projectWidth = 700;
  const projectHeight = 450;
  
  // Detail card dimensions - SAME ASPECT RATIO as project card
  // 700:450 = 1.556:1 aspect ratio maintained
  const detailWidth = 1400; // 2x scale
  /** Slightly shorter than 2×450 so the canvas peeks past the bottom of the detail card. */
  const detailHeight = 848;

  /** Space between stacked project cards (vertical + horizontal rhythm when using flex gap). */
  const CARD_GAP = 60;

  /**
   * Band below the fixed wordmark (logo block + top padding). Hero vertical center targets the middle of
   * (this inset → bottom of viewport) so the hero clears the logo on short viewports (e.g. 14" windowed).
   */
  const CONTENT_TOP_BELOW_LOGO_PX = 120;

  /** Responsive but proportional station spacing used for BOTH connections. */
  const getStationGutter = (vw: number) => Math.round(Math.max(260, Math.min(420, vw * 0.24)));
  const { width: vw, height: vh } = useViewportSize();
  const stationGutter = getStationGutter(vw);
  /** Small overlap so connector endpoints sit behind card edges. */
  const CONNECTOR_OVERLAP = 18;
  /** Connector color. */
  const connectorColor = '#B8B8B8';

  // Node positions in canvas space - adjusted for better vertical distribution
  const heroPos = { x: 400, y: 400 };
  /** Max width of the kinetic column; actual width shrinks on narrow viewports so it stays on-screen with a centered hero. */
  const KINETIC_PANEL_WIDTH_MAX = 200;
  /** Tight gap between kinetic panel and hero (smaller than `CARD_GAP` so the pair fits when the hero stays viewport-centered). */
  const PLAY_KINETIC_GAP = 18;

  // Initial view: center the Hero in the viewport.
  useLayoutEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const heroCenterX = heroPos.x + heroWidth / 2;
    const heroCenterY = heroPos.y + heroHeight / 2;
    cameraX.set(w / 2 - heroCenterX);
    cameraY.set(h / 2 - heroCenterY);
  }, []);

  const heroX = heroPos.x;
  const heroY = heroPos.y;
  const kineticPanelWidth = Math.min(
    KINETIC_PANEL_WIDTH_MAX,
    Math.max(136, Math.round(vw * 0.142)),
  );
  const playPanelX = heroX - PLAY_KINETIC_GAP - kineticPanelWidth;

  /** Top of card i aligns with hero top + i * stride (flex column, gap 60). */
  const projectStride = projectHeight + CARD_GAP;
  const projectsColumnHeight = (projects.length - 1) * projectStride + projectHeight;
  /** Keep Works station center aligned with Hero center for a clean main connector. */
  const worksTop = heroY + heroHeight / 2 - projectsColumnHeight / 2;

  /** Left edge of works column (after hero + station gutter). */
  const worksColumnLeft = heroX + heroWidth + stationGutter;
  /** Left edge of detail panel (after works column + station gutter). */
  const detailColumnLeft = worksColumnLeft + projectWidth + stationGutter;

  const selectedProjectIndex = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const LAYOUT_MARGIN = 40;
  const MIN_ROW_SCALE = 0.22;
  /** Target share of viewport for the hero (uniform scale; aspect ratio unchanged). */
  const HERO_VIEW_FRAC = 0.7;
  /** When opening works from Hero, center this project card ("A WEATHER" = `proj2`). */
  const EXPLORE_FOCUS_PROJECT_INDEX = 1;
  /** Target share of viewport for each work list card (uniform scale; 700×450 ratio unchanged). */
  const WORKS_CARD_VIEW_FRAC = 0.35 ;
  /** Target share of viewport for project detail (uniform scale; panel 1400×detailHeight). */
  const DETAIL_VIEW_FRAC = 0.99;
  const WORKS_LIST_ZOOM_DURATION_SEC = 0.85;
  const DETAIL_ZOOM_DURATION_SEC = 0.78;
  const ZOOM_MIN = 0.22;
  /** Pan/zoom UI and hero/works auto-zoom. */
  const ZOOM_MAX = 2;
  /**
   * Detail auto-zoom may need z above 2 when rowScale shrinks the cluster first; ZOOM_MAX was capping
   * ideal and kept the panel small on wide layouts.
   */
  const DETAIL_ZOOM_MAX = 2.5;

  const clusterLayout = useMemo(() => {
    let clusterLeft = heroX;
    let clusterRight = heroX + heroWidth;
    // Play kinetic panel is not included in row scale — hero stays fixed; panel mounts to the left only.
    if (projectsVisible) {
      clusterRight = Math.max(clusterRight, worksColumnLeft + projectWidth);
    }
    if (selectedProject && selectedProjectIndex !== -1) {
      clusterRight = Math.max(clusterRight, detailColumnLeft + detailWidth);
    }
    const clusterSpan = Math.max(clusterRight - clusterLeft, 1);
    const rowScale = Math.min(
      1,
      Math.max(MIN_ROW_SCALE, (vw - LAYOUT_MARGIN * 2) / clusterSpan),
    );
    const scaleOriginX = (clusterLeft + clusterRight) / 2;
    const scaleOriginY = heroY + heroHeight / 2;
    return { clusterLeft, clusterRight, clusterSpan, rowScale, scaleOriginX, scaleOriginY };
  }, [
    heroX,
    heroY,
    heroWidth,
    heroHeight,
    projectsVisible,
    worksColumnLeft,
    projectWidth,
    selectedProject,
    selectedProjectIndex,
    detailColumnLeft,
    detailWidth,
    vw,
  ]);

  const { rowScale, scaleOriginX, scaleOriginY, clusterSpan } = clusterLayout;

  const effectiveOriginX = scaleOriginX;
  const effectiveOriginY = scaleOriginY;

  /** Cancels outer `zoomMotion` on the dot layer so grid spacing stays ~40px on screen while cards zoom. */
  const gridInverseScale = useTransform(zoomMotion, (z) => 1 / Math.max(z, 0.05));

  const rowScaleMotion = useMotionValue(rowScale);
  const rowScaleAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const rowScaleDidInitRef = useRef(false);

  const projectsPanelRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const logoWordmarkRef = useRef<HTMLDivElement>(null);
  const heroDarkSurfaceRef = useRef<HTMLDivElement>(null);
  const playDarkSurfaceRef = useRef<HTMLDivElement>(null);
  const [logoOnDarkSurface, setLogoOnDarkSurface] = useState(false);
  const zoomAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const worksCameraXAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const worksCameraYAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  useLayoutEffect(() => {
    rowScaleAnimRef.current?.stop();
    if (!rowScaleDidInitRef.current) {
      rowScaleMotion.set(rowScale);
      rowScaleDidInitRef.current = true;
      return;
    }
    rowScaleAnimRef.current = animate(rowScaleMotion, rowScale, {
      duration: WORKS_LIST_ZOOM_DURATION_SEC,
      ease: [0.4, 0, 0.2, 1],
    });
    return () => rowScaleAnimRef.current?.stop();
  }, [rowScale, rowScaleMotion]);

  const recomputeLogoOnDark = useCallback(() => {
    const logoEl = logoWordmarkRef.current;
    if (!logoEl) return;
    const logoRect = logoEl.getBoundingClientRect();
    const surfaces: (HTMLElement | null)[] = [
      heroDarkSurfaceRef.current,
      playDarkSurfaceRef.current,
      ...(selectedProject ? [detailPanelRef.current] : []),
    ];
    let maxOverlap = 0;
    for (const el of surfaces) {
      if (!el) continue;
      maxOverlap = Math.max(maxOverlap, rectOverlapFraction(logoRect, el.getBoundingClientRect()));
    }
    const next = maxOverlap >= LOGO_INVERT_OVERLAP;
    setLogoOnDarkSurface((prev) => (prev === next ? prev : next));
  }, [selectedProject]);

  useLayoutEffect(() => {
    recomputeLogoOnDark();
  }, [
    recomputeLogoOnDark,
    vw,
    vh,
    rowScale,
    projectsVisible,
    aboutVisible,
    selectedProject?.id,
    playModeActive,
    heroX,
    heroY,
    worksTop,
    exploreFocusTick,
    aboutFocusTick,
  ]);

  useEffect(() => {
    recomputeLogoOnDark();
    const id = window.setInterval(recomputeLogoOnDark, 80);
    return () => window.clearInterval(id);
  }, [recomputeLogoOnDark]);

  // Theme colors
  const theme = {
    background: isDarkMode ? '#1a1a1a' : '#fafafa',
    gridColor: isDarkMode ? '#3a3a3a' : '#d0d0d0',
    lineColor: isDarkMode ? '#4a4a4a' : '#d0d0d0',
  };

  // Handle trackpad pan gestures
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const findScrollableYElement = (root: HTMLElement): HTMLElement | null => {
      // Find first descendant that can actually scroll vertically.
      const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))];
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const canScrollY =
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight + 1;
        if (canScrollY) return el;
      }
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      // Trackpad pinch-to-zoom (Chrome sends ctrl+wheel).
      if (e.ctrlKey) {
        e.preventDefault();
        zoomAnimRef.current?.stop();
        worksCameraXAnimRef.current?.stop();
        worksCameraYAnimRef.current?.stop();
        const { dy } = normalizeWheelDelta(e);
        const cap = selectedProject ? DETAIL_ZOOM_MAX : ZOOM_MAX;
        const pinchStep = 0.14;
        const zOld = zoomMotion.get();
        const next = Math.min(
          cap,
          Math.max(ZOOM_MIN, zOld + (dy > 0 ? -pinchStep : pinchStep)),
        );
        if (next !== zOld) {
          const { camX: cx1, camY: cy1 } = cameraForViewportCenterAfterZoom({
            vw,
            vh,
            zOld,
            zNew: next,
            camX0: cameraX.get(),
            camY0: cameraY.get(),
          });
          const pinchEase = [0.4, 0, 0.2, 1] as const;
          const pinchDur = 0.2;
          zoomAnimRef.current = animate(zoomMotion, next, {
            duration: pinchDur,
            ease: pinchEase,
          });
          worksCameraXAnimRef.current = animate(cameraX, cx1, {
            duration: pinchDur,
            ease: pinchEase,
          });
          worksCameraYAnimRef.current = animate(cameraY, cy1, {
            duration: pinchDur,
            ease: pinchEase,
          });
        }
        return;
      }

      // Detail-focus mode: when hovering detail, all wheel input is captured by detail.
      // No wheel interaction leaks to canvas (horizontal or vertical).
      if (isHoveringDetail && detailPanelRef.current) {
        e.preventDefault();
        const { dy } = normalizeWheelDelta(e);
        const scrollable = findScrollableYElement(detailPanelRef.current);
        if (scrollable && Math.abs(dy) > 0) {
          scrollable.scrollTop += dy;
        }
        return;
      }

      // Play panel: vertical wheel scrolls the style list; horizontal pans the canvas.
      if (isHoveringPlayCard && playDarkSurfaceRef.current) {
        e.preventDefault();
        const { dx, dy } = normalizeWheelDelta(e);
        const scrollable = findScrollableYElement(playDarkSurfaceRef.current);
        const dominantY = Math.abs(dy) >= Math.abs(dx);
        if (scrollable && dominantY && Math.abs(dy) > 0.5) {
          scrollable.scrollTop += dy;
          return;
        }
        if (Math.abs(dx) > 0.5) {
          cameraX.set(cameraX.get() - dx);
        }
        if (!dominantY && Math.abs(dy) > 0.5) {
          cameraY.set(cameraY.get() - dy);
        }
        return;
      }

      // Pan the canvas (normalized deltas feel consistent across mouse vs trackpad).
      e.preventDefault();
      const { dx, dy } = normalizeWheelDelta(e);
      cameraX.set(cameraX.get() - dx);
      cameraY.set(cameraY.get() - dy);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [
    cameraX,
    cameraY,
    isHoveringDetail,
    isHoveringPlayCard,
    selectedProject,
    vw,
    vh,
    zoomMotion,
  ]);

  /** Centers a panel in the viewport, then clamps so edges stay inside padded bounds (large gutters / wide details). */
  const centerElementInViewport = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = Math.max(28, Math.min(56, stationGutter * 0.28));

      let dx = vw / 2 - rect.left - rect.width / 2;
      let dy = vh / 2 - rect.top - rect.height / 2;

      const maxW = vw - 2 * pad;
      const maxH = vh - 2 * pad;

      if (rect.width > maxW) {
        dx = pad - rect.left;
      } else {
        let left = rect.left + dx;
        if (left < pad) dx += pad - left;
        left = rect.left + dx;
        if (left + rect.width > vw - pad) dx += vw - pad - rect.width - left;
      }

      if (rect.height > maxH) {
        dy = pad - rect.top;
      } else {
        let top = rect.top + dy;
        if (top < pad) dy += pad - top;
        top = rect.top + dy;
        if (top + rect.height > vh - pad) dy += vh - pad - rect.height - top;
      }

      const currentX = cameraX.get();
      const currentY = cameraY.get();
      animate(cameraX, currentX + dx, { duration: 0.75, ease: [0.4, 0, 0.2, 1] });
      animate(cameraY, currentY + dy, { duration: 0.75, ease: [0.4, 0, 0.2, 1] });
    },
    [cameraX, cameraY, stationGutter],
  );

  // Zoom: hero ~70%; work cards ~35% of viewport each; detail ~80% (works + detail camera driven here).
  useLayoutEffect(() => {
    zoomAnimRef.current?.stop();
    worksCameraXAnimRef.current?.stop();
    worksCameraYAnimRef.current?.stop();

    const cleanup = () => {
      zoomAnimRef.current?.stop();
      worksCameraXAnimRef.current?.stop();
      worksCameraYAnimRef.current?.stop();
    };

    const playJustClosed = prevPlayModeActiveRef.current && !playModeActive;

    try {
    if (!projectsVisible) {
      if (canvasResetToInitialRef.current) {
        canvasResetToInitialRef.current = false;
        forceHeroFramingRef.current = false;
        rowScaleAnimRef.current?.stop();
        rowScaleMotion.set(rowScale);

        const targetZ = computeCanonicalHeroZoomTarget({
          vw,
          vh,
          heroWidth,
          heroHeight,
          heroViewFrac: HERO_VIEW_FRAC,
          layoutMargin: LAYOUT_MARGIN,
          zoomMin: ZOOM_MIN,
          zoomMax: ZOOM_MAX,
          minRowScale: MIN_ROW_SCALE,
        });
        zoomMotion.set(targetZ);
        zoomAnimRef.current = animate(zoomMotion, targetZ, {
          duration: 0,
          ease: [0.4, 0, 0.2, 1],
        });

        const { camX, camY } = computeHeroCenterCamera({
          z: targetZ,
          vw,
          vh,
          rowScale,
          scaleOriginX,
          scaleOriginY,
          heroX,
          heroY,
          heroWidth,
          heroHeight,
        });
        cameraX.set(camX);
        cameraY.set(camY);
        lastHeroIdleLayoutRef.current = { vw, vh };
        lastAboutVisibleRef.current = false;

        return cleanup;
      }

      // Hero-only zoom: canonical hero target (matches first Play open); About uses same z with its own pan.
      const targetZ = computeCanonicalHeroZoomTarget({
        vw,
        vh,
        heroWidth,
        heroHeight,
        heroViewFrac: HERO_VIEW_FRAC,
        layoutMargin: LAYOUT_MARGIN,
        zoomMin: ZOOM_MIN,
        zoomMax: ZOOM_MAX,
        minRowScale: MIN_ROW_SCALE,
      });
      const ease = [0.4, 0, 0.2, 1] as const;
      const heroZoomDuration =
        aboutVisible || playModeActive ? WORKS_LIST_ZOOM_DURATION_SEC : 0.55;

      zoomAnimRef.current = animate(zoomMotion, targetZ, {
        duration: heroZoomDuration,
        ease,
      });

      if (aboutVisible) {
        lastAboutVisibleRef.current = true;
        const { camX, camY } = computeAboutPanelCamera({
          z: targetZ,
          vw,
          vh,
          rowScale,
          scaleOriginX,
          scaleOriginY,
          heroX,
          heroY,
          heroWidth,
          heroHeight,
          cardGap: CARD_GAP,
          aboutHeight: ABOUT_STATION_HEIGHT,
        });
        const panDuration = WORKS_LIST_ZOOM_DURATION_SEC;
        worksCameraXAnimRef.current = animate(cameraX, camX, {
          duration: panDuration,
          ease,
        });
        worksCameraYAnimRef.current = animate(cameraY, camY, {
          duration: panDuration,
          ease,
        });
      } else {
        const shouldRestoreCamera = lastAboutVisibleRef.current;
        lastAboutVisibleRef.current = false;
        const forceHero = forceHeroFramingRef.current;
        if (forceHeroFramingRef.current) forceHeroFramingRef.current = false;

        if (playModeActive) {
          const heroCamOriginX = heroX + heroWidth / 2;
          const { camX, camY } = computeHeroCenterCamera({
            z: targetZ,
            vw,
            vh,
            rowScale,
            scaleOriginX: heroCamOriginX,
            scaleOriginY,
            heroX,
            heroY,
            heroWidth,
            heroHeight,
          });
          worksCameraXAnimRef.current = animate(cameraX, camX, {
            duration: WORKS_LIST_ZOOM_DURATION_SEC,
            ease,
          });
          worksCameraYAnimRef.current = animate(cameraY, camY, {
            duration: WORKS_LIST_ZOOM_DURATION_SEC,
            ease,
          });
        } else if (shouldRestoreCamera || forceHero) {
          const { camX, camY } = computeHeroCenterCamera({
            z: targetZ,
            vw,
            vh,
            rowScale,
            scaleOriginX,
            scaleOriginY,
            heroX,
            heroY,
            heroWidth,
            heroHeight,
          });
          worksCameraXAnimRef.current = animate(cameraX, camX, {
            duration: 0.55,
            ease,
          });
          worksCameraYAnimRef.current = animate(cameraY, camY, {
            duration: 0.55,
            ease,
          });
        } else if (playJustClosed) {
          const { camX, camY } = computeHeroCenterCamera({
            z: targetZ,
            vw,
            vh,
            rowScale,
            scaleOriginX,
            scaleOriginY,
            heroX,
            heroY,
            heroWidth,
            heroHeight,
          });
          worksCameraXAnimRef.current = animate(cameraX, camX, {
            duration: WORKS_LIST_ZOOM_DURATION_SEC,
            ease,
          });
          worksCameraYAnimRef.current = animate(cameraY, camY, {
            duration: WORKS_LIST_ZOOM_DURATION_SEC,
            ease,
          });
        } else {
          const prevIdle = lastHeroIdleLayoutRef.current;
          const layoutChanged = !prevIdle || prevIdle.vw !== vw || prevIdle.vh !== vh;
          lastHeroIdleLayoutRef.current = { vw, vh };
          if (layoutChanged) {
            const { camX, camY } = computeHeroCenterCamera({
              z: targetZ,
              vw,
              vh,
              rowScale,
              scaleOriginX,
              scaleOriginY,
              heroX,
              heroY,
              heroWidth,
              heroHeight,
            });
            worksCameraXAnimRef.current = animate(cameraX, camX, { duration: 0, ease });
            worksCameraYAnimRef.current = animate(cameraY, camY, { duration: 0, ease });
          }
        }
      }

      return cleanup;
    }

    lastAboutVisibleRef.current = false;

    // Play from Explore (or any works view): same framing as hero Play — hero centered, panel tucked in via PLAY_KINETIC_GAP / kineticPanelWidth.
    if (playModeActive && !selectedProject) {
      const canonicalZ = computeCanonicalHeroZoomTarget({
        vw,
        vh,
        heroWidth,
        heroHeight,
        heroViewFrac: HERO_VIEW_FRAC,
        layoutMargin: LAYOUT_MARGIN,
        zoomMin: ZOOM_MIN,
        zoomMax: ZOOM_MAX,
        minRowScale: MIN_ROW_SCALE,
      });
      const hRs = heroOnlyRowScale(vw, heroWidth, LAYOUT_MARGIN, MIN_ROW_SCALE);
      const playTargetZ = zoomMatchingHeroRowScale(
        canonicalZ,
        hRs,
        rowScale,
        ZOOM_MIN,
        ZOOM_MAX,
      );
      const ease = [0.4, 0, 0.2, 1] as const;
      const duration = WORKS_LIST_ZOOM_DURATION_SEC;

      zoomAnimRef.current = animate(zoomMotion, playTargetZ, {
        duration,
        ease,
      });

      const heroCamOriginX = heroX + heroWidth / 2;
      const { camX, camY } = computeHeroCenterCamera({
        z: playTargetZ,
        vw,
        vh,
        rowScale,
        scaleOriginX: heroCamOriginX,
        scaleOriginY,
        heroX,
        heroY,
        heroWidth,
        heroHeight,
      });
      worksCameraXAnimRef.current = animate(cameraX, camX, {
        duration,
        ease,
      });
      worksCameraYAnimRef.current = animate(cameraY, camY, {
        duration,
        ease,
      });

      return cleanup;
    }

    const ideal = selectedProject
      ? Math.min(
          (DETAIL_VIEW_FRAC * vw) / (detailWidth * rowScale),
          (DETAIL_VIEW_FRAC * vh) / (detailHeight * rowScale),
        )
      : Math.min(
          (WORKS_CARD_VIEW_FRAC * vw) / (projectWidth * rowScale),
          (WORKS_CARD_VIEW_FRAC * vh) / (projectHeight * rowScale),
        );
    // Works list: cap zoom so the full cluster still fits horizontally. Detail: fit DETAIL_VIEW_FRAC
    // (needs a higher ceiling than ZOOM_MAX when rowScale is below 1).
    const cap = selectedProject
      ? DETAIL_ZOOM_MAX
      : (vw - 2 * LAYOUT_MARGIN) / (rowScale * clusterSpan);
    const zMax = selectedProject ? DETAIL_ZOOM_MAX : ZOOM_MAX;
    const targetZ = Math.min(zMax, Math.max(ZOOM_MIN, Math.min(ideal, cap)));
    const ease = [0.4, 0, 0.2, 1] as const;
    const duration = selectedProject ? DETAIL_ZOOM_DURATION_SEC : WORKS_LIST_ZOOM_DURATION_SEC;

    zoomAnimRef.current = animate(zoomMotion, targetZ, {
      duration,
      ease,
    });

    if (!selectedProject) {
      const { camX, camY } = computeWorksListCamera({
        z: targetZ,
        vw,
        vh,
        rowScale,
        scaleOriginX,
        scaleOriginY,
        worksTop,
        worksColumnLeft,
        projectWidth,
        firstCardTopPx: CONTENT_TOP_BELOW_LOGO_PX,
      });
      worksCameraXAnimRef.current = animate(cameraX, camX, {
        duration,
        ease,
      });
      worksCameraYAnimRef.current = animate(cameraY, camY, {
        duration,
        ease,
      });
    } else if (selectedProjectIndex !== -1) {
      const { camX, camY } = computeDetailPanelCamera({
        z: targetZ,
        vw,
        vh,
        rowScale,
        scaleOriginX,
        scaleOriginY,
        detailColumnLeft,
        detailWidth,
        worksTop,
        projectStride,
        detailRowIndex: selectedProjectIndex,
        detailTopInsetPx: CONTENT_TOP_BELOW_LOGO_PX,
      });
      worksCameraXAnimRef.current = animate(cameraX, camX, {
        duration,
        ease,
      });
      worksCameraYAnimRef.current = animate(cameraY, camY, {
        duration,
        ease,
      });
    }

    return cleanup;
    } finally {
      prevPlayModeActiveRef.current = playModeActive;
    }
  }, [
    projectsVisible,
    selectedProject?.id,
    selectedProjectIndex,
    exploreFocusTick,
    vw,
    vh,
    rowScale,
    clusterSpan,
    scaleOriginX,
    scaleOriginY,
    worksTop,
    worksColumnLeft,
    detailColumnLeft,
    selectedProject,
    projectWidth,
    projectHeight,
    detailWidth,
    detailHeight,
    projectStride,
    heroWidth,
    heroHeight,
    heroX,
    heroY,
    aboutVisible,
    aboutFocusTick,
    homeResetTick,
    playModeActive,
    zoomMotion,
  ]);

  const handleExplore = () => {
    setPlayModeActive(false);
    setAboutVisible(false);
    setSelectedProject(null);
    setLastOpenedProjectIndex(EXPLORE_FOCUS_PROJECT_INDEX);
    setProjectsVisible(true);
    setExploreFocusTick((t) => t + 1);
  };

  const handleAbout = useCallback(() => {
    setPlayModeActive(false);
    setProjectsVisible(false);
    setSelectedProject(null);
    setAboutVisible(true);
    setAboutFocusTick((t) => t + 1);
  }, []);

  const handlePlay = useCallback(() => {
    setPlayModeActive((prev) => {
      if (!prev) {
        setSelectedProject(null);
        setAboutVisible(false);
      }
      return !prev;
    });
  }, []);

  const handleRestart = useCallback(() => {
    zoomAnimRef.current?.stop();
    worksCameraXAnimRef.current?.stop();
    worksCameraYAnimRef.current?.stop();
    canvasResetToInitialRef.current = true;
    setProjectsVisible(false);
    setSelectedProject(null);
    setAboutVisible(false);
    setPlayModeActive(false);
    setHomeResetTick((n) => n + 1);
  }, []);

  const handleProjectClick = (project: Project, index: number) => {
    setPlayModeActive(false);
    setLastOpenedProjectIndex(index);
    setSelectedProject(project);
  };

  const handleCloseDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Close details with ESC (same close path as X button).
  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseDetails();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, handleCloseDetails]);

  useEffect(() => {
    if (!aboutVisible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setAboutVisible(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [aboutVisible]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap camera to the dot grid so cards feel "sticky" to grid points.
    const currentX = cameraX.get();
    const currentY = cameraY.get();
    const snappedX = Math.round(currentX / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(currentY / GRID_SIZE) * GRID_SIZE;
    animate(cameraX, snappedX, { duration: 0.22, ease: [0.22, 1, 0.36, 1] });
    animate(cameraY, snappedY, { duration: 0.22, ease: [0.22, 1, 0.36, 1] });
  };

  const ZOOM_STEP = 0.2;
  const ZOOM_BTN_EASE = [0.4, 0, 0.2, 1] as const;
  const ZOOM_BTN_DURATION = 0.22;

  const handleZoomIn = () => {
    zoomAnimRef.current?.stop();
    worksCameraXAnimRef.current?.stop();
    worksCameraYAnimRef.current?.stop();
    const cap = selectedProject ? DETAIL_ZOOM_MAX : ZOOM_MAX;
    const zOld = zoomMotion.get();
    const next = Math.min(zOld + ZOOM_STEP, cap);
    if (next === zOld) return;
    const { camX: cx1, camY: cy1 } = cameraForViewportCenterAfterZoom({
      vw,
      vh,
      zOld,
      zNew: next,
      camX0: cameraX.get(),
      camY0: cameraY.get(),
    });
    zoomAnimRef.current = animate(zoomMotion, next, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
    worksCameraXAnimRef.current = animate(cameraX, cx1, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
    worksCameraYAnimRef.current = animate(cameraY, cy1, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
  };

  const handleZoomOut = () => {
    zoomAnimRef.current?.stop();
    worksCameraXAnimRef.current?.stop();
    worksCameraYAnimRef.current?.stop();
    const zOld = zoomMotion.get();
    const next = Math.max(zOld - ZOOM_STEP, ZOOM_MIN);
    if (next === zOld) return;
    const { camX: cx1, camY: cy1 } = cameraForViewportCenterAfterZoom({
      vw,
      vh,
      zOld,
      zNew: next,
      camX0: cameraX.get(),
      camY0: cameraY.get(),
    });
    zoomAnimRef.current = animate(zoomMotion, next, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
    worksCameraXAnimRef.current = animate(cameraX, cx1, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
    worksCameraYAnimRef.current = animate(cameraY, cy1, {
      duration: ZOOM_BTN_DURATION,
      ease: ZOOM_BTN_EASE,
    });
  };

  const handleHome = useCallback(() => {
    zoomAnimRef.current?.stop();
    worksCameraXAnimRef.current?.stop();
    worksCameraYAnimRef.current?.stop();
    forceHeroFramingRef.current = true;
    setProjectsVisible(false);
    setSelectedProject(null);
    setAboutVisible(false);
    setPlayModeActive(false);
    setHomeResetTick((n) => n + 1);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div
      ref={canvasRef}
      className="portfolio-desktop-canvas relative h-screen w-screen overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: theme.background,
      }}
    >
      {/* Fixed wordmark: #1F1F1F by default; white when overlapping hero / play / detail dark surfaces */}
      <div className="pointer-events-none fixed left-1/2 top-0 z-[60] -translate-x-1/2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div
          ref={logoWordmarkRef}
          className="relative h-20 w-96"
          style={{ color: logoOnDarkSurface ? '#ffffff' : '#1F1F1F' }}
        >
          <div className="absolute left-0 top-0 justify-start font-['Clash_Grotesk'] text-4xl font-semibold">
            YARDEN SALANSKY{' '}
          </div>
          <div className="absolute left-[133px] top-[38px] justify-start font-['Clash_Grotesk'] text-xl font-normal leading-tight">
            PORTFOLIO
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-3 top-3 z-[50] flex flex-col gap-2 sm:right-6 sm:top-6">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 sm:h-12 sm:w-12"
          style={{
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
          }}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </motion.button>

        {/* Zoom Controls */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors sm:h-12 sm:w-12"
          style={{
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
          }}
        >
          <ZoomIn className="h-5 w-5" style={{ color: isDarkMode ? '#d0d0d0' : '#374151' }} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors sm:h-12 sm:w-12"
          style={{
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
          }}
        >
          <ZoomOut className="h-5 w-5" style={{ color: isDarkMode ? '#d0d0d0' : '#374151' }} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleHome}
          className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-colors sm:h-12 sm:w-12"
          style={{
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
          }}
          aria-label="Home — return to hero"
          title="Home"
        >
          <Home className="h-5 w-5" style={{ color: isDarkMode ? '#d0d0d0' : '#374151' }} />
        </motion.button>
      </div>

      {/* Draggable Canvas: pan on outer layer, zoom on inner so scale is about viewport center */}
      <motion.div
        drag={!isHoveringDetail}
        dragConstraints={{ left: -5500, right: 2500, top: -2800, bottom: 1200 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x: cameraX,
          y: cameraY,
        }}
        className="absolute inset-0 z-[1]"
      >
        <motion.div
          style={{
            scale: zoomMotion,
            transformOrigin: `${vw / 2}px ${vh / 2}px`,
          }}
          className="absolute inset-0"
        >
        {/* Dot grid: inverse-scaled so zoomMotion does not change apparent dot size/spacing (cards still zoom). */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 origin-center"
          style={{ scale: gridInverseScale }}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute"
            style={{
              left: -12000,
              top: -12000,
              width: 24000,
              height: 24000,
              backgroundImage: `radial-gradient(circle, ${theme.gridColor} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>

        {/* Scaled cluster: connectors + cards share one transform so lines stay aligned on narrow viewports */}
        <motion.div
          className="absolute inset-0 z-[2]"
          style={{
            pointerEvents: 'none',
            scale: rowScaleMotion,
            transformOrigin: `${effectiveOriginX}px ${effectiveOriginY}px`,
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {playModeActive && (
              <CurvedLine
                x1={playPanelX + kineticPanelWidth - CONNECTOR_OVERLAP}
                y1={heroY + heroHeight / 2}
                x2={heroX + CONNECTOR_OVERLAP}
                y2={heroY + heroHeight / 2}
                delay={0}
                color={connectorColor}
                strokeWidth={3}
              />
            )}
            {projectsVisible &&
              projects.map((project, index) => (
                <CurvedLine
                  key={`hero-project-line-${project.id}`}
                  x1={heroX + heroWidth - CONNECTOR_OVERLAP}
                  y1={heroY + heroHeight / 2}
                  x2={worksColumnLeft + CONNECTOR_OVERLAP}
                  y2={worksTop + index * projectStride + projectHeight / 2}
                  delay={index * 0.08}
                  color={connectorColor}
                  strokeWidth={3}
                />
              ))}
            {selectedProject && selectedProjectIndex !== -1 && (
              <CurvedLine
                x1={worksColumnLeft + projectWidth - CONNECTOR_OVERLAP}
                y1={worksTop + selectedProjectIndex * projectStride + projectHeight / 2}
                x2={detailColumnLeft + CONNECTOR_OVERLAP}
                y2={worksTop + selectedProjectIndex * projectStride + detailHeight / 2}
                delay={0}
                color={connectorColor}
                strokeWidth={3}
              />
            )}
            {aboutVisible && (
              <CurvedLine
                x1={heroX + heroWidth / 2}
                y1={heroY + heroHeight - CONNECTOR_OVERLAP}
                x2={heroX + heroWidth / 2}
                y2={heroY + heroHeight + CARD_GAP + CONNECTOR_OVERLAP}
                delay={0.06}
                color={connectorColor}
                strokeWidth={3}
              />
            )}
          </div>

          <div
            className="absolute flex flex-row items-start"
            style={{
              left: heroX,
              top: worksTop,
              gap: stationGutter,
              pointerEvents: 'auto',
            }}
          >
            <KineticPlayProvider active={playModeActive} onToggle={handlePlay}>
            {playModeActive && (
              <div
                ref={playDarkSurfaceRef}
                className="absolute z-[3] flex min-h-0 min-w-0 flex-col"
                style={{
                  left: -(PLAY_KINETIC_GAP + kineticPanelWidth),
                  top: heroY - worksTop,
                  width: kineticPanelWidth,
                  height: heroHeight,
                  pointerEvents: 'auto',
                }}
                onMouseEnter={() => setIsHoveringPlayCard(true)}
                onMouseLeave={() => setIsHoveringPlayCard(false)}
              >
                <KineticStylePanel />
              </div>
            )}
            <div
              className="flex shrink-0 flex-col"
              style={{
                marginTop: heroY - worksTop,
                width: heroWidth,
                gap: CARD_GAP,
                pointerEvents: 'auto',
              }}
              onMouseEnter={playModeActive ? () => setIsHoveringPlayCard(true) : undefined}
              onMouseLeave={playModeActive ? () => setIsHoveringPlayCard(false) : undefined}
            >
              <Hero
                ref={heroDarkSurfaceRef}
                onExplore={handleExplore}
                onPlay={handlePlay}
                onRestart={handleRestart}
                onAbout={handleAbout}
                isDarkMode={isDarkMode}
                playModeActive={playModeActive}
                kineticStage={playModeActive ? <KineticHeroStage /> : undefined}
              />
              {aboutVisible && (
                <AboutStation isDarkMode={isDarkMode} onClose={() => setAboutVisible(false)} />
              )}
            </div>
          </KineticPlayProvider>

          {projectsVisible && (
            <div
              ref={projectsPanelRef}
              className="flex shrink-0 flex-col"
              style={{
                width: projectWidth,
                height: projectsColumnHeight,
                gap: CARD_GAP,
                pointerEvents: 'none',
              }}
            >
              <Projects
                projects={projects}
                onProjectClick={handleProjectClick}
                selectedProject={selectedProject}
                isDragging={isDragging}
              />
            </div>
          )}

          {selectedProject && selectedProjectIndex !== -1 && (
            <div
              key={selectedProject.id}
              ref={detailPanelRef}
              className="relative shrink-0"
              style={{
                marginTop: selectedProjectIndex * projectStride,
                width: detailWidth,
                height: detailHeight,
                pointerEvents: 'auto',
              }}
              onMouseEnter={() => setIsHoveringDetail(true)}
              onMouseLeave={() => setIsHoveringDetail(false)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseDetails();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/92 text-[22px] leading-none text-black shadow-md backdrop-blur-sm hover:bg-white"
                aria-label="Close project details"
                title="Close details"
              >
                ×
              </button>
              <ProjectDetail project={selectedProject} isDarkMode={isDarkMode} />
            </div>
          )}
          </div>
        </motion.div>
        </motion.div>
      </motion.div>

      <DesktopInvertCursor />
    </div>
  );
}