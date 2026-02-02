"use client";

import { useState } from "react";
import type { BentoSection } from "@standup/contracts/bento";

interface BentoSectionProps {
  data: BentoSection;
}

export default function BentoSection({ data }: BentoSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#00051a] py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-6xl font-bold text-center tracking-tight text-white">
          {data.title}
        </h2>

        {/* 5-column grid allows for easy 60/40 (3 cols vs 2 cols) distribution */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {data.cards.map((card, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;
            
            // Logic for 60/40 swap
            const isEvenRow = Math.floor(index / 2) % 2 === 0;
            const isFirstInRow = index % 2 === 0;
            const colSpan = isEvenRow 
              ? (isFirstInRow ? "md:col-span-3" : "md:col-span-2") // 60% | 40%
              : (isFirstInRow ? "md:col-span-2" : "md:col-span-3"); // 40% | 60%

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`group relative h-[400px] overflow-hidden rounded-3xl transition-all duration-700 ease-in-out ${colSpan} ${
                  isDimmed ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
                }`}
              >
                {/* Image Component */}
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt ?? ""}
                  className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Attractive Overlay: Gradient + Text */}
                <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#00051a] via-[#00051a]/20 to-transparent p-8 transition-opacity duration-500`}>
                  
                  {/* Label - Always visible but pops on hover */}
                  <span className={`mb-2 text-lg font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isActive ? "text-blue-400" : "text-neutral-400"
                  }`}>
                    {card.label}
                  </span>

                  {/* Title - Moves up on hover */}
                  <h3 className={`text-3xl font-bold text-white transition-transform duration-500 ease-out ${
                    isActive ? "-translate-y-2" : "translate-y-0"
                  }`}>
                    {card.title}
                  </h3>
                  
                  {/* Description - Fades in and slides up */}
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    isActive ? "max-h-24 opacity-100 translate-y-0 mt-3" : "max-h-0 opacity-0 translate-y-4"
                  }`}>
                    <p className="text-lg leading-relaxed text-neutral-300">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Inner Border Glow */}
                <div className={`absolute inset-0 rounded-3xl border border-white/10 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}