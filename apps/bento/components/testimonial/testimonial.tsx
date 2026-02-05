"use client";

import Image from "next/image";
import type { Testimonial } from "@standup/contracts/argus/testimonial";

interface TestimonialSectionProps {
  data: Testimonial;
}

export default function TestimonialSection({
  data,
}: TestimonialSectionProps) {
  const avatarSrc =
    data.authorAvatar?.url &&
    (data.authorAvatar.url.startsWith("//")
      ? `https:${data.authorAvatar.url}`
      : data.authorAvatar.url);

  return (
    <section className="bg-gradient-to-br from-[#020b2d] to-[#041463]py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-7xl text-center font-bold text-white">Testimonial</h2>
        <div className="grid items-center gap-12 rounded-3xl bg-[#020b2d] p-10 md:grid-cols-2 md:p-16">
          {/* Left: Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={data.authorName}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/40">
                No image
              </div>
            )}
          </div>

          {/* Right: Quote */}
          <figure className="relative">
            {/* Decorative Quotes */}
            <svg
              viewBox="0 0 120 96"
              aria-hidden="true"
              className="absolute -top-10 -left-6 h-20 stroke-white/10"
              fill="none"
            >
              <path
                d="M45 10C30 30 25 55 25 80h30c0-20 5-35 15-45V10zM90 10C75 30 70 55 70 80h30c0-20 5-35 15-45V10z"
                strokeWidth="2"
              />
            </svg>

            {/* Quote Text */}
            <blockquote className="relative z-10 text-xl font-semibold leading-relaxed text-white md:text-2xl">
              “{data.quote}”
            </blockquote>

            {/* Author */}
            <figcaption className="mt-8">
              <div className="font-semibold text-white">
                {data.authorName}
              </div>

              {(data.authorRole || data.authorCompany) && (
                <div className="mt-1 text-sm text-white/80">
                  {data.authorRole}
                  {data.authorRole &&
                    data.authorCompany &&
                    " · "}
                  {data.authorCompany}
                </div>
              )}

              {data.ctaLabel && data.ctaLink && (
                <a
                  href={data.ctaLink}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-400 hover:underline"
                >
                  {data.ctaLabel}
                  <span aria-hidden>→</span>
                </a>
              )}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
