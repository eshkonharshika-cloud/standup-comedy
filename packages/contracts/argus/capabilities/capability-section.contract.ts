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

/**
 * UI SHAPE
 */
export const CapabilitySectionContract = z.object({
  title: z.string(),

  highlight: z.object({
    title: z.string(),
    description: z.string(),
    cta: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),

  capabilities: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.string(),
      }),
    })
  ),
});

export type CapabilitySection = z.infer<
  typeof CapabilitySectionContract
>;
