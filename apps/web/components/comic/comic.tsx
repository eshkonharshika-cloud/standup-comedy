"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import type { Comic } from "@standup/contracts/comic";

type ComedianMarqueeProps = {
  comics: Comic[];
};

const ComedianMarquee: React.FC<ComedianMarqueeProps> = ({ comics }) => {
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  // ✅ ensure hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ safe scroll binding
  const { scrollYProgress } = useScroll(
    mounted && targetRef.current ? { target: targetRef } : {}
  );

  // left → right movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  if (!mounted || !comics?.length) return null;

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          transition={{ duration: 1 }}
          className="flex gap-8 px-10"
        >
          {comics.map((comedian) => (
            <ComedianCard key={comedian.slug} item={comedian} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

type ComedianCardProps = {
  item: Comic;
};

const ComedianCard: React.FC<ComedianCardProps> = ({ item }) => (
  <div className="relative flex-shrink-0 w-[350px] h-[450px] bg-[#111] rounded-[40px] p-8 border border-white/10 flex flex-col justify-between overflow-hidden group">
    {/* glow */}
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF6B01]/10 blur-[100px] group-hover:bg-[#FF6B01]/20 transition-all" />

    <div className="z-10">
      <h3 className="text-xl font-bold text-white mb-2 uppercase">
        {item.name}
      </h3>
      <p className="text-[#FF6B01] font-mono text-sm font-bold bg-[#FF6B01]/10 px-3 py-1 rounded-full inline-block">
        “{item.iconicLine}”
      </p>
    </div>

    <div className="z-10 space-y-4">
      <div className="border-t border-white/20 pt-4">
        <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">
          Top Achievement
        </p>
        <p className="text-base text-white leading-snug">
          {item.achievement}
        </p>

        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mt-4" />
      </div>

      <div className="flex gap-3">
        <a
          href={item.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm bg-white text-black font-semibold rounded-full
                 hover:bg-[#FF6B01] hover:text-white transition"
        >
          Instagram
        </a>

        <a
          href={item.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm border border-white/20 text-white
                 font-semibold rounded-full hover:bg-white/10 transition"
        >
          YouTube
        </a>
      </div>
    </div>

  </div>
);

export default ComedianMarquee;
