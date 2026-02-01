// contracts/comic.ts
import { z } from "zod";

export const ComicContract = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  iconicLine: z.string().min(1),
  achievement: z.string().min(1),
  instagramUrl: z.string().url(),
  youtubeUrl: z.string().url(),
  image: z.string().min(1),
});

export type Comic = z.infer<typeof ComicContract>;
