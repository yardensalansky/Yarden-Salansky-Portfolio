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
  /** When true, hero video/copy/decor are hidden; kinetic stage fills the card under the CTAs. */
  playModeActive?: boolean;
  kineticStage?: React.ReactNode;
}

/** Design artboard 1400×900 → hero card 1100×650 */
const DESIGN_W = 1400;
const DESIGN_H = 900;
const HERO_W = 1100;
const HERO_H = 650;

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(function Hero(
  { onExplore, onPlay, onRestart, onAbout, isDarkMode: _isDarkMode, playModeActive, kineticStage },
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
      {!playModeActive && (
        <video
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-auto max-w-full -translate-x-1/2 object-contain object-top"
          src={CLOUDINARY_VIDEOS.hero_loop}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      )}

      {playModeActive && kineticStage && (
        <div className="absolute inset-0 z-[1] min-h-0 min-w-0 overflow-hidden rounded-2xl">
          {kineticStage}
        </div>
      )}

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
          <div className="pointer-events-none absolute left-[1089.74px] top-[699px] h-16 w-64 origin-top-left rotate-[2.60deg] bg-stone-100" />
          {onPlay && (
            <div className="pointer-events-none absolute left-[1321px] top-[833.35px] h-12 w-52 origin-top-left rotate-[177.40deg] bg-stone-100" />
          )}

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
            className="pointer-events-auto absolute left-[1103.91px] top-[715.57px] origin-top-left rotate-[2.69deg] cursor-pointer border-0 bg-transparent p-0 text-left font-['Clash_Grotesk'] text-2xl font-semibold text-black"
          >
            EXPLORE MY WORKS
          </motion.button>

          {onPlay &&
            (playModeActive ? (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRestart) onRestart();
                  else onPlay?.();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="pointer-events-auto absolute left-[1321px] top-[833.35px] flex h-12 w-52 origin-top-left rotate-[177.40deg] cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-center font-['Clash_Grotesk'] text-xl font-semibold leading-none text-black"
              >
                <span className="inline-block rotate-[-177.40deg]">RESTART</span>
              </motion.button>
            ) : (
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
                className="pointer-events-auto absolute left-[1116px] top-[805.26px] origin-top-left rotate-[-2.20deg] cursor-pointer border-0 bg-transparent p-0 text-left font-['Clash_Grotesk'] text-xl font-semibold text-black"
              >
                PLAY WITH MY BRAIN
              </motion.button>
            ))}

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
            className="pointer-events-auto absolute left-[48px] top-[782px] flex h-12 w-36 origin-top-left rotate-[2.65deg] cursor-pointer items-center justify-center border-0 bg-stone-100 p-0 text-center font-['Clash_Grotesk'] text-xl font-semibold leading-none text-black"
          >
            ABOUT
          </motion.button>

          {!playModeActive && (
            <div className="pointer-events-none absolute left-[56px] top-[546px] h-56 w-[945.66px] justify-start font-['Clash_Grotesk'] text-4xl font-medium leading-[1.25] text-white">
              Welcome to a piece of my mind.
              <br />
              I&apos;m a graphic designer who loves working from the sofa, but I&apos;ll give it up for a good
              job.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
