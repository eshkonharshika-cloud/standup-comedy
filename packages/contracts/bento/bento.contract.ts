import { z } from "zod";

/**
 * Bento Card
 */
export const BentoCardContract = z.object({
  id: z.string(),
  label: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  imageAlt: z.string().optional(),
  colSpan: z.number().min(1).max(6),
  rowSpan: z.number().min(1).max(2).optional(),
  roundedVariant: z.enum(["tl", "tr", "bl", "br", "none"]).optional(),
});

/**
 * Bento Grid Section
 */
export const BentoSectionContract = z.object({
  id: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  description: z.string().optional(),
  cards: z.array(BentoCardContract).min(1),
});

export type BentoCard = z.infer<typeof BentoCardContract>;
export type BentoSection = z.infer<typeof BentoSectionContract>;
