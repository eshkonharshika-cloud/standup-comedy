"use client";

import { useState } from "react";
import Image from "next/image";
import type {
  ArgusDiscoverSection,
  ArgusValuePropCard,
} from "@standup/contracts/argus/propcard";

interface ArgusDiscoverSectionProps {
  data: ArgusDiscoverSection;
}

function MediaBackground({ card }: { card: ArgusValuePropCard }) {
  if (!card.media?.url) return null;

  const src = card.media.url.startsWith("//")
    ? `https:${card.media.url}`
    : card.media.url;

  const isVideo =
    card.media.contentType?.startsWith("video") ?? false;

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={card.title}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover"
      priority={false}
    />
  );
}

export default function ArgusDiscoverSection({
  data,
}: ArgusDiscoverSectionProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  return (
    <section className="bg-[#00051a] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          {data.eyebrow && (
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              {data.eyebrow}
            </span>
          )}

          <h2 className="mb-6 text-6xl font-bold tracking-tight text-white">
            {data.title}
          </h2>

          {data.description && (
            <p className="text-xl leading-relaxed text-neutral-300">
              {data.description}
            </p>
          )}
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {data.valueProps.map((card, index) => {
            const isActive = activeIndex === index;
            const isDimmed =
              activeIndex !== null && !isActive;

            // 60 / 40 alternating layout
            const isEvenRow =
              Math.floor(index / 2) % 2 === 0;
            const isFirstInRow = index % 2 === 0;

            const colSpan = isEvenRow
              ? isFirstInRow
                ? "md:col-span-3"
                : "md:col-span-2"
              : isFirstInRow
                ? "md:col-span-2"
                : "md:col-span-3";

            return (
              <div
                key={card.id}
                onMouseEnter={() =>
                  setActiveIndex(index)
                }
                onMouseLeave={() =>
                  setActiveIndex(null)
                }
                className={`group relative h-[420px] overflow-hidden rounded-3xl transition-all duration-700 ease-in-out ${colSpan} ${isDimmed
                  ? "opacity-40 scale-[0.98]"
                  : "opacity-100 scale-100"
                  }`}
              >
                {/* Media */}
                <div
                  className={`absolute inset-0 transition-transform duration-1000 ease-out ${isActive ? "scale-110" : "scale-100"
                    }`}
                >
                  <MediaBackground card={card} />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#00051a] via-[#00051a]/30 to-transparent p-8">
                  <h2
                    className={`text-3xl font-bold text-white transition-transform duration-500 ${isActive
                      ? "-translate-y-2"
                      : "translate-y-0"
                      }`}
                  >
                    {card.title}
                  </h2>

                  {card.subtitle && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isActive
                        ? "max-h-24 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      <p className="text-lg text-neutral-300">
                        {card.subtitle}
                      </p>
                    </div>
                  )}

                  {card.linkLabel && card.linkUrl && (
                    <a
                      href={card.linkUrl.replace(/\s+/g, '%20')}
                      className="mt-4 inline-flex items-center gap-2 text-green-400 font-semibold"
                    >
                      {card.linkLabel}
                      <span>→</span>
                    </a>
                  )}
                </div>

                {/* Glow */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl border border-white/10 transition-opacity duration-500 ${isActive
                    ? "opacity-100"
                    : "opacity-0"
                    }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
