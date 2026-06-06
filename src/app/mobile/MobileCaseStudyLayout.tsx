import { useEffect, useRef, type ReactNode } from 'react';
import { CaseStudyMetaRow } from '../components/caseStudy/CaseStudyMetaRow';
import { NextProjectFooter } from '../components/caseStudy/NextProjectFooter';

export { MobileCaseStudyImageCarousel } from './MobileCaseStudyImageCarousel';
export { MobileCaseStudyVideoStackCarousel } from './MobileCaseStudyVideoStackCarousel';

interface MobileCaseStudyStackProps {
  children: ReactNode;
  onNextProject?: () => void;
  className?: string;
}

/** Even vertical gap between text, images, and media blocks. */
const MOBILE_SECTION_GAP = 'gap-8';

/** Vertical mobile case study — full-width media, readable body copy (no Figma scale). */
export function MobileCaseStudyStack({
  children,
  onNextProject,
  className = 'bg-white',
}: MobileCaseStudyStackProps) {
  return (
    <div className={`flex w-full flex-col ${MOBILE_SECTION_GAP} ${className}`}>
      {children}
      {onNextProject ? (
        <NextProjectFooter
          onNextProject={onNextProject}
          textClassName="text-xl text-white"
          backgroundClassName="bg-black"
        />
      ) : null}
    </div>
  );
}

export function MobileCaseStudyHero({
  videoSrc,
  imageSrc,
  title,
  subtitle,
  dark = false,
}: {
  videoSrc?: string;
  imageSrc?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-900">
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} />
          </video>
        ) : null}
        {imageSrc ? (
          <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-5 left-4 right-4 flex flex-col gap-0.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <h1 className="m-0 font-['Clash_Grotesk'] text-3xl font-bold leading-none tracking-[0.14em] text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="m-0 font-['Clash_Grotesk'] text-lg font-medium leading-none tracking-[0.12em] text-white/95">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function MobileCaseStudyIntro({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`m-0 px-4 font-['Satoshi'] text-sm font-bold leading-relaxed ${dark ? 'text-white' : 'text-stone-950'}`}
    >
      {children}
    </p>
  );
}

export function MobileCaseStudyMeta({
  year,
  client,
  field,
  dark = false,
}: {
  year: string;
  client: string;
  field: string;
  dark?: boolean;
}) {
  return (
    <CaseStudyMetaRow
      year={year}
      client={client}
      field={field}
      dark={dark}
      size="mobile"
      className="py-6"
    />
  );
}

export function MobileCaseStudyBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`m-0 px-4 font-['Satoshi'] text-sm font-medium leading-relaxed text-black ${className}`}>
      {children}
    </p>
  );
}

export function MobileCaseStudyQuote({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <blockquote
      className={`m-0 px-5 text-center font-['Satoshi'] text-base font-bold leading-relaxed ${dark ? 'text-white' : 'text-black'}`}
    >
      {children}
    </blockquote>
  );
}

/** Groups a heading and copy block so spacing to images stays even. */
export function MobileCaseStudySection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-3 ${className}`.trim()}>{children}</div>;
}

export function MobileCaseStudyHeading({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`m-0 px-4 font-['Clash_Grotesk'] text-xl font-semibold tracking-[0.12em] ${dark ? 'text-white' : 'text-black'}`}
    >
      {children}
    </h2>
  );
}

export function MobileCaseStudyCopy({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`m-0 px-4 font-['Satoshi'] text-sm font-normal leading-relaxed ${dark ? 'text-white/90' : 'text-black'}`}
    >
      {children}
    </p>
  );
}

export function MobileCaseStudyImage({
  src,
  alt = '',
  aspect = 'auto',
  aspectRatio,
  objectPosition = 'center',
  objectPositionY,
}: {
  src: string;
  alt?: string;
  /** Square crops full width; use objectPosition to anchor the visible area. */
  aspect?: 'auto' | 'square';
  /** Custom crop frame (e.g. "900 / 475"). Crops via object-cover inside a fixed-ratio box. */
  aspectRatio?: string;
  objectPosition?: 'center' | 'top' | 'bottom';
  /** Vertical crop focal point (0–100). Higher values cut more from the top. */
  objectPositionY?: number;
}) {
  const positionClass =
    objectPositionY === undefined
      ? objectPosition === 'top'
        ? 'object-top'
        : objectPosition === 'bottom'
          ? 'object-bottom'
          : 'object-center'
      : '';
  const positionStyle =
    objectPositionY !== undefined ? { objectPosition: `center ${objectPositionY}%` } : undefined;

  if (aspectRatio) {
    return (
      <div className="w-full overflow-hidden" style={{ aspectRatio }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={positionStyle}
          className={`block h-full w-full object-cover ${positionClass}`}
        />
      </div>
    );
  }

  if (aspect === 'square') {
    return (
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={positionStyle}
          className={`block h-full w-full object-cover ${positionClass}`}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={positionStyle}
      className={`block w-full object-cover ${positionClass}`}
    />
  );
}

export function MobileCaseStudyVideo({
  src,
  autoPlay = true,
  controls = false,
  poster,
  playWhenVisible = false,
}: {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  poster?: string;
  /** Start playback when scrolled into view; pause when scrolled away. */
  playWhenVisible?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playWhenVisible) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [playWhenVisible]);

  return (
    <div ref={wrapRef} className="w-full bg-black">
      <video
        ref={videoRef}
        autoPlay={playWhenVisible ? false : autoPlay}
        muted={!controls}
        loop={!controls}
        playsInline
        controls={controls}
        preload={playWhenVisible || controls ? 'metadata' : 'auto'}
        poster={poster}
        className="block w-full object-cover"
      >
        <source src={src} />
      </video>
    </div>
  );
}

export function MobileCaseStudyLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`m-0 px-4 font-['Satoshi'] text-xs font-medium uppercase tracking-wide ${dark ? 'text-white/60' : 'text-neutral-500'}`}
    >
      {children}
    </p>
  );
}

export function MobileCaseStudySpacer({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'sm' ? 'h-4' : size === 'lg' ? 'h-10' : 'h-6';
  return <div className={h} aria-hidden />;
}
