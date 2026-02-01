// mappers/comic.mapper.ts
import { ComicContract, Comic } from "@standup/contracts/comic";

export function mapComicEntry(entry: any): Comic {
  const mapped = {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    iconicLine: entry.fields.iconicLine,
    achievement: entry.fields.achievement,
    instagramUrl: entry.fields.instagramUrl,
    youtubeUrl: entry.fields.youtubeUrl,

    // ✅ extract URL from Contentful Asset
    image: entry.fields.image?.url ?? "",
  };

  return ComicContract.parse(mapped);
}
