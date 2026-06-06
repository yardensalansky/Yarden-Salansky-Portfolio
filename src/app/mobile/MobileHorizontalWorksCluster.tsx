import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { CurvedLine } from '../components/CurvedLine';
import { MobileWorkCanvasCard } from './MobileWorkCanvasCard';
import type { MobileProjectId } from './mobileProjects';
import { MOBILE_PROJECTS } from './mobileProjects';

const CONNECTOR_OVERLAP = 18;

interface MobileHorizontalWorksClusterProps {
  hero: ReactNode;
  heroW: number;
  heroH: number;
  workW: number;
  workH: number;
  gutter: number;
  cardGap: number;
  exploreSeq: number;
  connectorColor: string;
  heroRing: string;
  onSelectWork: (id: MobileProjectId, rect: DOMRect) => void;
}

/**
 * Hub layout like desktop Canvas: hero on the left, curved lines from hero mid-right to each work card on the right.
 */
export function MobileHorizontalWorksCluster({
  hero,
  heroW,
  heroH,
  workW,
  workH,
  gutter,
  cardGap,
  exploreSeq,
  connectorColor,
  heroRing,
  onSelectWork,
}: MobileHorizontalWorksClusterProps) {
  const projectStride = workH + cardGap;
  const colH = MOBILE_PROJECTS.length * workH + (MOBILE_PROJECTS.length - 1) * cardGap;
  const worksTopOffset = Math.max(0, heroH / 2 - colH / 2);
  const clusterW = heroW + gutter + workW;
  const clusterH = Math.max(heroH, worksTopOffset + colH);

  return (
    <div className="relative inline-block shrink-0" style={{ width: clusterW, minHeight: clusterH }}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {MOBILE_PROJECTS.map((p, i) => (
          <CurvedLine
            key={`hub-${exploreSeq}-${p.id}`}
            x1={heroW - CONNECTOR_OVERLAP}
            y1={heroH / 2}
            x2={heroW + gutter + CONNECTOR_OVERLAP}
            y2={worksTopOffset + i * projectStride + workH / 2}
            delay={i * 0.08}
            color={connectorColor}
            strokeWidth={2.75}
          />
        ))}
      </div>

      <div className="relative z-[1] flex flex-row items-start">
        <div
          className={`shrink-0 overflow-hidden rounded-[24px] shadow-[0_20px_48px_rgba(0,0,0,0.2)] ring-1 ${heroRing}`}
          style={{ width: heroW, height: heroH }}
        >
          {hero}
        </div>
        <div className="shrink-0" style={{ width: gutter }} aria-hidden />
        <motion.div
          className="flex shrink-0 flex-col"
          style={{
            width: workW,
            marginTop: worksTopOffset,
            gap: cardGap,
          }}
          initial={{ x: 56, opacity: 0.72 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 24, stiffness: 210, mass: 0.88 }}
        >
          {MOBILE_PROJECTS.map((p, i) => (
            <MobileWorkCanvasCard
              key={p.id}
              project={p}
              index={i}
              workW={workW}
              workH={workH}
              onSelect={onSelectWork}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
