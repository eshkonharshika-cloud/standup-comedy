import {
  FeatureHighlightSection,
  FeatureHighlightSectionContract,
} from "@standup/contracts/argus/featurevideo";

export function mapFeatureHighlightSectionEntry(
  entry: any
): FeatureHighlightSection {
  const mapped = {
    id: entry.sys.id,

    eyebrow: entry.eyebrow ?? undefined,
    title: entry.title,
    description: entry.description ?? undefined,

    interactionHint: entry.interactionHint ?? undefined,
  };

  return FeatureHighlightSectionContract.parse(mapped);
}
