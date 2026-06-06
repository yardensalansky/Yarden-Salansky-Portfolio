import { motion } from 'motion/react';

interface MobileAboutModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export function MobileAboutModal({ onClose, isDarkMode }: MobileAboutModalProps) {
  const surface = isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900';
  const muted = isDarkMode ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <motion.div
      className="fixed inset-0 z-[220] flex items-end justify-center bg-black/55 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:items-center sm:px-6 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal
        aria-labelledby="about-title"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className={`max-h-[min(82dvh,560px)] w-full max-w-sm overflow-y-auto rounded-3xl p-6 shadow-2xl ring-1 ring-black/10 ${surface}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 id="about-title" className="font-['Clash_Grotesk'] text-2xl font-semibold tracking-[0.06em]">
          Hi, I&apos;m Yarden
        </h2>
        <p className={`mt-4 font-['Clash_Grotesk'] text-base font-normal leading-relaxed tracking-[0.04em] ${muted}`}>
          A Product Designer &amp; Developer who enjoys building tools and systems that improve and rethink the way we
          work.
        </p>
        <p className={`mt-3 font-['Clash_Grotesk'] text-base font-normal leading-relaxed tracking-[0.04em] ${muted}`}>
          Driven by curiosity, I&apos;m constantly learning, evolving, and refining how I think, design, and create.
        </p>
        <div className="mt-6">
          <p className="font-['Clash_Grotesk'] text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Get in touch
          </p>
          <ul className={`mt-3 space-y-2 font-['Clash_Grotesk'] text-sm ${muted}`}>
            <li>
              <a href="tel:+972527483331" className="underline-offset-2 hover:underline">
                +972527483331
              </a>
            </li>
            <li>
              <a href="mailto:yardensal4@gmail.com" className="underline-offset-2 hover:underline">
                yardensal4@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yarden-salansky"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/jordi.is.here"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-full py-3.5 font-['Clash_Grotesk'] text-sm font-semibold touch-manipulation ${
            isDarkMode ? 'bg-white text-black' : 'bg-neutral-900 text-white'
          }`}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
