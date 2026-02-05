import { z } from "zod";

export const FaqSectionAggregateContract = z.object({
  title: z.string(),

  faqs: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
    })
  ),

  stats: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type FaqSectionAggregate = z.infer<
  typeof FaqSectionAggregateContract
>;
