import {
  BentoSection,
  BentoSectionContract,
} from "@standup/contracts/argus/bento";

export function mapBentoSectionEntry(entry: any): BentoSection {
  const cards =
    entry.cardsCollection?.items?.map((card: any) => ({
      id: card.sys.id,
      label: card.label,
      title: card.title,
      description: card.description,
      imageUrl: card.image?.url,
      imageAlt: card.image?.title,
      colSpan: card.colSpan,
      rowSpan: card.rowSpan ?? undefined,
      roundedVariant: card.roundedVariant ?? "none",
    })) ?? [];

  const mapped = {
    id: entry.sys.id,
    eyebrow: entry.eyebrow,
    title: entry.title,
    description: entry.description,
    cards,
  };

  return BentoSectionContract.parse(mapped);
}
