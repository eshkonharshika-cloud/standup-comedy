"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { FeatureHighlightSection } from "@standup/contracts/argus/featurevideo";

interface FeatureHighlightProps {
  section: FeatureHighlightSection;
}

export default function FeatureHighlightSection({
  section,
}: FeatureHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px",
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isInView && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => { });
    }
  }, [isInView]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current.volume = expanded ? 0.6 : 0;
  }, [expanded]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] w-full overflow-hidden bg-white flex items-center"
    >
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Light overlay for readability */}
        <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[2px]" />

        {expanded ? (
          <iframe
            className="w-full h-full scale-[1.5]"
            src="https://www.youtube.com/embed/KcuIflXVR_s?autoplay=1&mute=0&controls=0&loop=1&playlist=KcuIflXVR_s"
            title="Feature Experience Highlight Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#f4f7ff] to-[#e8ecff] flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="h-1 w-64 bg-green-500 blur-xl"
            />
          </div>
        )}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-20 mx-auto max-w-7xl w-full px-6 py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {section.eyebrow && (
              <span className="block text-green-600 text-xl font-bold tracking-[0.25em] uppercase mb-6">
                {section.eyebrow}
              </span>
            )}

            <h2 className="text-gray-900 text-5xl md:text-5xl font-bold leading-tight mb-2">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-gray-600 text-2xl max-w-lg mb-12 leading-relaxed">
                {section.description}
              </p>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full
                         bg-black/5 hover:bg-black/10 backdrop-blur-md
                         border border-black/10 text-gray-900 font-semibold
                         transition-all group"
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 ${!expanded && "animate-ping"
                    }`}
                />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>

              {expanded
                ? "Pause Experience"
                : section.interactionHint ?? "Launch Experience"}
            </button>
          </motion.div>
        </div>
      </div>

      <audio ref={audioRef} src="/audio/ambient-feature.mp3" loop muted />
    </section>
  );
}
