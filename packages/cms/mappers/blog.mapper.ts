import { MasterclassItemContract, MasterclassItem, MasterclassContract, Masterclass } from "@standup/contracts";

export function mapComedyBlueprintEntry(entry: any): MasterclassItem {
  const mapped = {
    id: entry.sys.id,
    comedianName: entry.fields.comedianName,
    category: entry.fields.category ?? entry.fields.articleCategory,
    headline: entry.fields.headline,
    teaserText: entry.fields.teaserText,
    externalUrl: entry.fields.externalUrl,
    featuredImage: entry.fields.featuredImage
      ? {
          url: entry.fields.featuredImage.url,
          title: entry.fields.featuredImage.title,
        }
      : undefined,
  };

  return MasterclassItemContract.parse(mapped);
}

export function mapMasterclassEntries(entries: any[]) {
  const mapped = entries.map((item) => mapComedyBlueprintEntry(item));
  return MasterclassContract.parse(mapped);
}
