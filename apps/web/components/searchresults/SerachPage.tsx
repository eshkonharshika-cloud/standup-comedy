"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { comediansIndex } from "@/lib/algolia";
import { ThumbsUp, Eye, MessageSquare } from "lucide-react";

const COLORS = {
  ORANGE: "#FF6B01",
  WHITE: "#FFFFFF",
  DARK_CARD: "#121212",
};

interface Comedian {
  objectID: string; // YouTube Video ID
  video_title: string;
  channel_name: string;
  view_count: number;
  like_count: number;
  comment_count?: number; // Added if your index supports it
  publishedAt: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Comedian[]>([]);
  const [loading, setLoading] = useState(false);

  // Floating Orbs Logic remains same...
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

  useEffect(() => {
    if (!query) { requestAnimationFrame(() => setResults([])); return; }
    requestAnimationFrame(() => setLoading(true));
    const timeout = setTimeout(() => {
      comediansIndex.search(query).then((res) => {
        const r = res as { hits?: unknown[] };
        const hits = (r.hits ?? []) as unknown[];
        setResults(hits.map((h) => h as Comedian));
      }).finally(() => requestAnimationFrame(() => setLoading(false)));
    }, 150);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center pt-20 pb-20 px-4">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
              filter: "blur(6px)",
            }}
            animate={{ y: [0, -60, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: orb.duration, repeat: Infinity, delay: orb.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">
          Search <span style={{ color: COLORS.ORANGE }}>Specials</span>
        </h1>

        <input
          type="text"
          placeholder="Search by comedian or joke..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-2xl px-8 py-4 rounded-2xl border-2 border-[#FF6B01]/30 bg-[#161616] text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF6B01] transition-all shadow-2xl mb-12"
        />

        {loading && <div className="text-[#FF6B01] animate-pulse font-bold">TUNING THE MIC...</div>}

        {/* HORIZONTAL RESULTS LIST */}
        <div className="flex flex-col gap-8 w-full">
          {results.map((result, i) => (
            <motion.div
              key={result.objectID}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              /* REDUCED GAP AND MARGINS */
              className="flex flex-col lg:flex-row bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FF6B01]/50 transition-all group shadow-xl mb-4"
            >
              {/* VIDEO SECTION: Decreased width from 450px to 320px to shrink total height */}
              <div className="w-full lg:w-[320px] aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${result.objectID}?rel=0&modestbranding=1`}
                  title={result.video_title}
                  frameBorder="0"
                  allowFullScreen
                  className="group-hover:opacity-90 transition-opacity"
                ></iframe>
              </div>

              {/* CONTENT SECTION: Decreased padding from p-8 to p-5 */}
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight uppercase italic group-hover:text-[#FF6B01] transition-colors line-clamp-1">
                    {result.video_title}
                  </h2>

                  <p className="text-[#FF6B01] font-bold text-sm mt-1 flex items-center gap-2">
                    {result.channel_name}
                  </p>

                  {/* STATS STRIP: Made icons and text smaller (text-xs) */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <Eye size={14} color={COLORS.ORANGE} />
                      <span>{result.view_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <ThumbsUp size={14} color={COLORS.ORANGE} />
                      <span>{result.like_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <MessageSquare size={14} color={COLORS.ORANGE} />
                      <span>{result.comment_count?.toLocaleString() || "0"}</span>
                    </div>
                  </div>
                </div>

                {/* QUICK LINK: Moved closer to content */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${result.objectID}`)}
                    className="text-[9px] tracking-widest font-bold text-white/30 uppercase hover:text-[#FF6B01] transition-colors"
                  >
                    View Source →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;