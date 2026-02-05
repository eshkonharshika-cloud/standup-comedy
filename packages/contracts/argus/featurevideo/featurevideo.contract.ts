import { z } from "zod";

/**
 * Feature Highlight Section
 * (Audio / video behavior is UI-controlled)
 */
export const FeatureHighlightSectionContract = z.object({
  id: z.string(),

  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),

  interactionHint: z.string().optional(),
});

export type FeatureHighlightSection = z.infer<
  typeof FeatureHighlightSectionContract
>;
