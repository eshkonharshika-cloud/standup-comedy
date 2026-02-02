"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import type { HeroSection as HeroSectionType } from "@standup/contracts/herosection";

interface HeroBentoSectionProps {
  hero: HeroSectionType;
}

const COLORS = {
  ORANGE: "#FF6B01",
};

const HeroBentoSection: React.FC<HeroBentoSectionProps> = ({ hero }) => {
  const router = useRouter();
  const { scrollY } = useScroll();

  const [mounted, setMounted] = useState(false);
  const [orbs, setOrbs] = useState<
    { width: number; height: number; left: string; top: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setMounted(true);

    const generated = Array.from({ length: 12 }).map(() => ({
      width: Math.random() * 8 + 6,
      height: Math.random() * 8 + 6,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 5,
    }));

    requestAnimationFrame(() => setOrbs(generated));
  }, []);

  const bgY = useTransform(scrollY, [0, 500], mounted ? [0, -100] : [0, 0]);
  const rotateX = useTransform(scrollY, [0, 500], mounted ? [60, 75] : [60, 60]);

  if (!hero?.isActive) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      {/* ✅ SEO H1 */}
      <h1 className="sr-only">
        {hero.headlineTop} {hero.headlineAccent}
      </h1>

      {/* GRID */}
      <motion.div
        style={{ perspective: "1000px", y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          style={{ rotateX }}
          className="w-[200vw] h-[200vh] opacity-20"
        >
          <div className="absolute inset-0 grid grid-cols-12">
            {[...Array(13)].map((_, i) => (
              <div key={i} className="w-px bg-[#FF6B01]/60" />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ORBS */}
      {mounted && (
        <div className="absolute inset-0">
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#FF6B01] blur"
              style={{
                width: orb.width,
                height: orb.height,
                left: orb.left,
                top: orb.top,
              }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: orb.duration, repeat: Infinity, delay: orb.delay }}
            />
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-5xl px-4">
        <div
          aria-hidden
          className="text-6xl md:text-8xl font-black italic uppercase text-white mb-6"
        >
          {hero.headlineTop}
          <br />
          <span className="text-transparent stroke-[#FF6B01]">
            {hero.headlineAccent}
          </span>
        </div>

        <p className="text-lg md:text-xl text-white/90 mb-10">
          {hero.subtext}
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            onClick={() => router.push("/search")}
            className="px-10 py-4 rounded-full bg-[#FF6B01] text-white font-bold text-xl flex items-center gap-3"
          >
            <Search size={24} /> {hero.ctaSearch}
          </button>

          <button
            onClick={() => router.push("/blog")}
            className="px-10 py-4 rounded-full border-2 border-[#FF6B01] text-[#FF6B01] font-bold flex items-center gap-3"
          >
            {hero.ctaScroll} <ChevronDown className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBentoSection;
