import { z } from "zod";

export const MasterclassItemContract = z.object({
  id: z.string(),
  comedianName: z.string(),
  category: z.string(),
  headline: z.string(),
  teaserText: z.string(),
  externalUrl: z.string().url(),
  featuredImage: z
    .object({
      url: z.string().url(),
      title: z.string().optional(),
    })
    .optional(),
});

export const MasterclassContract = z.array(MasterclassItemContract);

export type MasterclassItem = z.infer<typeof MasterclassItemContract>;
export type Masterclass = z.infer<typeof MasterclassContract>;
