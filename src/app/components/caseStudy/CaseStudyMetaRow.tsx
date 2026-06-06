import { useLayoutEffect, useRef, useState } from 'react';

/** Desktop: gap between title labels in row 1. */
const META_TITLE_GAP_DESKTOP_PX = 200;
/** Mobile: inset from left/right screen edges for YEAR and DESIGN FIELD. */
const META_EDGE_INSET_MOBILE_PX = 20;

interface CaseStudyMetaRowProps {
  year: string;
  client: string;
  field: string;
  dark?: boolean;
  size?: 'desktop' | 'mobile';
  className?: string;
}

const LABELS = ['YEAR', 'CLIENT', 'DESIGN FIELD'] as const;

/**
 * Desktop: titles in a row from the left with fixed gap; values under each title.
 * Mobile: manual absolute positions — YEAR left, CLIENT center, DESIGN FIELD right.
 */
export function CaseStudyMetaRow({
  year,
  client,
  field,
  dark = false,
  size = 'desktop',
  className = '',
}: CaseStudyMetaRowProps) {
  const isMobile = size === 'mobile';
  const labelClass = isMobile
    ? "m-0 font-['Satoshi'] text-[10px] font-bold uppercase leading-tight tracking-wide text-neutral-500"
    : "m-0 shrink-0 font-['Satoshi'] text-2xl font-bold text-neutral-500";
  const valueClass = isMobile
    ? `m-0 text-balance font-['Satoshi'] text-xs font-black leading-tight ${dark ? 'text-white' : 'text-black'}`
    : `m-0 whitespace-nowrap font-['Satoshi'] text-3xl font-black ${dark ? 'text-white' : 'text-black'}`;

  const values = [year, client, field];

  if (isMobile) {
    return (
      <dl className={`relative m-0 min-h-11 w-full ${className}`.trim()}>
        <div
          className="absolute top-0 flex max-w-[28%] flex-col items-start gap-1.5 text-left"
          style={{ left: META_EDGE_INSET_MOBILE_PX }}
        >
          <dt className={labelClass}>{LABELS[0]}</dt>
          <dd className={valueClass}>{values[0]}</dd>
        </div>
        <div className="absolute left-1/2 top-0 flex max-w-[34%] -translate-x-1/2 flex-col items-start gap-1.5 text-left">
          <dt className={labelClass}>{LABELS[1]}</dt>
          <dd className={valueClass}>{values[1]}</dd>
        </div>
        <div
          className="absolute top-0 flex max-w-[34%] flex-col items-start gap-1.5 text-left"
          style={{ right: META_EDGE_INSET_MOBILE_PX }}
        >
          <dt className={labelClass}>{LABELS[2]}</dt>
          <dd className={valueClass}>{values[2]}</dd>
        </div>
      </dl>
    );
  }

  return (
    <DesktopMetaRow
      year={year}
      client={client}
      field={field}
      labelClass={labelClass}
      valueClass={valueClass}
      titleGapPx={META_TITLE_GAP_DESKTOP_PX}
      className={className}
    />
  );
}

function DesktopMetaRow({
  year,
  client,
  field,
  labelClass,
  valueClass,
  titleGapPx,
  className,
}: {
  year: string;
  client: string;
  field: string;
  labelClass: string;
  valueClass: string;
  titleGapPx: number;
  className: string;
}) {
  const values = [year, client, field];
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRowRef = useRef<HTMLDivElement>(null);
  const [valueOffsets, setValueOffsets] = useState<number[]>([0, 0, 0]);
  const [valuesRowHeight, setValuesRowHeight] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const rowLeft = titleRefs.current[0]?.offsetLeft ?? 0;
      setValueOffsets(
        titleRefs.current.map((el) => (el ? el.offsetLeft - rowLeft : 0))
      );
      const firstValue = valuesRowRef.current?.querySelector('dd');
      setValuesRowHeight(firstValue?.getBoundingClientRect().height ?? 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [year, client, field]);

  return (
    <dl className={`m-0 flex w-full max-w-full flex-col gap-y-4 ${className}`.trim()}>
      <div className="flex items-start" style={{ gap: titleGapPx }}>
        {LABELS.map((label, i) => (
          <div key={label} ref={(el) => { titleRefs.current[i] = el; }}>
            <dt className={labelClass}>{label}</dt>
          </div>
        ))}
      </div>
      <div
        ref={valuesRowRef}
        className="relative w-full"
        style={{ minHeight: valuesRowHeight > 0 ? valuesRowHeight : undefined }}
      >
        {values.map((value, i) => (
          <dd
            key={LABELS[i]}
            className={`absolute top-0 ${valueClass}`}
            style={{ left: valueOffsets[i] }}
          >
            {value}
          </dd>
        ))}
      </div>
    </dl>
  );
}
