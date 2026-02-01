import { z } from "zod";

export const QuoteContract = z.object({
  id: z.string(),
  quote: z.string().min(1, "Quote cannot be empty"),
  author: z.string().min(1, "Author cannot be empty"),
});

export type Quote = z.infer<typeof QuoteContract>;
