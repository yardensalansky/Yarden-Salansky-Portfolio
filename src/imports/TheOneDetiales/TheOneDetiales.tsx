/**
 * The One case study — scales 1400×9936 artboard to the detail panel width (same pattern as War Diary).
 */
import { useLayoutEffect, useRef, useState } from 'react';
import FrameTheOne from '../TheOne/FrameTheOne';

const THE_ONE_ARTBOARD_W = 1400;
const THE_ONE_LEFT_BLEED = 0;
const THE_ONE_LAYOUT_W = THE_ONE_ARTBOARD_W + THE_ONE_LEFT_BLEED;
const THE_ONE_ARTBOARD_H = 9936;

export interface TheOneDetialesProps {
  embedScrollParent?: boolean;
}

export default function TheOneDetiales({ embedScrollParent = false }: TheOneDetialesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / THE_ONE_LAYOUT_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-0 overflow-x-hidden bg-[#DAD7DE] ${
        embedScrollParent ? '' : 'h-full overflow-y-auto'
      }`}
    >
      <div
        className="relative shrink-0 bg-[#DAD7DE]"
        style={{
          width: THE_ONE_LAYOUT_W * scale,
          height: THE_ONE_ARTBOARD_H * scale,
        }}
      >
        <div
          className="absolute top-0 bg-black"
          style={{
            left: THE_ONE_LEFT_BLEED * scale,
            width: THE_ONE_ARTBOARD_W,
            height: THE_ONE_ARTBOARD_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <FrameTheOne />
        </div>
      </div>
    </div>
  );
}
