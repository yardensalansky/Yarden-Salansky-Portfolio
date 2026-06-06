import { useLayoutEffect, useRef, useState } from 'react';
import { CLOUDINARY_VIDEOS } from '../../constants/cloudinaryAssets';

/** Figma wireframe artboard (w-96 × fixed height). Content scales uniformly inside the hero card. */
const FRAME_W = 384;
const FRAME_H = 816.65;

interface MobileHeroPortraitProps {
  onExplore: () => void;
  onPlay: () => void;
  onAbout: () => void;
  /** First-screen hero: no rounded “card”, flush with black shell. */
  fullBleed?: boolean;
}

export function MobileHeroPortrait({ onExplore, onPlay, onAbout, fullBleed }: MobileHeroPortraitProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w <= 0 || h <= 0) return;
      setScale(Math.min(1, Math.min(w / FRAME_W, h / FRAME_H)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-black"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${fullBleed ? 'rounded-none' : 'rounded-xl'}`}
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Video — same slot as frame image (393×648 area) */}
        <div
          className={`absolute left-0 top-0 flex items-center justify-center overflow-hidden px-3 pt-2 ${fullBleed ? 'rounded-none' : 'rounded-t-xl'}`}
          style={{ width: 384, height: 648.18 }}
        >
          {/* Full frame visible (no crop); letterboxing + padding shrink it if needed. */}
          <video
            className="max-h-full max-w-full object-contain"
            src={CLOUDINARY_VIDEOS.mobile_hero_portfolio}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        </div>

        {/* Bottom black panel (Figma top 614.13; height fills to frame bottom ≈ h-52) */}
        <div
          className={`absolute bottom-0 left-0 bg-black ${fullBleed ? 'rounded-none' : 'rounded-b-xl'}`}
          style={{ top: 614.13, width: 384 }}
          aria-hidden
        />

        {/* Headline — text-4xl semibold, leading 47.79px */}
        <h1
          className="absolute z-[2] m-0 max-w-[320px] text-left font-['Clash_Grotesk'] font-semibold text-white"
          style={{
            left: 25.18,
            top: 456.49,
            width: 320,
            minHeight: 240,
            fontSize: 36,
            lineHeight: '47.79px',
          }}
        >
          Welcome to a piece of my mind.
        </h1>

        {/* Body — text-xl font-normal */}
        <p
          className="absolute z-[2] m-0 max-w-[320px] text-left font-['Clash_Grotesk'] font-normal text-white"
          style={{
            left: 28.46,
            top: 559.39,
            width: 320,
            fontSize: 20,
            lineHeight: 1.35,
          }}
        >
          I&apos;m a Product Designer & Visual Storyteller who loves working from the sofa, but I&apos;ll give it up
          for a good job.
        </p>

        {/* CTAs: one button per chip — text centered in the stone rectangle (Figma chip size/position) */}
        <button
          type="button"
          onClick={onExplore}
          className="absolute z-[4] flex items-center justify-center border-0 bg-stone-100 px-2 text-center font-['Clash_Grotesk'] text-sm font-semibold leading-snug text-black touch-manipulation"
          style={{
            left: 117.73,
            top: 654.53,
            width: 160,
            height: 36,
          }}
        >
          EXPLORE MY WORKS
        </button>

        <button
          type="button"
          onClick={onPlay}
          className="absolute z-[4] flex items-center justify-center border-0 bg-stone-100 px-1.5 text-center font-['Clash_Grotesk'] text-[11px] font-semibold leading-snug text-black touch-manipulation"
          style={{
            left: 130.99,
            top: 704,
            width: 128,
            height: 32,
          }}
        >
          PLAY WITH MY BRAIN
        </button>

        <button
          type="button"
          onClick={onAbout}
          className="absolute z-[4] flex items-center justify-center border-0 bg-stone-100 px-0.5 text-center font-['Clash_Grotesk'] text-[11px] font-semibold leading-snug text-black touch-manipulation"
          style={{
            left: 300.2,
            top: 760.27,
            width: 56,
            height: 32,
          }}
        >
          ABOUT
        </button>
      </div>
    </div>
  );
}
