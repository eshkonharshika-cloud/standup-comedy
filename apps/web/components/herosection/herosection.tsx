"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import type { HeroSection as HeroSectionType } from "@standup/contracts/herosection";


interface HeroBentoSectionProps {
  hero: HeroSectionType;
}

const HeroBentoSection: React.FC<HeroBentoSectionProps> = ({ hero }) => {
  const { scrollY } = useScroll();
  const router = useRouter();


  // Parallax and Perspective shifts based on scroll
  const bgY = useTransform(scrollY, [0, 500], [0, -100]);
  const perspectiveRotate = useTransform(scrollY, [0, 500], [60, 75]);

  const COLORS = {
    ORANGE: "#FF6B01",
    WHITE: "#FFFFFF",
    DARK: "#353535",
  };

  const [orbs, setOrbs] = useState<Array<{ width: number; height: number; left: string; top: string; duration: number; delay: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 5,
    }));

    requestAnimationFrame(() => setOrbs(generated));
  }, []);

  if (!hero?.isActive) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      
      {/* --- LAYER 1: VIRTUAL PERSPECTIVE GRID (The "Tunnel" Effect) --- */}
      <motion.div 
        style={{ perspective: "1000px", y: bgY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          style={{ rotateX: perspectiveRotate }}
          className="relative w-[200vw] h-[200vh] opacity-20"
        >
          {/* Vertical Lines (Vanishing toward center) */}
          <div className="absolute inset-0 grid grid-cols-12 gap-0">
            {[...Array(13)].map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="h-full w-px" 
                style={{ backgroundColor: COLORS.ORANGE, boxShadow: `0 0 15px ${COLORS.ORANGE}` }}
              />
            ))}
          </div>
          {/* Horizontal Lines (Depth) */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="w-full h-px" 
                style={{ 
                  backgroundColor: COLORS.ORANGE, 
                  opacity: (i / 20), // Lines fade as they get "further"
                  boxShadow: `0 0 10px ${COLORS.ORANGE}` 
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* --- LAYER 2: FLOATING DUST/ORBS (Bento Particles) --- */}
      <div className="absolute inset-0 z-0">
        {orbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: COLORS.ORANGE,
              width: orb.width,
              height: orb.height,
              left: orb.left,
              top: orb.top,
              filter: "blur(4px)",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-tight mb-4 uppercase text-white">
            {hero.headlineTop} <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${COLORS.ORANGE}`,
                textShadow: `0 0 40px ${COLORS.ORANGE}66`,
              }}
            >
              {hero.headlineAccent}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl mb-10 text-white/80 font-medium"
        >
          {hero.subtext}
        </motion.p>

        {/* --- ACTIONS --- */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${COLORS.ORANGE}88` }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-xl bg-[#FF6B01] text-white transition-all shadow-xl"
            onClick={() => router.push("/search")}
            >
            <Search size={24} />
            {hero.ctaSearch}
            </motion.button>


          <motion.button
            whileHover={{ backgroundColor: `${COLORS.ORANGE}22` }}
            onClick={() => router.push("/blog")}
            className="flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg border-2 border-[#FF6B01] text-[#FF6B01] transition-all bg-transparent"
          >
            {hero.ctaScroll}
            <ChevronDown className="animate-bounce" size={24} />
          </motion.button>
        </div>
      </div>

      {/* render inline blog search inside the hero when toggled */}


      {/* VIGNETTE GRADIENT (Focus center) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)]" />
    </section>
  );
};

export default HeroBentoSection;