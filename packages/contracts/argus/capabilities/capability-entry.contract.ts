import { z } from "zod";

/**
 * CMS ENTRY SHAPE
 */
export const CapabilitySectionEntryContract = z.object({
  title: z.string(),

  highlightBlock: z.object({
    title: z.string(),
    description: z.string(),
    ctaLabel: z.string(),
    ctaLink: z.string(),
  }),

  capabilitiesCollection: z.object({
    items: z.array(
      z.object({
        sys: z.object({
          id: z.string(),
        }),
        title: z.string(),
        description: z.string(),
        linkLabel: z.string(),
        linkUrl: z.string(),
      })
    ),
  }),
});

export type CapabilitySectionEntry = z.infer<
  typeof CapabilitySectionEntryContract
>;
