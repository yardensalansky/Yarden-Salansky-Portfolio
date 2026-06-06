'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

type CarouselImage = {
  src: string;
  alt?: string;
  stripeSlice?: { index: number; total: number };
};

type StripeCarousel = {
  src: string;
  slices: number;
  alt?: string;
  /** Width / height of one panel in the composite (e.g. "1366/921"). */
  panelAspectRatio?: string;
};

function CarouselSlideImage({
  image,
  fit = 'cover',
}: {
  image: CarouselImage;
  fit?: 'cover' | 'contain';
}) {
  if (image.stripeSlice) {
    const { index, total } = image.stripeSlice;
    return (
      <div className="h-full w-full overflow-hidden bg-black">
        <img
          src={image.src}
          alt={image.alt ?? ''}
          loading="lazy"
          draggable={false}
          className="block h-full max-w-none"
          style={{
            width: `${total * 100}%`,
            marginLeft: index === 0 ? 0 : `-${index * 100}%`,
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt ?? ''}
      loading="lazy"
      draggable={false}
      className={`block h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
    />
  );
}

export function MobileCaseStudyImageCarousel({
  images,
  stripe,
  aspect = '4/5',
  fit = 'cover',
}: {
  images?: CarouselImage[];
  /** Split one wide composite image into equal swipeable panels. */
  stripe?: StripeCarousel;
  /** CSS aspect-ratio for consistent slide height, e.g. "4/5" or "1/1". */
  aspect?: string;
  fit?: 'cover' | 'contain';
}) {
  const slideAspect = stripe?.panelAspectRatio ?? aspect;
  const slideFit = fit;
  const slides =
    stripe !== undefined
      ? Array.from({ length: stripe.slices }, (_, index) => ({
          src: stripe.src,
          alt: stripe.alt ?? '',
          stripeSlice: { index, total: stripe.slices },
        }))
      : (images ?? []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  if (slides.length === 1) {
    return (
      <div className="w-full overflow-hidden" style={{ aspectRatio: slideAspect }}>
        <CarouselSlideImage image={slides[0]!} fit={slideFit} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {slides.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="min-w-0 shrink-0 grow-0 basis-full overflow-hidden"
              style={{ aspectRatio: slideAspect }}
            >
              <CarouselSlideImage image={image} fit={slideFit} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 pt-3" aria-hidden={false}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === selectedIndex ? 'w-4 bg-black' : 'w-1.5 bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
