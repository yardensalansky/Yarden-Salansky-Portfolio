import { motion } from 'motion/react';
import { X } from 'lucide-react';

/** Design artboard (px) — inner content stays at this size, then scaled uniformly. */
const STATION_W = 675;

/** Equal vertical inset for all card content (top title + bottom contact). */
const ABOUT_CARD_PAD = 68;
/** ~line height for `text-3xl` contact rows (design px). */
const CONTACT_LINE_HEIGHT = 40;

/** Contact block layout (design artboard px). */
const CONTACT_HEADER_TOP = 431;
const CONTACT_FIRST_TOP = 478;
const CONTACT_LINE_GAP = 38;

const CONTACT_LAST_TOP = CONTACT_FIRST_TOP + CONTACT_LINE_GAP * 3;
const STATION_H = CONTACT_LAST_TOP + CONTACT_LINE_HEIGHT + ABOUT_CARD_PAD;

/** Uniform scale: smaller card, identical layout / type proportions. */
const ABOUT_CARD_SCALE = 0.68;

export const ABOUT_STATION_HEIGHT = Math.round(STATION_H * ABOUT_CARD_SCALE);

/** Card background and text on dark panel. */
const BG = '#3f3f46';
const FG = '#ffffff';

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
          className="absolute right-3 top-3 z-30 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white/92 p-0 text-black shadow-md backdrop-blur-sm hover:bg-white"
          aria-label="Close about"
          title="Close"
        >
          <X size={18} strokeWidth={2.25} aria-hidden />
        </button>

        <div className="relative h-full w-full" style={{ color: FG }}>
          <div
            id="about-station-title"
            className="absolute left-[36px] w-[543px] justify-start font-['Clash_Grotesk'] tracking-[0.06em]"
            style={{ top: ABOUT_CARD_PAD }}
          >
            <span className="text-5xl font-semibold tracking-[0.05em]">
              Hi, I&apos;m Yarden
              <br />
            </span>
            <span className="text-3xl font-normal tracking-[0.08em]">
              {' '}
              A Product Designer &amp; Developer who enjoys building tools and systems that improve and rethink
              the way we work.
              <br />
              Driven by curiosity, I&apos;m constantly learning, evolving, and refining how I think, design, and
              create.
            </span>
          </div>

          <div
            className="absolute left-[36px] justify-start font-['Clash_Grotesk'] text-3xl font-semibold tracking-[0.1em]"
            style={{ top: CONTACT_HEADER_TOP }}
          >
            GET IN TOUCH
          </div>
          <a
            href="tel:+972527483331"
            className="absolute left-[36px] justify-start font-['Clash_Grotesk'] text-3xl font-normal tracking-[0.08em] hover:opacity-80"
            style={{ top: CONTACT_FIRST_TOP }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            +972527483331
          </a>
          <a
            href="mailto:yardensal4@gmail.com"
            className="absolute left-[36px] justify-start font-['Clash_Grotesk'] text-3xl font-normal tracking-[0.08em] hover:opacity-80"
            style={{ top: CONTACT_FIRST_TOP + CONTACT_LINE_GAP }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            yardensal4@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/yarden-salansky"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[36px] justify-start font-['Clash_Grotesk'] text-3xl font-normal tracking-[0.08em] hover:opacity-80"
            style={{ top: CONTACT_FIRST_TOP + CONTACT_LINE_GAP * 2 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Linkedin
          </a>
          <a
            href="https://www.instagram.com/jordi.is.here"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-[36px] justify-start font-['Clash_Grotesk'] text-3xl font-normal tracking-[0.08em] hover:opacity-80"
            style={{ top: CONTACT_FIRST_TOP + CONTACT_LINE_GAP * 3 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Instagram
          </a>
        </div>
      </div>
    </motion.div>
  );
}
