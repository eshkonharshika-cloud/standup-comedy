import {
  CapabilitySectionEntryContract,
  CapabilitySectionContract,
  CapabilitySection,
} from "@standup/contracts/argus/capabilities";

export function mapCapabilitySection(entry: unknown): CapabilitySection {
  // 1️⃣ Validate CMS entry
  const parsed = CapabilitySectionEntryContract.parse(entry);

  // 2️⃣ Map CMS → UI
  const mapped = {
    title: parsed.title,

    highlight: {
      title: parsed.highlightBlock.title,
      description: parsed.highlightBlock.description,
      cta: {
        label: parsed.highlightBlock.ctaLabel,
        href: parsed.highlightBlock.ctaLink,
      },
    },

    capabilities: parsed.capabilitiesCollection.items.map(item => ({
      id: item.sys.id,
      title: item.title,
      description: item.description,
      cta: {
        label: item.linkLabel,
        href: item.linkUrl,
      },
    })),
  };

  // 3️⃣ Validate UI shape
  return CapabilitySectionContract.parse(mapped);
}
