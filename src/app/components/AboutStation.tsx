import { motion } from 'motion/react';

/** Design artboard (px) — inner content stays at this size, then scaled uniformly. */
const STATION_W = 675;
const STATION_H = 593;

/** Uniform scale: smaller card, identical layout / type proportions. */
const ABOUT_CARD_SCALE = 0.68;

export const ABOUT_STATION_HEIGHT = Math.round(STATION_H * ABOUT_CARD_SCALE);

/** Tailwind default zinc-700 / zinc-300 (explicit so theme doesn’t skew the card). */
const BG = '#3f3f46';
const FG = '#d4d4d8';

interface AboutStationProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export function AboutStation({ onClose, isDarkMode: _isDarkMode }: AboutStationProps) {
  const outerW = Math.round(STATION_W * ABOUT_CARD_SCALE);
  const outerH = Math.round(STATION_H * ABOUT_CARD_SCALE);

  return (
    <motion.div
      role="region"
      aria-labelledby="about-station-title"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative mx-auto max-w-full shrink-0 overflow-hidden rounded-2xl shadow-2xl"
      style={{
        width: outerW,
        height: outerH,
        pointerEvents: 'auto',
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="relative rounded-2xl"
        style={{
          width: STATION_W,
          height: STATION_H,
          backgroundColor: BG,
          transform: `scale(${ABOUT_CARD_SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border text-xl leading-none shadow-md backdrop-blur-sm"
          style={{
            borderColor: 'rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(24,24,27,0.92)',
            color: FG,
          }}
          aria-label="Close about"
          title="Close"
        >
          ×
        </button>

        <div className="relative h-full w-full" style={{ color: FG }}>
          <div
            id="about-station-title"
            className="absolute left-[36px] top-[63px] w-[543px] justify-start font-['Clash_Grotesk']"
          >
            <span className="text-5xl font-semibold">
              Hi, I&apos;m Yarden
              <br />
            </span>
            <span className="text-3xl font-normal">
              {' '}
              a graphic designer who enjoys building tools and systems that help me improve and rethink the way I
              work.
              <br />
              I&apos;m driven by curiosity, constantly learning, evolving, and refining how I think and create.
            </span>
          </div>

          <div className="absolute left-[36px] top-[399px] justify-start font-['Clash_Grotesk'] text-3xl font-semibold">
            GET IN TOUCH
          </div>
          <a
            href="mailto:yardensal4@gmail.com"
            className="absolute left-[36px] top-[446px] justify-start font-['Clash_Grotesk'] text-3xl font-normal"
            onPointerDown={(e) => e.stopPropagation()}
          >
            yardensal4@gmail.com
          </a>
          <a
            href="tel:+972527483331"
            className="absolute left-[36px] top-[493px] justify-start font-['Clash_Grotesk'] text-3xl font-normal"
            onPointerDown={(e) => e.stopPropagation()}
          >
            +972527483331
          </a>
        </div>
      </div>
    </motion.div>
  );
}
