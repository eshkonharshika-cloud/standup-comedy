"use client";

import { useEffect, useState } from "react";
import type { Hero } from "@standup/contracts/hero";

interface HeroSectionProps {
  hero: Hero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const slides = hero.slides ?? [];
  const hasMultipleSlides = slides.length > 1;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!hero.autoplay || !hasMultipleSlides) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, hero.slideDuration);

    return () => clearInterval(interval);
  }, [hero.autoplay, hero.slideDuration, hasMultipleSlides, slides.length]);

  if (slides.length === 0) return null;

  const activeSlide = slides[currentSlide];

  return (
    <div id="herosection" className="relative h-screen w-full overflow-hidden">
      {/* 1. VIDEO BACKGROUND (YOUTUBE IFRAME) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <iframe
            key={`${slide.videoUrl}-${index}`}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-40" : "opacity-0"
            }`}
            src={`https://www.youtube.com/embed/${slide.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${slide.videoUrl}&modestbranding=1&rel=0&playsinline=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={`hero-video-${index}`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* 2. HERO CONTENT */}
      <main className="relative z-10 flex h-full flex-col justify-end px-12 pb-20">
        <div className="max-w-4xl">
          <h1 className="mb-6 text-5xl font-black uppercase leading-[0.8] tracking-tighter text-white md:text-7xl">
            Indian <br /> Stand-Up
          </h1>

          <p className="mb-4 max-w-xl text-xl text-white/80">
            “{activeSlide.quote}”
          </p>

          <p className="border-l-4 pl-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FF6B01]">
            {activeSlide.comedianId} · {activeSlide.year}
          </p>
        </div>

        {/* 3. INDICATORS */}
        {hasMultipleSlides && (
          <div className="absolute bottom-10 right-12 flex items-center gap-4 font-bold text-white">
            <span className="text-2xl">0{currentSlide + 1}</span>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 transition-all ${
                    i === currentSlide ? "bg-[#FF6B01]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <span className="text-white/40">0{slides.length}</span>
          </div>
        )}
      </main>
    </div>
  );
}
