import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animateScrollLeft } from './animateScrollLeft';
import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react';
import { Home } from 'lucide-react';
import { useViewportSize } from '../../hooks/useViewportSize';
import {
  computeHeroCardSize,
  computeMobileCardGap,
  computeMobileStationGutter,
  computeWorkCardSize,
} from './mobileCanvasLayout';
import { MobileAboutModal } from './MobileAboutModal';
import { MobileCanvasProjectDetail } from './MobileCanvasProjectDetail';
import { MobileHeroPortrait } from './MobileHeroPortrait';
import { MobileHorizontalWorksCluster } from './MobileHorizontalWorksCluster';
import { MobilePlayBrainModal } from './MobilePlayBrainModal';
import { MOBILE_PROJECTS, type MobileProjectId } from './mobileProjects';

/**
 * Explore opens a horizontal hub (hero left → lines right → works). Project detail is a full-screen sheet
 * so 1400px case studies stay readable instead of being crushed into a side column.
 */
export function MobileApp() {
  const { width: vw, height: vh } = useViewportSize();
  const [explored, setExplored] = useState(false);
  const [exploreSeq, setExploreSeq] = useState(0);
  const [detailId, setDetailId] = useState<MobileProjectId | null>(null);
  const [playBrainOpen, setPlayBrainOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hScrollRef = useRef<HTMLDivElement>(null);
  const panAbortRef = useRef<AbortController | null>(null);
  const worldScale = useMotionValue(1);

  const { heroW, heroH } = useMemo(() => computeHeroCardSize(vw, vh), [vw, vh]);
  const { workW, workH } = useMemo(() => computeWorkCardSize(vw), [vw]);
  const stationGutter = useMemo(() => computeMobileStationGutter(vw), [vw]);
  const cardGap = useMemo(() => computeMobileCardGap(vw), [vw]);

  /** Match desktop Canvas.tsx light theme */
  const connectorColor = '#d0d0d0';
  const gridColor = '#d0d0d0';

  const handleExplore = useCallback(() => {
    setExplored(true);
    setExploreSeq((n) => n + 1);
  }, []);

  const handleHome = useCallback(() => {
    panAbortRef.current?.abort();
    setExplored(false);
    setDetailId(null);
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

  const openDetail = useCallback((id: MobileProjectId) => {
    panAbortRef.current?.abort();
    setDetailId(id);
  }, []);

  const closeDetail = useCallback(() => {
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

  const handleNextProject = useCallback(() => {
    if (!detailId) return;
    const currentIndex = MOBILE_PROJECTS.findIndex((p) => p.id === detailId);
    if (currentIndex < 0) return;
    const nextId = MOBILE_PROJECTS[(currentIndex + 1) % MOBILE_PROJECTS.length]!.id;
    setDetailId(nextId);
  }, [detailId]);

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
  const canvasBg = '#fafafa';
  const heroRing = 'ring-black/[0.07]';

  return (
    <div
      className="fixed inset-0 z-[150] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: !explored ? '#000000' : canvasBg }}
    >
      {!sheetOpen ? (
        <div className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[160]">
          <button
            type="button"
            onClick={handleHome}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg touch-manipulation"
            aria-label="Home — back to first screen"
            title="Home"
          >
            <Home className="h-4 w-4 text-neutral-700" />
          </button>
        </div>
      ) : null}

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
              <section className="relative flex min-h-[100dvh] w-full shrink-0 flex-col justify-center px-0 py-4">
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  aria-hidden
                  style={{
                    backgroundImage: `radial-gradient(circle, ${gridColor} 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                  }}
                />
                <div
                  ref={hScrollRef}
                  className="relative z-[1] w-full overflow-x-auto overflow-y-visible overscroll-x-contain px-4 pb-[max(4.5rem,env(safe-area-inset-bottom))]"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-x pan-y',
                    scrollPaddingInline: '16px',
                  }}
                >
                  <div className="inline-flex min-w-max items-center justify-start pl-1 pr-12 pt-1">
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
                      cardGap={cardGap}
                      exploreSeq={exploreSeq}
                      connectorColor={connectorColor}
                      heroRing={heroRing}
                      onSelectWork={(id) => openDetail(id)}
                    />
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {detailId && (
          <motion.div
            key={detailId}
            className="fixed inset-0 z-[140]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <MobileCanvasProjectDetail
              projectId={detailId}
              onClose={closeDetail}
              onHome={handleHome}
              onNextProject={handleNextProject}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {playBrainOpen && (
          <MobilePlayBrainModal key="play-brain" isDarkMode={false} onClose={() => setPlayBrainOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutOpen && (
          <MobileAboutModal key="about" isDarkMode={false} onClose={() => setAboutOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
