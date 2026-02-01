import { HeroSectionContract } from "@standup/contracts";

export function mapHeroSection(raw: any) {
  return HeroSectionContract.parse({
    headlineTop: raw.headlineTop || "",
    headlineAccent: raw.headlineAccent || "",
    subtext: raw.subtext || "",
    ctaSearch: raw.ctaSearch || "Search",
    ctaScroll: raw.ctaScroll || "Scroll",
    algoliaIndexName: raw.algoliaIndexName || "",
    algoliaSearchKey: raw.algoliaSearchKey || "",
    isActive: raw.isActive ?? true,
  });
}
