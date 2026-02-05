"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { BentoSection } from "@standup/contracts/argus/bento";

interface BentoSectionProps {
  data: BentoSection;
}

export default function BentoSection({ data }: BentoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reduced height since images are gone
  const stepHeight = 350; 
  const boxSize = 200; // The height of your purple box
  const totalHeight = stepHeight * data.cards.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Numbers move exactly one 'stepHeight' per card
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(stepHeight * (data.cards.length - 1))]
  );

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-br from-[#020b2d] to-[#041463] py-32 text-white"
      // We add some extra height at the end so the last card stays in view
      style={{ minHeight: totalHeight + 400 }}
    >
      <div className="mx-auto  max-w-7xl px-6">
        <h2 className="mb-24  text-6xl font-bold uppercase tracking-tight">
          {data.title}
        </h2>

        <div className="relative flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* LEFT SIDE: Sticky Box */}
          <div className="md:w-1/3 relative">
            <div 
              className="sticky top-1/2 -translate-y-1/2" 
              style={{ height: boxSize, width: boxSize }}
            >
              {/* Purple Box */}
              <div className="absolute inset-0 z-10 rounded-3xl bg-[#5D50E6]" />

              {/* Moving Numbers */}
              <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
                <motion.div
                  style={{ y: translateY }}
                  className="flex flex-col items-center"
                >
                  {data.cards.map((_, index) => (
                    <div
                      key={index}
                      style={{ height: stepHeight }}
                      className="flex shrink-0 items-center justify-center w-full"
                    >
                      {/* Reduced font size slightly for better fit if needed */}
                      <span className="text-[10rem] font-bold leading-none select-none">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="md:w-2/3">
            <div className="flex flex-col">
              {data.cards.map((card) => (
                <div
                  key={card.id}
                  style={{ height: stepHeight }}
                  className="flex flex-col justify-center border-t border-white/10 first:border-none"
                >
                  <div className="space-y-6">
                    <h3 className="text-5xl font-bold uppercase tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-xl leading-relaxed text-neutral-400 max-w-2xl">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}