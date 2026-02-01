import { z } from "zod";

// Single hero section contract
export const HeroSectionContract = z.object({
  headlineTop: z.string(),
  headlineAccent: z.string(),
  subtext: z.string(),
  ctaSearch: z.string(),
  ctaScroll: z.string(),
  algoliaIndexName: z.string(),
  algoliaSearchKey: z.string(),
  isActive: z.boolean().default(true),
});

export type HeroSection = z.infer<typeof HeroSectionContract>;
