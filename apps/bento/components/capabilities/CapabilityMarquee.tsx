"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CapabilitySection } from "@standup/contracts/argus/capabilities";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CapabilityCard } from "./capabilty";

interface Props {
  data: CapabilitySection;
}

export function CapabilityMarqueeSection({ data }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll(
    mounted && sectionRef.current
      ? { target: sectionRef }
      : {}
  );

  // horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-gradient-to-br from-[#020b2d] to-[#041463] text-white"
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* LEFT — HIGHLIGHT (STATIC) */}
        <div className="w-[40%] min-w-[420px] px-16 py-24 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            {data.highlight.title}
          </h2>

          <p className="text-white/70 leading-relaxed mb-10">
            {data.highlight.description}
          </p>

          {data.highlight.cta && (
            <Link
              href={data.highlight.cta.href}
              className="inline-flex items-center gap-2 font-semibold text-[#5B4BFF]"
            >
              {data.highlight.cta.label}
              <ArrowUpRight size={18} />
            </Link>
          )}
        </div>

        {/* RIGHT — SCROLLING CAPABILITIES */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-8 px-10"
          >
            {data.capabilities.map((capability) => (
              <CapabilityCard key={capability.id} item={capability} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
