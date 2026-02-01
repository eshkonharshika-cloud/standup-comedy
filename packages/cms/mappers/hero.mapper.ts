import { HeroContract, Hero } from "@standup/contracts/hero";

export function mapHeroEntry(entry: any): Hero {
  const slides = entry.fields.slides.map((slide: any) => ({
    id: slide.sys.id,
    videoUrl: slide.videoUrl,
    posterUrl: slide.posterUrl ?? null,
    comedianId: slide.comedianId,
    quote: slide.quote,
    year: slide.year,
  }));

  const mapped = {
    id: entry.sys.id,
    isActive: entry.fields.isActive,
    autoplay: entry.fields.autoplay,
    slideDuration: entry.fields.slideDuration,
    transition: entry.fields.transition,
    slides,
  };

  return HeroContract.parse(mapped);
}
