import { z } from "zod";

/**
 * Hero Section
 */
export const ArgusHeroSectionContract = z.object({
  id: z.string(),

  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),

  cta: z.object({
    label: z.string(),
    href: z.string().optional(),
  }),

  form: z.object({
    title: z.string(),
    emailPlaceholder: z.string().optional(),
  }),
});

export type ArgusHero = z.infer<typeof ArgusHeroSectionContract>;
