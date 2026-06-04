import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animateScrollLeft } from './animateScrollLeft';
import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react';
import { Home, Moon, Sun } from 'lucide-react';
import { CurvedLine } from '../components/CurvedLine';
import { useViewportSize } from '../../hooks/useViewportSize';
import {
  computeHeroCardSize,
  computeMobileDetailPanelWidth,
  computeWorkCardSize,
} from './mobileCanvasLayout';
import { MobileAboutModal } from './MobileAboutModal';
import { MobileCanvasProjectDetail } from './MobileCanvasProjectDetail';
import { MobileHeroPortrait } from './MobileHeroPortrait';
import { MobileHorizontalWorksCluster } from './MobileHorizontalWorksCluster';
import { MobilePlayBrainModal } from './MobilePlayBrainModal';
import { MOBILE_PROJECTS, type MobileProjectId } from './mobileProjects';

/**
 * Explore opens a horizontal hub (hero left → lines right → works). Project detail is a real column to the right;
 * opening it scrolls the canvas to center that panel and draws a connector from the work card.
 */
export function MobileApp() {
  const { width: vw, height: vh } = useViewportSize();
  const [explored, setExplored] = useState(false);
  const [exploreSeq, setExploreSeq] = useState(0);
  const [detailId, setDetailId] = useState<MobileProjectId | null>(null);
  const [detailLine, setDetailLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playBrainOpen, setPlayBrainOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const panAbortRef = useRef<AbortController | null>(null);
  const prevViewportRef = useRef({ w: vw, h: vh });
  const worldScale = useMotionValue(1);

  const { heroW, heroH } = useMemo(() => computeHeroCardSize(vw, vh), [vw, vh]);
  const { workW, workH } = useMemo(() => computeWorkCardSize(vw), [vw]);
  const stationGutter = useMemo(() => Math.round(Math.max(44, Math.min(104, vw * 0.12))), [vw]);
  const detailPanelW = useMemo(() => computeMobileDetailPanelWidth(vw), [vw]);
  const detailHubGap = useMemo(() => Math.round(Math.max(24, Math.min(48, vw * 0.07))), [vw]);

  const connectorColor = isDarkMode ? '#4a4a4a' : '#b8b8b8';

  const handleExplore = useCallback(() => {
    setExplored(true);
    setExploreSeq((n) => n + 1);
  }, []);

  const handleHome = useCallback(() => {
    panAbortRef.current?.abort();
    setExplored(false);
    setDetailId(null);
    setDetailLine(null);
    setPlayBrainOpen(false);
    setAboutOpen(false);
    worldScale.set(1);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      hScrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }, [worldScale]);

  useLayoutEffect(() => {
    if (!explored) return;
    worldScale.set(1.12);
    animate(worldScale, 1, { duration: 0.72, ease: [0.4, 0, 0.2, 1] });

    panAbortRef.current?.abort();
    const ac = new AbortController();
    panAbortRef.current = ac;

    const run = async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if (ac.signal.aborted) return;
      const sc = hScrollRef.current;
      if (!sc) return;
      const maxS = Math.max(0, sc.scrollWidth - sc.clientWidth);
      if (maxS < 4) return;
      const target = Math.min(maxS, Math.max(heroW * 0.5, heroW + stationGutter * 0.25));
      try {
        await animateScrollLeft(sc, target, 900, ac.signal);
      } catch {
        /* aborted */
      }
    };
    void run();

    return () => {
      ac.abort();
    };
  }, [explored, exploreSeq, worldScale, heroW, stationGutter]);

  /** Horizontally centers the detail panel on the device screen (viewport center). */
  const scrollToCenterDetailPanel = useCallback(
    async (sc: HTMLDivElement, signal: AbortSignal, durationMs: number) => {
      const maxS = Math.max(0, sc.scrollWidth - sc.clientWidth);
      if (maxS < 4) return;
      const screenCx = window.innerWidth * 0.5;
      const panelEl = document.querySelector<HTMLElement>('[data-mobile-detail-panel]');
      let target: number;
      if (panelEl) {
        const pRect = panelEl.getBoundingClientRect();
        const panelCx = pRect.left + pRect.width / 2;
        target = Math.max(0, Math.min(maxS, sc.scrollLeft + (panelCx - screenCx)));
      } else {
        const scRect = sc.getBoundingClientRect();
        const padStart = 12 + 4;
        const clusterLayoutW = heroW + stationGutter + workW;
        const detailCenterInContent = padStart + clusterLayoutW + detailHubGap + detailPanelW / 2;
        target = Math.max(0, Math.min(maxS, detailCenterInContent + scRect.left - screenCx));
      }
      await animateScrollLeft(sc, target, durationMs, signal);
    },
    [detailHubGap, detailPanelW, heroW, stationGutter, workW]
  );

  const commitDetailLine = useCallback((id: MobileProjectId, workFallback?: DOMRect) => {
    const workEl = document.querySelector<HTMLElement>(`[data-mobile-work="${id}"]`);
    const panelEl = document.querySelector<HTMLElement>('[data-mobile-detail-panel]');
    if (!panelEl) return;
    const rWork = workEl?.getBoundingClientRect() ?? workFallback;
    if (!rWork) return;
    const rPanel = panelEl.getBoundingClientRect();
    setDetailLine({
      x1: rWork.left + rWork.width * 0.72,
      y1: rWork.top + rWork.height * 0.5,
      x2: rPanel.left + rPanel.width * 0.05,
      y2: rPanel.top + rPanel.height * 0.4,
    });
  }, []);

  const openDetail = useCallback(
    async (id: MobileProjectId, rect: DOMRect) => {
      panAbortRef.current?.abort();
      const ac = new AbortController();
      panAbortRef.current = ac;

      setDetailLine(null);
      setDetailId(id);

      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      if (ac.signal.aborted) return;

      const sc = hScrollRef.current;
      if (sc) {
        try {
          await scrollToCenterDetailPanel(sc, ac.signal, 840);
        } catch {
          /* aborted */
        }
      }

      if (ac.signal.aborted) return;

      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      commitDetailLine(id, rect);
    },
    [commitDetailLine, scrollToCenterDetailPanel]
  );

  useLayoutEffect(() => {
    if (!detailId || !explored) {
      prevViewportRef.current = { w: vw, h: vh };
      return;
    }
    const prev = prevViewportRef.current;
    const viewportChanged = prev.w !== vw || prev.h !== vh;
    prevViewportRef.current = { w: vw, h: vh };
    if (!viewportChanged) return;

    const sc = hScrollRef.current;
    if (!sc) return;

    panAbortRef.current?.abort();
    const ac = new AbortController();
    panAbortRef.current = ac;

    const id = detailId;
    void (async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (ac.signal.aborted) return;
      try {
        await scrollToCenterDetailPanel(sc, ac.signal, 420);
      } catch {
        /* aborted */
      }
      if (ac.signal.aborted) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      commitDetailLine(id);
    })();

    return () => ac.abort();
  }, [vw, vh, detailId, explored, scrollToCenterDetailPanel, commitDetailLine]);

  const scrollToWorksHub = useCallback(
    async (signal: AbortSignal, durationMs = 620) => {
      const sc = hScrollRef.current;
      if (!sc) return;
      const maxS = Math.max(0, sc.scrollWidth - sc.clientWidth);
      const target = Math.min(maxS, Math.max(heroW * 0.5, heroW + stationGutter * 0.25));
      try {
        await animateScrollLeft(sc, target, durationMs, signal);
      } catch {
        /* aborted */
      }
    },
    [heroW, stationGutter]
  );

  const closeDetail = useCallback(() => {
    setDetailLine(null);
    setDetailId(null);
    panAbortRef.current?.abort();
    const ac = new AbortController();
    panAbortRef.current = ac;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (ac.signal.aborted) return;
        void scrollToWorksHub(ac.signal, 620);
      });
    });
  }, [scrollToWorksHub]);

  const handleNextProject = useCallback(async () => {
    if (!detailId) return;
    const currentIndex = MOBILE_PROJECTS.findIndex((p) => p.id === detailId);
    if (currentIndex < 0 || currentIndex >= MOBILE_PROJECTS.length - 1) return;

    const nextId = MOBILE_PROJECTS[currentIndex + 1]!.id;

    panAbortRef.current?.abort();
    const ac = new AbortController();
    panAbortRef.current = ac;

    setDetailLine(null);
    setDetailId(null);

    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    if (ac.signal.aborted) return;

    await scrollToWorksHub(ac.signal, 620);
    if (ac.signal.aborted) return;

    await new Promise<void>((r) => window.setTimeout(() => r(), 80));
    if (ac.signal.aborted) return;

    const workEl = document.querySelector<HTMLElement>(`[data-mobile-work="${nextId}"]`);
    if (!workEl) return;
    await openDetail(nextId, workEl.getBoundingClientRect());
  }, [detailId, openDetail, scrollToWorksHub]);

  useEffect(() => {
    if (detailId || playBrainOpen || aboutOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [detailId, playBrainOpen, aboutOpen]);

  const sheetOpen = detailId !== null;
  const canvasBg = isDarkMode ? '#141414' : '#e8e8ea';
  const heroRing = isDarkMode ? 'ring-white/10' : 'ring-black/[0.07]';

  return (
    <div
      className="fixed inset-0 z-[150] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: !explored ? '#000000' : canvasBg }}
    >
      <div className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[160] flex flex-row items-center gap-2">
        <button
          type="button"
          onClick={handleHome}
          className="flex h-9 w-9 items-center justify-center rounded-full shadow-lg touch-manipulation"
          style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }}
          aria-label="Home — back to first screen"
          title="Home"
        >
          <Home className={`h-4 w-4 ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`} />
        </button>
        <button
          type="button"
          onClick={() => setIsDarkMode((d) => !d)}
          className="flex h-9 w-9 items-center justify-center rounded-full shadow-lg touch-manipulation"
          style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4 text-amber-300" />
          ) : (
            <Moon className="h-4 w-4 text-neutral-700" />
          )}
        </button>
      </div>

      <div
        className={`relative z-[20] flex h-[100dvh] w-full max-w-full flex-col overflow-hidden pt-0 ${
          !explored ? 'bg-black' : ''
        }`}
        style={{
          touchAction: sheetOpen || playBrainOpen || aboutOpen ? 'auto' : explored ? 'manipulation' : 'pan-y',
        }}
      >
        <div
          ref={scrollRef}
          className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain ${
            !explored ? 'bg-black' : ''
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <motion.div
            className={`flex flex-col items-stretch ${!explored ? 'min-h-[100dvh] bg-black' : ''}`}
            style={{
              scale: worldScale,
              transformOrigin: explored ? '15% 35%' : '50% 0%',
            }}
          >
            {!explored ? (
              <section className="box-border flex h-[100dvh] min-h-[100dvh] w-full shrink-0 flex-col bg-black pb-[env(safe-area-inset-bottom)]">
                <div className="min-h-0 flex-1 w-full min-w-0 overflow-hidden bg-black">
                  <MobileHeroPortrait
                    fullBleed
                    onExplore={handleExplore}
                    onPlay={() => setPlayBrainOpen(true)}
                    onAbout={() => setAboutOpen(true)}
                  />
                </div>
              </section>
            ) : (
              <section
                className={`flex min-h-[100dvh] w-full shrink-0 flex-col px-0 ${
                  detailId
                    ? 'justify-start pt-[calc(20px+env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]'
                    : 'justify-center py-6'
                }`}
              >
                <div
                  ref={hScrollRef}
                  className="w-full overflow-x-auto overflow-y-visible overscroll-x-contain px-3 pb-[max(5rem,env(safe-area-inset-bottom))]"
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
                >
                  <div
                    className={`inline-flex min-w-max justify-start pl-1 pr-12 ${
                      detailId ? 'items-start pt-0' : 'items-center pt-1'
                    }`}
                    style={{ gap: detailHubGap }}
                  >
                    <MobileHorizontalWorksCluster
                      hero={
                        <MobileHeroPortrait
                          onExplore={handleExplore}
                          onPlay={() => setPlayBrainOpen(true)}
                          onAbout={() => setAboutOpen(true)}
                        />
                      }
                      heroW={heroW}
                      heroH={heroH}
                      workW={workW}
                      workH={workH}
                      gutter={stationGutter}
                      exploreSeq={exploreSeq}
                      connectorColor={connectorColor}
                      heroRing={heroRing}
                      onSelectWork={openDetail}
                    />
                    <AnimatePresence>
                      {detailId && (
                        <motion.div
                          key={detailId}
                          data-mobile-detail-panel
                          className="shrink-0"
                          style={{ width: detailPanelW }}
                          initial={{ opacity: 0.82 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                        >
                          <MobileCanvasProjectDetail
                            projectId={detailId}
                            onClose={closeDetail}
                            onNextProject={
                              MOBILE_PROJECTS.findIndex((p) => p.id === detailId) <
                              MOBILE_PROJECTS.length - 1
                                ? handleNextProject
                                : undefined
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </div>

      {detailLine && (
        <div className="pointer-events-none fixed inset-0 z-[10]" aria-hidden>
          <CurvedLine
            key={`detail-line-${detailLine.x1}-${detailLine.y1}`}
            x1={detailLine.x1}
            y1={detailLine.y1}
            x2={detailLine.x2}
            y2={detailLine.y2}
            delay={0.02}
            color={connectorColor}
            strokeWidth={3}
            position="fixed"
          />
        </div>
      )}

      <AnimatePresence>
        {playBrainOpen && (
          <MobilePlayBrainModal
            key="play-brain"
            isDarkMode={isDarkMode}
            onClose={() => setPlayBrainOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutOpen && (
          <MobileAboutModal
            key="about"
            isDarkMode={isDarkMode}
            onClose={() => setAboutOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
