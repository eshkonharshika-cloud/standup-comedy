import {
  ProductReleaseSectionEntryContract,
  ProductReleaseSectionContract,
} from "@standup/contracts/argus/product_realeses";

export function mapProductReleaseSection(entry: any) {
  const data = ProductReleaseSectionEntryContract.parse({
    ...entry,
    releases: entry.releasesCollection.items,
  });

  return ProductReleaseSectionContract.parse({
    eyebrow: data.eyebrow,
    title: data.title,

    cta:
      data.ctaLabel && data.ctaLink
        ? {
            label: data.ctaLabel,
            href: data.ctaLink,
          }
        : undefined,

    releases: data.releases.map((item) => ({
      id: item.sys.id,
      date: item.releaseDate,
      title: item.title,
      versions: item.versions,
      href: item.link,
    })),
  });
}

