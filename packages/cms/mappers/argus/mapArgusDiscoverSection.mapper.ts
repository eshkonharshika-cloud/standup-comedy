import {
  ArgusDiscoverSection,
  ArgusDiscoverSectionContract,
  ArgusValuePropCardContract,
  CmsMediaContract,
} from "@standup/contracts/argus/propcard";

function mapMedia(media: any) {
  if (!media?.url) return undefined;

  return CmsMediaContract.parse({
    url: media.url,
    contentType: media.contentType,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  });
}

function mapArgusValuePropCard(entry: any) {
  const mapped = {
    id: entry.sys.id,

    title: entry.title,
    subtitle: entry.subtitle ?? undefined,

    media: entry.media
      ? mapMedia(entry.media)
      : undefined,

    linkLabel: entry.linkLabel ?? undefined,
    linkUrl: entry.linkUrl ?? undefined,
  };

  return ArgusValuePropCardContract.parse(mapped);
}

export function mapArgusDiscoverSectionEntry(
  entry: any
): ArgusDiscoverSection {
  const mapped = {
    id: entry.sys.id,

    eyebrow: entry.eyebrow ?? undefined,
    title: entry.title,
    description: entry.description ?? undefined,

    valueProps: (entry.valuePropsCollection?.items ?? []).map(
      mapArgusValuePropCard
    ),
  };

  return ArgusDiscoverSectionContract.parse(mapped);
}
