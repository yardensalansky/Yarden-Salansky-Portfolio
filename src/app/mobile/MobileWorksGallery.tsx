import { Fragment } from 'react';
import { CurvedLine } from '../components/CurvedLine';
import { MobileWorkCanvasCard } from './MobileWorkCanvasCard';
import type { MobileProjectId } from './mobileProjects';
import { MOBILE_PROJECTS } from './mobileProjects';
import { MOBILE_CARD_GAP } from './mobileCanvasLayout';

interface MobileWorksGalleryProps {
  workW: number;
  workH: number;
  isDarkMode: boolean;
  /** Pass card bounds for detail connector (desktop-style line into panel). */
  onSelectWork: (id: MobileProjectId, anchor: DOMRect) => void;
  /** Stagger base for pathLength (sync with explore zoom). */
  exploreTick: number;
}

export function MobileWorksGallery({ workW, workH, isDarkMode, onSelectWork, exploreTick }: MobileWorksGalleryProps) {
  const lineColor = isDarkMode ? '#4a4a4a' : '#b8b8b8';

  return (
    <div className="flex w-full flex-col overflow-x-hidden px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-2">
      <header className="mx-auto mb-6 w-full max-w-full pl-10 pr-2" style={{ maxWidth: workW + 40 }}>
        <p
          className={`font-['Satoshi'] text-xs font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}
        >
          Selected work
        </p>
        <h2
          className={`mt-1 font-['Clash_Grotesk'] text-2xl font-semibold tracking-[0.1em] ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
        >
          Projects
        </h2>
      </header>

      <div className="relative mx-auto w-full" style={{ maxWidth: workW + 40 }}>
        <ul className="relative z-[1] flex w-full flex-col items-center pl-10">
          {MOBILE_PROJECTS.map((p, i) => (
            <Fragment key={p.id}>
              {i > 0 && (
                <li className="relative w-full shrink-0 list-none" style={{ height: MOBILE_CARD_GAP }}>
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-10">
                    <CurvedLine
                      key={`gap-${exploreTick}-${i}`}
                      x1={14}
                      y1={6}
                      x2={14}
                      y2={MOBILE_CARD_GAP - 6}
                      delay={0.08 + i * 0.09}
                      color={lineColor}
                      strokeWidth={2.5}
                    />
                  </div>
                </li>
              )}
              <li className="relative w-full shrink-0 list-none">
                <MobileWorkCanvasCard
                  project={p}
                  index={i}
                  workW={workW}
                  workH={workH}
                  onSelect={onSelectWork}
                />
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
