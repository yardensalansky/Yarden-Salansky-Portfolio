import { motion } from 'motion/react';
import type { MobileProjectMeta, MobileProjectId } from './mobileProjects';

interface MobileWorkCanvasCardProps {
  project: MobileProjectMeta;
  index: number;
  workW: number;
  workH: number;
  onSelect: (id: MobileProjectId, anchor: DOMRect) => void;
}

/**
 * Same 700×450 proportions and layered treatment as desktop `Projects.tsx` (title on media, no footer bar).
 */
export function MobileWorkCanvasCard({ project, index, workW, workH, onSelect }: MobileWorkCanvasCardProps) {
  const titleLength = project.title.length;
  const titlePx = Math.max(
    12,
    Math.min(workW * (titleLength > 20 ? 0.088 : titleLength > 14 ? 0.098 : 0.108), workW * 0.13)
  );
  const arrowPx = Math.max(22, Math.min(44, workW * 0.065));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.06 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0"
      style={{ width: workW, height: workH }}
    >
      <motion.button
        type="button"
        data-mobile-work={project.id}
        onClick={(e) => onSelect(project.id, (e.currentTarget as HTMLButtonElement).getBoundingClientRect())}
        whileTap={{ scale: 0.98 }}
        className="relative h-full w-full overflow-hidden rounded-[22px] text-left shadow-[0_16px_40px_rgba(0,0,0,0.22)] ring-1 ring-black/10 touch-manipulation"
        style={{ cursor: 'pointer' }}
      >
        <div className="absolute inset-0">
          {project.coverVideo ? (
            <video
              src={project.coverVideo}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={project.coverImage} alt="" className="h-full w-full object-cover" />
          )}
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
            opacity: 0.5,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[10%]">
          <h2
            className="text-center font-['Clash_Grotesk',sans-serif] font-bold leading-[1.1] text-white"
            style={{
              fontSize: titlePx,
              letterSpacing: '0.1em',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              maxWidth: '100%',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.title}
          </h2>
        </div>

        <div
          className="pointer-events-none absolute bottom-[10%] right-[10%] text-white"
          style={{
            fontSize: arrowPx,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
          aria-hidden
        >
          →
        </div>
      </motion.button>
    </motion.div>
  );
}
