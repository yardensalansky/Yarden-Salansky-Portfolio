import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { NextProjectFooter } from '../components/caseStudy/NextProjectFooter';

interface ScaledFigmaCaseStudyProps {
  designWidth: number;
  designHeight: number;
  children: ReactNode;
  /** Applied to the scaled wrapper (matches artboard background). */
  innerClassName?: string;
  onNextProject?: () => void;
  footerBackgroundClassName?: string;
  footerTextClassName?: string;
  /** Minimum uniform scale (mobile readability for 1400px artboards). */
  minScale?: number;
}

/**
 * Scales a fixed 1400px-wide Figma export to the mobile card width (same math as War Diary / The One).
 */
export function ScaledFigmaCaseStudy({
  designWidth,
  designHeight,
  children,
  innerClassName = 'bg-white',
  onNextProject,
  footerBackgroundClassName,
  footerTextClassName = 'text-2xl text-white',
  minScale,
}: ScaledFigmaCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) {
        const fit = w / designWidth;
        setScale(minScale != null ? Math.max(fit, minScale) : fit);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth, minScale]);

  const footerBg = footerBackgroundClassName ?? 'bg-black';

  return (
    <div className={`flex w-full flex-col ${onNextProject ? footerBg : ''}`}>
      <div ref={containerRef} className="w-full min-w-0 overflow-x-auto overflow-y-visible">
        <div
          className={`relative shrink-0 ${innerClassName}`}
          style={{
            width: designWidth * scale,
            height: designHeight * scale,
          }}
        >
          <div
            className={`absolute left-0 top-0 ${innerClassName}`}
            style={{
              width: designWidth,
              height: designHeight,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {onNextProject ? (
        <NextProjectFooter
          onNextProject={onNextProject}
          textClassName={footerTextClassName}
          backgroundClassName={footerBg}
          className="-mt-px"
        />
      ) : null}
    </div>
  );
}
