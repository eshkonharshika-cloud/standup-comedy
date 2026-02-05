// testimonial.contract.ts
import { z } from "zod";

/**
 * Generic CMS Media
 */
export const TestimonialCmsMediaContract = z.object({
  url: z.string(),
  contentType: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type TestimonialCmsMedia = z.infer<typeof TestimonialCmsMediaContract>;

/**
 * Testimonial
 * (Single entry, not a collection abstraction)
 */
export const TestimonialContract = z.object({
  id: z.string(),

  quote: z.string(),

  authorName: z.string(),

  authorRole: z.string().optional(),
  authorCompany: z.string().optional(),

  // Optional avatar (image only for now, but future-proof)
  authorAvatar: TestimonialCmsMediaContract.optional(),

  ctaLabel: z.string().optional(),
  ctaLink: z.string().optional(),
});

export type Testimonial = z.infer<typeof TestimonialContract>;
