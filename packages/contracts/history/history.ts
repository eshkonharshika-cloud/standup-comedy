import { z } from "zod";

export const HistoryContract = z.object({
  id: z.string(),
  year: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type History = z.infer<typeof HistoryContract>;
