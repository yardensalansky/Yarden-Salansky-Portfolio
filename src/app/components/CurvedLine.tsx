import { motion } from 'motion/react';

interface CurvedLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  color?: string;
  /** Stroke width in CSS pixels (scales with canvas zoom). */
  strokeWidth?: number;
  /**
   * `absolute` (default): x/y are in the offset parent's coordinate space (desktop canvas).
   * `fixed`: x/y are viewport pixels (mobile connector over scrolling content).
   */
  position?: 'absolute' | 'fixed';
}

const STROKE_PAD = 18;

export function CurvedLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  color = '#d0d0d0',
  strokeWidth = 4,
  position = 'absolute',
}: CurvedLineProps) {
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  const localX1 = x1 - minX;
  const localY1 = y1 - minY;
  const localX2 = x2 - minX;
  const localY2 = y2 - minY;

  const dx = x2 - x1;
  const sx = dx >= 0 ? 1 : -1;
  const absDx = Math.abs(dx);
  // Longer horizontal tangents for open, elegant links at wider station gaps.
  const pull = Math.min(absDx * 0.68, Math.max(240, absDx * 0.52));

  const path = `M ${localX1} ${localY1} C ${localX1 + sx * pull} ${localY1} ${localX2 - sx * pull} ${localY2} ${localX2} ${localY2}`;

  const vbW = width + 2 * STROKE_PAD;
  const vbH = height + 2 * STROKE_PAD;

  return (
    <svg
      style={{
        position,
        left: minX - STROKE_PAD,
        top: minY - STROKE_PAD,
        width: vbW,
        height: vbH,
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      viewBox={`0 0 ${vbW} ${vbH}`}
    >
      <g transform={`translate(${STROKE_PAD}, ${STROKE_PAD})`}>
        <motion.path
          d={path}
          stroke={color}
          strokeOpacity={1}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 0.8, delay, ease: 'easeInOut' },
          }}
        />
      </g>
    </svg>
  );
}
