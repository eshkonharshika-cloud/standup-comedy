"use client";

import { useEffect, useState, useRef } from "react";
import type { Quote } from "@standup/contracts/quote";
import { motion } from "framer-motion";

interface QuoteIntroProps {
  quote: Quote;
  onFinish: () => void;
}

export function QuoteIntro({ quote, onFinish }: QuoteIntroProps) {
  const [visible, setVisible] = useState(false);
  const [typedQuote, setTypedQuote] = useState("");
  const cableRef = useRef<SVGPathElement>(null);

  const COLORS = {
    ORANGE: "#FF6B01",
    DARK: "#0a0a0a",
  };

  useEffect(() => {
    setVisible(true);

    let currentIndex = 0;
    const typingSpeed = 40;

    const typeInterval = setInterval(() => {
      if (currentIndex < quote.quote.length) {
        setTypedQuote(quote.quote.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    const cable = cableRef.current;
    if (cable) {
      const length = cable.getTotalLength();
      cable.style.strokeDasharray = `${length}`;
      cable.style.strokeDashoffset = `${length}`;
      cable.style.transition = "stroke-dashoffset 2s ease-in-out";
      requestAnimationFrame(() => {
        cable.style.strokeDashoffset = "0";
      });
    }

    const totalDuration = quote.quote.length * typingSpeed + 3500;
    const timer = setTimeout(onFinish, totalDuration);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(timer);
    };
  }, [onFinish, quote.quote]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
      
      {/* STAGE SPOTLIGHT (The "Drop Light") */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${COLORS.ORANGE}44 0%, transparent 60%)`
        }}
      />

      <div className="relative flex items-center justify-center w-full max-w-6xl h-[500px]">
        
        {/* Background Glowing Halo */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-72 h-72 md:w-96 md:h-96 bg-[#FF6B01] rounded-full z-0 blur-[100px]" 
        />

        {/* Realistic Retro Microphone */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center scale-110 md:scale-125"
        >
          {/* Main Mic Body */}
          <div className="relative w-20 h-28 bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 rounded-[40px] border-2 border-gray-500 shadow-[0_0_30px_rgba(255,107,1,0.3)] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex justify-around px-2 py-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[2px] h-full bg-black/60" />
              ))}
            </div>
            <div className="absolute w-full h-2 bg-gray-700 top-1/2 -translate-y-1/2 z-20 shadow-sm" />
            <div className="absolute inset-2 bg-slate-900 rounded-[30px] -z-10" />
          </div>

          {/* The Yoke */}
          <div className="relative w-24 h-12 -mt-10 flex justify-center">
             <div className="absolute top-0 w-22 h-14 border-x-8 border-b-8 border-gray-800 rounded-b-2xl" />
             <div className="absolute top-4 left-0 w-3 h-3 bg-gray-600 rounded-full" />
             <div className="absolute top-4 right-0 w-3 h-3 bg-gray-600 rounded-full" />
          </div>

          <div className="w-8 h-10 bg-gray-900 rounded-sm -mt-1 shadow-lg" />
        </motion.div>

        {/* Animated Cable Path */}
        <svg 
          className="absolute z-20 w-full h-[400px] pointer-events-none" 
          viewBox="0 0 1000 400" 
          preserveAspectRatio="none"
          style={{ top: '55%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <path
            ref={cableRef}
            d="M500,50 C500,150 550,200 650,200 L750,200"
            stroke={COLORS.ORANGE}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${COLORS.ORANGE}aa)` }}
          />
        </svg>

        {/* Quote Card */}
        <div
          className={`absolute left-[50%] top-[45%] ml-24 md:ml-48 transition-all duration-1000 ease-out transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-[#111111] p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 border-l-[12px] border-l-[#FF6B01] max-w-lg min-w-[320px]">
            <p className="text-xl md:text-2xl font-black text-white leading-tight uppercase italic tracking-tight">
              “{typedQuote}”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-white/20" />
              <p className="text-sm font-bold text-[#FF6B01] uppercase tracking-[0.2em]">
                {quote.author}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER FADE */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}