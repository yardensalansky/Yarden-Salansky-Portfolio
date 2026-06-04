/**
 * War Diary case study — Figma: portfolio, node 158-1613 (dev mode).
 * https://www.figma.com/design/UnmXZsWbgy2Q26Io5ujQgf/portfolio?node-id=158-1613&m=dev
 *
 * Scales Frame297 to the detail card width (1400px artboard + left bleed for negative layers).
 */
import { useLayoutEffect, useRef, useState } from 'react';
import WarDiaryFigmaFrame from '../Frame297/Frame297';

const WAR_DIARY_ARTBOARD_W = 1400;
const WAR_DIARY_LEFT_BLEED = 0;
const WAR_DIARY_LAYOUT_W = WAR_DIARY_ARTBOARD_W + WAR_DIARY_LEFT_BLEED;
const WAR_DIARY_ARTBOARD_H = 8371;

export interface WarDiaryDitailesProps {
  /** Let a parent (e.g. mobile detail card) own vertical scroll instead of this wrapper. */
  embedScrollParent?: boolean;
  /** Opens the next project in the works list (after animating back to works). */
  onNextProject?: () => void;
}

export default function WarDiaryDitailes({
  embedScrollParent = false,
  onNextProject,
}: WarDiaryDitailesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / WAR_DIARY_LAYOUT_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-0 overflow-x-hidden bg-white ${
        embedScrollParent ? '' : 'h-full overflow-y-auto'
      }`}
    >
      <div
        className="relative shrink-0 bg-white"
        style={{
          width: WAR_DIARY_LAYOUT_W * scale,
          height: WAR_DIARY_ARTBOARD_H * scale,
        }}
      >
        <div
          className="absolute top-0 bg-white"
          style={{
            left: WAR_DIARY_LEFT_BLEED * scale,
            width: WAR_DIARY_ARTBOARD_W,
            height: WAR_DIARY_ARTBOARD_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <WarDiaryFigmaFrame />
        </div>
      </div>
      {onNextProject ? (
        <div className="flex w-full shrink-0 justify-center bg-white py-14">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onNextProject();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="cursor-pointer border-0 bg-transparent font-['Clash_Grotesk'] text-4xl font-semibold tracking-wide text-black transition-opacity hover:opacity-60"
          >
            NEXT PROJECT &gt;&gt;
          </button>
        </div>
      ) : null}
    </div>
  );
}
