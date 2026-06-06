'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/** Active slide width — side videos peek from left/right when centered. */
const SLIDE_SIZE_PERCENT = 58;
const SLIDE_SIDE_PAD_PERCENT = (100 - SLIDE_SIZE_PERCENT) / 2;

export type VideoCarouselItem = {
  src: string;
  /** CSS aspect-ratio, e.g. "256 / 568" (matches desktop phone frame). */
  aspectRatio: string;
  maxWidthPx: number;
  radiusPx: number;
};

function isVideoCarouselItem(v: string | VideoCarouselItem): v is VideoCarouselItem {
  return typeof v !== 'string';
}

function normalizeVideos(videos: (string | VideoCarouselItem)[]): VideoCarouselItem[] {
  return videos.map((item) =>
    isVideoCarouselItem(item)
      ? item
      : {
          src: item,
          aspectRatio: '256 / 568',
          maxWidthPx: 256,
          radiusPx: 30,
        }
  );
}

export function MobileCaseStudyVideoStackCarousel({
  videos,
}: {
  videos: (string | VideoCarouselItem)[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const selectedIndexRef = useRef(0);
  const slides = normalizeVideos(videos);

  const syncPlayback = useCallback(
    (activeIndex: number) => {
      const activeLogicalIndex =
        slides.length > 0 ? ((activeIndex % slides.length) + slides.length) % slides.length : 0;
      selectedIndexRef.current = activeLogicalIndex;
      const activeSrc = slides[activeLogicalIndex]?.src;

      const setVideoState = (video: HTMLVideoElement, shouldPlay: boolean) => {
        if (shouldPlay) {
          video.muted = true;
          void video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      };

      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        setVideoState(video, index === activeLogicalIndex);
      });

      // Loop clones duplicate slide nodes — match by src so the visible copy plays.
      emblaApi?.slideNodes().forEach((node) => {
        const video = node.querySelector('video');
        if (!video) return;
        const src = video.querySelector('source')?.getAttribute('src');
        const isActiveSlide = src === activeSrc;
        setVideoState(video, isActiveSlide);
        const overlay = node.querySelector('[data-dim-overlay]');
        if (overlay instanceof HTMLElement) {
          overlay.style.opacity = isActiveSlide ? '0' : '1';
        }
      });
    },
    [emblaApi, slides]
  );

  const onSnapChange = useCallback(() => {
    if (!emblaApi || slides.length === 0) return;
    const index = emblaApi.selectedScrollSnap();
    const logicalIndex = ((index % slides.length) + slides.length) % slides.length;
    setSelectedIndex(logicalIndex);
    syncPlayback(index);
  }, [emblaApi, slides.length, syncPlayback]);

  useEffect(() => {
    if (!emblaApi) return;
    onSnapChange();
    emblaApi.on('select', onSnapChange);
    emblaApi.on('settle', onSnapChange);
    emblaApi.on('reInit', onSnapChange);
    return () => {
      emblaApi.off('select', onSnapChange);
      emblaApi.off('settle', onSnapChange);
      emblaApi.off('reInit', onSnapChange);
    };
  }, [emblaApi, onSnapChange]);

  const handleVideoReady = useCallback(
    (index: number) => {
      if (index === selectedIndexRef.current) {
        syncPlayback(selectedIndexRef.current);
      }
    },
    [syncPlayback]
  );

  if (slides.length === 0) return null;

  return (
    <div className="w-full bg-black py-3">
      <div ref={emblaRef} className="overflow-hidden">
        <div
          className="flex touch-pan-y gap-3"
          style={{
            paddingLeft: `${SLIDE_SIDE_PAD_PERCENT}%`,
            paddingRight: `${SLIDE_SIDE_PAD_PERCENT}%`,
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={slide.src}
                className="flex min-w-0 shrink-0 grow-0 items-center justify-center"
                style={{ flex: `0 0 ${SLIDE_SIZE_PERCENT}%` }}
              >
                <div
                  className="relative mx-auto w-full overflow-hidden bg-zinc-300"
                  style={{
                    maxWidth: slide.maxWidthPx,
                    aspectRatio: slide.aspectRatio,
                    borderRadius: slide.radiusPx,
                  }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => handleVideoReady(index)}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    style={{ borderRadius: slide.radiusPx }}
                  >
                    <source src={slide.src} />
                  </video>
                  <div
                    data-dim-overlay
                    className="pointer-events-none absolute inset-0 bg-black/55 transition-opacity duration-200"
                    style={{ borderRadius: slide.radiusPx, opacity: isActive ? 0 : 1 }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="flex justify-center gap-1.5 pt-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/35'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
