import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { NextProjectFooter } from './NextProjectFooter';

const DEFAULT_ARTBOARD_W = 1400;

export interface ScaledDesktopCaseStudyProps {
  artboardHeight: number;
  artboardWidth?: number;
  leftBleed?: number;
  backgroundClassName?: string;
  scaledSurfaceClassName?: string;
  embedScrollParent?: boolean;
  onNextProject?: () => void;
  footerBackgroundClassName?: string;
  children: ReactNode;
}

/**
 * Scales a fixed-width Figma case study to the desktop detail panel width (War Diary pattern).
 */
export function ScaledDesktopCaseStudy({
  artboardHeight,
  artboardWidth = DEFAULT_ARTBOARD_W,
  leftBleed = 0,
  backgroundClassName = 'bg-white',
  scaledSurfaceClassName,
  embedScrollParent = false,
  onNextProject,
  footerBackgroundClassName,
  children,
}: ScaledDesktopCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const layoutW = artboardWidth + leftBleed;
  const surfaceClass = scaledSurfaceClassName ?? backgroundClassName;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / layoutW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [layoutW]);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-0 overflow-x-hidden ${backgroundClassName} ${
        embedScrollParent ? '' : 'h-full overflow-y-auto'
      }`}
    >
      <div
        className={`relative shrink-0 ${backgroundClassName}`}
        style={{
          width: layoutW * scale,
          height: artboardHeight * scale,
        }}
      >
        <div
          className={`absolute top-0 ${surfaceClass}`}
          style={{
            left: leftBleed * scale,
            width: artboardWidth,
            height: artboardHeight,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
      {onNextProject ? (
        <NextProjectFooter
          onNextProject={onNextProject}
          backgroundClassName={footerBackgroundClassName ?? backgroundClassName}
        />
      ) : null}
    </div>
  );
}
