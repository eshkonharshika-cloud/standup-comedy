import {
  FaqSectionAggregateContract,
  FaqSectionAggregate,
} from "@standup/contracts/argus/faq";

export function mapFaqSectionAggregate(
  faqSectionEntry: any,
  statsEntries: any[] = []
): FaqSectionAggregate {
  return FaqSectionAggregateContract.parse({
    title: faqSectionEntry.title,

    faqs:
      faqSectionEntry.faqCollection?.items
        ?.filter(Boolean) // 🔥 REQUIRED for Contentful
        .map((faq: any) => ({
          id: faq.sys.id,
          question: faq.question,
          answer: faq.answer,
        })) ?? [],

    stats:
      statsEntries
        .filter(Boolean)
        .map((stat: any) => ({
          id: stat.sys.id,
          value: stat.value,
          label: stat.label,
        })) ?? [],
  });
}
