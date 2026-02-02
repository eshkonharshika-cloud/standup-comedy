"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, Mail, Mic2, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  const COLORS = {
    ORANGE: "#FF6B01",
    WHITE: "#FFFFFF",
    DARK: "#353535",
    BG: "#0a0a0a",
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-24 pb-12 px-6 border-t border-white/5" style={{ backgroundColor: COLORS.BG }}>

      {/* PERSPECTIVE GRID LINE (Matches Hero Section) */}
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-20" style={{ backgroundColor: COLORS.ORANGE }} />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

          {/* COLUMN 1: NAVIGATION & EXPLORATION */}
          <div className="space-y-8">
            <div>
              <p className="text-white font-bold mb-6 uppercase tracking-widest text-xs opacity-50">
                Explore
              </p>

              <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-medium">
                {["Timeline", "Specials", "Live Tours", "Top Comedians", "Search", "The Vault"].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#" aria-label="item"
                      whileHover={{ x: 5, color: COLORS.ORANGE }}
                      className="text-white/70 transition-colors flex items-center gap-1"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 2: CENTERED BRAND IDENTITY */}
          <div className="flex flex-col items-center text-center space-y-6 md:border-x border-white/5 px-8">
            <div className="flex items-center gap-2">
              <Mic2 size={32} color={COLORS.ORANGE} />
              <span className="text-3xl font-black italic tracking-tighter text-white uppercase">
                Standup<span style={{ color: COLORS.ORANGE }}>Hub</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Curating the finest moments in Indian Comedy. From legendary satire to modern-day dark humor.
            </p>
            <div className="flex gap-6">
              {[Instagram, Youtube, Twitter, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#" aria-label="name"
                  whileHover={{ scale: 1.2, color: COLORS.ORANGE }}
                  className="text-white/70 transition-all"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COLUMN 3: GENRES & COLLECTIONS */}
          <div className="md:pl-12">
            <h1 className="text-white font-bold mb-6 uppercase tracking-widest text-xs opacity-50">Genres</h1>
            <div className="flex flex-wrap gap-2">
              {["Observational", "Satire", "Anecdotal", "Dark Humor", "Crowd Work", "Roast", "Sketch"].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold text-white/70 hover:border-[#FF6B01] hover:text-[#FF6B01] transition-all cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
            <p>© {currentYear} StandupHub India.</p>
            <div className="flex gap-6">
              <a href="#" aria-label="Privacy" className="hover:text-white">Privacy</a>
              <a href="#" aria-label="Terms" className="hover:text-white">Terms</a>
              <a href="#" aria-label="Contact" className="hover:text-white">Contact</a>
            </div>
          </div>

          <div className="text-[10px] font-black italic uppercase tracking-tighter text-white/60">
            Made for the <span style={{ color: COLORS.ORANGE }}>Laughs</span>
          </div>
        </div>
      </div>

      {/* AMBIENT GLOW (Fades toward the page center) */}
      <div
        className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-3/4 h-24 blur-[100px] rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: COLORS.ORANGE }}
      />
    </footer>
  );
};

export default Footer;