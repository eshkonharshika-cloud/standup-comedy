import { z } from "zod";

/**
 * Generic CMS Media (image / video)
 */
export const CmsMediaContract = z.object({
  url: z.string(),
  contentType: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type CmsMedia = z.infer<typeof CmsMediaContract>;

/**
 * Value Prop Card
 */
export const ArgusValuePropCardContract = z.object({
  id: z.string(),

  title: z.string(),
  subtitle: z.string().optional(),

  media: CmsMediaContract.optional(),

  linkLabel: z.string().optional(),
  linkUrl: z.string().optional(),
});

export type ArgusValuePropCard = z.infer<
  typeof ArgusValuePropCardContract
>;

/**
 * Discover Section
 */
export const ArgusDiscoverSectionContract = z.object({
  id: z.string(),

  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),

  valueProps: z.array(ArgusValuePropCardContract),
});

export type ArgusDiscoverSection = z.infer<
  typeof ArgusDiscoverSectionContract
>;
