import React from 'react';
import { motion } from 'motion/react';
import { CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';

interface HeroProps {
  onExplore: () => void;
  onPlay?: () => void;
  /** Full canvas reset to first-load hero framing (desktop Play → RESTART). */
  onRestart?: () => void;
  onAbout: () => void;
  isDarkMode: boolean;
}

/** Design artboard 1400×900 → hero card 1100×650 */
const DESIGN_W = 1400;
const DESIGN_H = 900;
const HERO_W = 1100;
const HERO_H = 650;

/** Shared size + padding for all hero CTAs. */
const HERO_STONE_CTA_CLASS =
  "pointer-events-auto flex h-16 shrink-0 cursor-pointer items-center justify-center border-0 bg-stone-100 px-6 py-4 font-['Clash_Grotesk'] text-2xl font-semibold leading-none tracking-wide text-black whitespace-nowrap";

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(function Hero(
  { onExplore, onPlay, onRestart: _onRestart, onAbout, isDarkMode: _isDarkMode },
  ref,
) {
  const scaleX = HERO_W / DESIGN_W;
  const scaleY = HERO_H / DESIGN_H;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-[650px] w-[1100px] overflow-hidden rounded-2xl bg-black shadow-2xl"
      style={{ pointerEvents: 'auto' }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <video
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-auto max-w-full -translate-x-1/2 object-contain object-top"
        src={CLOUDINARY_VIDEOS.hero_loop}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* Figma layout (1400×900) scaled non-uniformly to fill 1100×650; video unchanged above */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="relative h-[900px] w-[1400px] overflow-visible">
          <div className="pointer-events-auto absolute bottom-[58px] left-[48px] right-[48px] flex flex-row items-center justify-between gap-5">
            <div className="flex shrink-0 flex-row flex-wrap items-center gap-5">
              {onPlay && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay();
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className={HERO_STONE_CTA_CLASS}
                >
                  PLAY WITH MY BRAIN
                </motion.button>
              )}

              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAbout();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className={HERO_STONE_CTA_CLASS}
              >
                ABOUT
              </motion.button>
            </div>

            <div className="flex shrink-0 items-center">
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExplore();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={HERO_STONE_CTA_CLASS}
              >
                EXPLORE MY WORKS
              </motion.button>
            </div>
          </div>

          <div className="pointer-events-none absolute left-[56px] top-[546px] h-56 w-[945.66px] justify-start font-['Clash_Grotesk'] text-4xl font-medium leading-[1.25] text-white">
            Welcome to a piece of my mind.
            <br />
            I&apos;m a Product Designer &amp; Visual Storyteller who loves working from the sofa, but I&apos;ll give
            it up for a good job.
          </div>
        </div>
      </div>
    </motion.div>
  );
});
