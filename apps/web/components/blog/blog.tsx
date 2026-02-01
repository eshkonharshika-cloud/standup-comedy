"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";

interface JourneySectionProps {
  journeys: {
    step: string;
    title: string;
    mentor: string;
    excerpt: string;
    readTime: string;
    externalUrl: string;
  }[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({ journeys }) => {
  // 1. Check for data before anything else
  if (!journeys || journeys.length === 0) return null;

  const COLORS = {
    ORANGE: "#FF6B01",
    WHITE: "#FFFFFF",
    DARK_CARD: "#121212",
    BG: "#0a0a0a",
  };

  return (
    <section
      id="blog" // Added ID for Navbar anchor links
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: COLORS.BG }}
    >
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap color={COLORS.ORANGE} size={24} />
            <span
              className="text-sm font-black tracking-[0.3em] uppercase"
              style={{ color: COLORS.ORANGE }}
            >
              Masterclass Series
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">
            Start Your <br />
            <span style={{ color: COLORS.ORANGE }}>Journey</span>
          </h2>
        </div>

        <p className="text-white/50 max-w-sm text-lg leading-tight">
          Battle-tested advice from India’s top comics on how to go from zero to a
          special.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {journeys.map((item, index) => (
          <motion.a
            key={item.step}
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between h-[400px] transition-all"
            style={{ backgroundColor: COLORS.DARK_CARD }}
          >
            {/* Step Number Decoration */}
            <span className="absolute top-8 right-8 text-5xl font-black opacity-5 group-hover:opacity-20 transition-opacity italic text-white">
              {item.step}
            </span>

            <div>
              <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full border border-[#FF6B01]/30 text-[#FF6B01] uppercase mb-6">
                {item.readTime}
              </span>

              <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#FF6B01] transition-colors">
                {item.title}
              </h3>

              <p className="text-white/40 text-sm mb-4">
                With{" "}
                <span className="text-white font-bold italic underline decoration-[#FF6B01]">
                  {item.mentor}
                </span>
              </p>

              <p className="text-white/60 text-base leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            </div>

            <span
              className="mt-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest group-hover:gap-4 transition-all"
              style={{ color: COLORS.ORANGE }}
            >
              Read Blueprint <ArrowUpRight size={18} />
            </span>

            {/* Subtle card glow on hover */}
            <div className="absolute inset-0 rounded-[2rem] bg-[#FF6B01]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.a>
        ))}
      </div>

      {/* Ambient background glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF6B01]/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};