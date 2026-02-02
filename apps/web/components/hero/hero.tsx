"use client";

import { useEffect, useState } from "react";
import type { Hero } from "@standup/contracts/hero";

interface HeroSectionProps {
  hero: Hero;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const slides = hero.slides ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canLoadVideo, setCanLoadVideo] = useState(false);

  useEffect(() => {
    const id = requestIdleCallback(() => setCanLoadVideo(true));
    return () => cancelIdleCallback(id);
  }, []);

  useEffect(() => {
    if (!hero.autoplay || slides.length <= 1) return;

    const id = setInterval(
      () => setCurrentSlide((i) => (i + 1) % slides.length),
      hero.slideDuration
    );

    return () => clearInterval(id);
  }, [hero.autoplay, hero.slideDuration, slides.length]);

  if (!slides.length) return null;

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* VIDEO */}
      {canLoadVideo && (
        <iframe
          className="absolute inset-0 w-full h-full opacity-40"
          loading="lazy"
          src={`https://www.youtube.com/embed/${slide.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${slide.videoUrl}`}
          allow="autoplay; fullscreen"
          title="hero-video"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

      <main className="relative z-10 h-full flex flex-col justify-end px-12 pb-20">
        <h1 className="sr-only">
          Indian Stand-Up Comedy Platform – Comedians, Shows & Tours
        </h1>

        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-6">
          Indian <br /> Stand-Up
        </h2>

        <p className="text-xl text-white/90 mb-4">
          “{slide.quote}”
        </p>

        <p className="border-l-4 pl-4 text-sm uppercase tracking-widest text-[#FF6B01]">
          {slide.comedianId} · {slide.year}
        </p>
      </main>
    </section>
  );
}
