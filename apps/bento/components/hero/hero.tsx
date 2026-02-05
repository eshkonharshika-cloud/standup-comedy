"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ArgusHero } from "@standup/contracts/argus/hero";

interface HeroSectionProps {
  hero: ArgusHero;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Content fade and lift
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // Video Expansion Logic
  // Width starts smaller to ensure it stays clear of the form on the left
  const videoWidth = useTransform(scrollYProgress, [0.1, 0.8], ["40vw", "100vw"]);
  const videoHeight = useTransform(scrollYProgress, [0.1, 0.8], ["50vh", "100vh"]);
  const videoRadius = useTransform(scrollYProgress, [0.1, 0.5], ["2rem", "0rem"]);

  // FIX: Adjust the vertical position so it stays below the headline
  // We move from 'bottom of the grid' (60%) to 'top of screen' (0%)
  const videoTop = useTransform(scrollYProgress, [0.1, 0.8], ["60%", "0%"]);
  const videoTranslateY = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "0%"]);

  return (
    <div ref={containerRef} className="relative bg-[#00051a] min-h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-20 overflow-hidden">

        {/* --- FRONT LAYER (Text & Form) --- */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-20 w-full max-w-7xl px-6 pointer-events-none"
        >
          {/* Heading Section */}
          <div className="text-center mb-16">
            <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-xl mb-4 block">
              {hero.eyebrow}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight max-w-5xl mx-auto">
              {hero.title}
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto mt-6">
              {hero.description}
            </p>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
            <div className="lg:col-span-5 pointer-events-auto">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white/1">
                <h2 className="text-[#00051a] font-bold text-xl mb-6">{hero.form.title}</h2>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email-input" className="sr-only">Email Address</label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="john.smith@company.com"
                      className="w-full px-5 py-3 rounded-xl border border-neutral-200 text-black bg-white"
                    />
                  </div>
                  {/* COUNTRY FIELD (Added here) */}
                  <div>
                    <label htmlFor="country-select" className="text-blue-700 text-[11px] font-black uppercase tracking-wider ml-1 mb-1 block">
                      Country
                    </label>
                    <div className="relative">
                      <select
                        id="country-select"
                        className="w-full px-5 py-3 rounded-xl border border-blue-200 text-black bg-white appearance-none outline-none focus:border-blue-500"
                      >
                        <option value="">Select a country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                      </select>
                      {/* Chevron Icon */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-full">
                    {hero.cta.label} →
                  </button>

                </div>
              </div>
            </div>
            {/* Empty space for the video to show through */}
            <div className="lg:col-span-2" />
          </div>
        </motion.div>

        {/* --- BACK LAYER (Expanding Video) --- */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoRadius,
            position: "absolute",
            top: videoTop, // Starts lower down (60%) to avoid the text
            right: 0,
            y: videoTranslateY,
            zIndex: 10,

          }}
          className="bg-black overflow-hidden shadow-2xl origin-bottom-right" // Anchors growth from the bottom right
        >
          <iframe
            className="w-full h-full object-cover pointer-events-none"
            src="https://www.youtube.com/embed/giuheLxlr5k?autoplay=1&mute=1&loop=1&playlist=giuheLxlr5k&controls=0"
            allow="autoplay; encrypted-media"
            title="Altus Group Platform Overview Video"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

      </div>
    </div>
  );
}