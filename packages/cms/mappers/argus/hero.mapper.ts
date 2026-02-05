import {
  ArgusHero,
  ArgusHeroSectionContract,
} from "@standup/contracts/argus/hero";

export function mapHeroSectionEntry(entry: any): ArgusHero {
  const mapped = {
    id: entry.sys.id,

    eyebrow: entry.eyebrow,
    title: entry.title,
    description: entry.description,

    cta: {
      label: entry.ctaLabel,
      href: entry.ctaLink ?? undefined,
    },

    form: {
      title: entry.formTitle,
      emailPlaceholder: entry.emailPlaceholder ?? undefined,
    },
  };

  return ArgusHeroSectionContract.parse(mapped);
}
