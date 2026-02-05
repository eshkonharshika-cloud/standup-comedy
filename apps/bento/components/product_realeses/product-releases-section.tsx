"use client";

import Link from "next/link";
import type { ProductReleaseSection } from "@standup/contracts/argus/product_realeses";

interface Props {
  data: ProductReleaseSection;
}

export default function ProductReleasesSection({ data }: Props) {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              {data.eyebrow}
            </span>
            <h2 className="mt-4 text-5xl font-extrabold text-gray-900 tracking-tight">
              {data.title}
            </h2>
          </div>

          {data.cta && (
            <Link
              href={data.cta.href}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {data.cta.label}
              <span aria-hidden className="text-lg">→</span>
            </Link>
          )}
        </div>

        {/* HORIZONTAL TIMELINE */}
        <div className="relative">
          {/* Main Horizontal Line */}
          <div className="absolute top-[7px] left-0 w-full h-px bg-gray-200" aria-hidden="true" />

          {/* Scrollable Container */}
          <div className="relative flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {data.releases.map((release) => (
              <div 
                key={release.id} 
                className="relative flex-none w-[300px] pt-8"
              >
                {/* DOT (Centered on the line) */}
                <span className="absolute top-0 left-0 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-100 z-10" />

                {/* CONTENT */}
                <div className="flex flex-col gap-3">
                  <time className="text-sm font-bold text-blue-600">
                    {release.date}
                  </time>

                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {release.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {release.versions}
                  </p>

                  <Link
                    href={release.href}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    View release
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}