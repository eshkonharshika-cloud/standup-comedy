// testimonial.mapper.ts
import {
  Testimonial,
  TestimonialContract,
  TestimonialCmsMediaContract,
} from "@standup/contracts/argus/testimonial";

function mapMedia(asset: any) {
  if (!asset?.url) return undefined;

  return TestimonialCmsMediaContract.parse({
    url: asset.url,
    contentType: asset.contentType,
    width: asset.width ?? undefined,
    height: asset.height ?? undefined,
  });
}

export function mapTestimonialEntry(entry: any): Testimonial {
  const mapped = {
    id: entry.sys.id,

    quote: entry.quote,
    authorName: entry.authorName,

    authorRole: entry.authorRole ?? undefined,
    authorCompany: entry.authorCompany ?? undefined,

    // ✅ DIRECTLY map what GraphQL gives you
    authorAvatar: entry.authorAvatar
      ? mapMedia(entry.authorAvatar)
      : undefined,

    ctaLabel: entry.ctaLabel ?? undefined,
    ctaLink: entry.ctaLink ?? undefined,
  };

  return TestimonialContract.parse(mapped);
}
