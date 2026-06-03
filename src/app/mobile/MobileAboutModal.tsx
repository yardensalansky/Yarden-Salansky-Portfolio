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
      className="fixed inset-0 z-[220] flex items-center justify-center bg-black/50 px-6"
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
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className={`max-w-sm rounded-3xl p-6 shadow-2xl ring-1 ring-black/10 ${surface}`}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 id="about-title" className="font-['Clash_Grotesk'] text-xl font-semibold">
          About
        </h2>
        <p className={`mt-3 font-['Satoshi'] text-sm leading-relaxed ${muted}`}>
          I&apos;m Yarden, a graphic designer. This portfolio is a slice of how I think, make, and care about
          craft.
        </p>
        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-full py-3 font-['Clash_Grotesk'] text-sm font-semibold touch-manipulation ${
            isDarkMode ? 'bg-white text-black' : 'bg-neutral-900 text-white'
          }`}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
