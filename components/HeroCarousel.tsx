"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface HeroSlide {
  id: string;
  imageSrc: string;
  /** Strict, descriptive alt text for the real banner photo. */
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const AUTOPLAY_MS = 6000;

/**
 * Home page hero carousel — real RankersPro banner photography with an
 * HTML text overlay (not baked into the image, so it stays screen-reader
 * and SEO legible). Autoplays, pauses on hover/focus, and supports
 * keyboard (arrow keys) and touch-swipe navigation.
 */
export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, paused, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured RankersPro batches"
      className="relative overflow-hidden bg-brand-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        if (startX === null || endX === undefined) return;
        const delta = endX - startX;
        if (Math.abs(delta) > 40) {
          delta < 0 ? next() : prev();
        }
        touchStartX.current = null;
      }}
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; no image loader needed */}
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/10 sm:bg-gradient-to-r sm:from-brand-950/85 sm:via-brand-950/40 sm:to-transparent"
            />
            <div className="container-page absolute inset-0 flex items-end pb-10 sm:items-center sm:pb-0">
              <div className="max-w-xl">
                <p className="eyebrow text-gold-400">{slide.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-brand-100 sm:text-lg">
                  {slide.description}
                </p>
                <Link href={slide.ctaHref} className="btn-primary mt-6">
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="link-focus absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
              <path d="M12.7 15.7a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 111.4 1.4L8.4 10l4.3 4.3a1 1 0 010 1.4z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="link-focus absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 fill-current">
              <path d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4l4.3-4.3-4.3-4.3a1 1 0 010-1.4z" />
            </svg>
          </button>

          <div
            role="tablist"
            aria-label="Choose slide"
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-gold-400" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
