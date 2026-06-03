import { motion } from 'motion/react';
import type { MobileProjectId } from './mobileProjects';
import { MOBILE_PROJECTS } from './mobileProjects';

interface MobileWorksStackProps {
  onSelect: (id: MobileProjectId) => void;
  isDarkMode: boolean;
}

export function MobileWorksStack({ onSelect, isDarkMode }: MobileWorksStackProps) {
  const surface = isDarkMode ? 'bg-neutral-900' : 'bg-[#f4f4f5]';
  const cardBg = isDarkMode ? 'bg-neutral-800' : 'bg-white';

  return (
    <section
      className={`flex w-full shrink-0 flex-col gap-6 px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 ${surface}`}
    >
      <header className="px-1">
        <p className="font-['Satoshi'] text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
          Selected work
        </p>
        <h2
          className={`mt-1 font-['Clash_Grotesk'] text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
        >
          Projects
        </h2>
      </header>

      <ul className="flex flex-col gap-5">
        {MOBILE_PROJECTS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className={`flex w-full max-w-full flex-col overflow-hidden rounded-2xl text-left shadow-md ring-1 ring-black/5 touch-manipulation ${cardBg}`}
            >
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden ${isDarkMode ? 'bg-neutral-950' : 'bg-neutral-200'}`}
              >
                {p.coverVideo ? (
                  <video
                    src={p.coverVideo}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img src={p.coverImage} alt="" className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-['Satoshi'] text-xs font-semibold uppercase tracking-wider text-white/90">
                  {p.category}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-4">
                <span
                  className={`font-['Clash_Grotesk'] text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
                >
                  {p.title}
                </span>
                <span className={`text-2xl ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`} aria-hidden>
                  →
                </span>
              </div>
            </button>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
