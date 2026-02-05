import { z } from "zod";

/**
 * CMS ENTRY
 */

export const ProductReleaseSectionEntryContract = z.object({
  eyebrow: z.string(),
  title: z.string(),

  ctaLabel: z.string().nullable().optional(),
  ctaLink: z.string().nullable().optional(),

  releases: z.array(
    z.object({
      sys: z.object({
        id: z.string(),
      }),
      title: z.string(),
      versions: z.string(),
      releaseDate: z.string(),
      link: z.string(),
    })
  ),
});



/**
 * UI SHAPE
 */
export const ProductReleaseSectionContract = z.object({
  eyebrow: z.string(),
  title: z.string(),

  cta: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),

  releases: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      title: z.string(),
      versions: z.string(),
      href: z.string(),
    })
  ),
});


export type ProductReleaseSection = z.infer<
  typeof ProductReleaseSectionContract
>;
