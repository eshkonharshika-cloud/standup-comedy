import { z } from "zod";

export const HeroSlideContract = z.object({
  id: z.string(),
  videoUrl: z.string(),
  posterUrl: z.string().nullable(),
  comedianId: z.string(),
  quote: z.string(),
  year: z.number(), // ✅ FIXED
});

export const HeroContract = z.object({
  id: z.string(),
  isActive: z.boolean(),
  autoplay: z.boolean(),
  slideDuration: z.number(),
  transition: z.string().optional(),
  slides: z.array(HeroSlideContract).min(1),
});

export type Hero = z.infer<typeof HeroContract>;
export type HeroSlide = z.infer<typeof HeroSlideContract>;
