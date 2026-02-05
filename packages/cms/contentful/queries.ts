import { graphql } from "./client";
import { mapQuoteEntry } from "../mappers/quote.mapper";
import { mapHeroEntry } from "../mappers/hero.mapper";
import { mapHistoryEntry } from "../mappers/history.mapper";
import { mapComicEntry } from "../mappers/comic.mapper";
import { mapHeroSection } from "../mappers/herosection.mapper"; // <-- new import for JSON-driven hero
import { mapComedyBlueprintEntry } from "../mappers/blog.mapper";
import { mapBentoSectionEntry } from "../mappers/argus/bento.mapper";
import { mapHeroSectionEntry } from "../mappers/argus/hero.mapper";
import { mapFeatureHighlightSectionEntry } from "../mappers/argus/featureHighlight.mapper";
import { mapArgusDiscoverSectionEntry } from "../mappers/argus/mapArgusDiscoverSection.mapper";
import { mapTestimonialEntry } from "../mappers/argus/testimonial.mapper";
import { mapFaqSectionAggregate } from "../mappers/argus/faq-section.aggregate.mapper";
import { mapCapabilitySection } from "../mappers/argus/capability-section.mapper";
import { mapProductReleaseSection } from "../mappers/argus/product-release-section.mapper";

export async function getProductReleaseSection() {
  const QUERY = `
    query GetProductReleaseSection {
      productReleaseSectionCollection(limit: 1) {
        items {
          eyebrow
          title
          ctaLabel
          ctaLink

          releasesCollection {
            items {
              sys {
                id
              }

              ... on ProductRelease {
                title
                versions
                releaseDate
                link
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql<any>(QUERY);
  const section = data.productReleaseSectionCollection?.items?.[0];

  if (!section) {
    throw new Error("Product Release section not found");
  }

  return mapProductReleaseSection(section);
}



export async function getCapabilitySection() {
  const QUERY = `
    query GetCapabilitySection {
      capabilitySectionCollection(limit: 1) {
  items {
    title
    highlightBlock {
      title
      description
      ctaLabel
      ctaLink
    }
    capabilitiesCollection {
      items {
        sys { id }
        title
        description
        linkLabel
        linkUrl
      }
    }
  }
}


    }
  `;

  const data = await graphql<any>(QUERY);

  const capabilitySection =
    data?.capabilitySectionCollection?.items?.[0];

  if (!capabilitySection) {
    throw new Error("Capability section not found");
  }

  return mapCapabilitySection(capabilitySection);
}


export async function getFaqSectionAggregate() {
 const QUERY = `
  query GetFaqSectionAggregate {
  faqsectionCollection(limit: 1) {
    items {
      title
      faqCollection {
        items {
          sys { id }
          question
          answer
        }
      }
    }
  }

  statsCollection {
    items {
      sys { id }
      value
      label
    }
  }
}

`;

  const data = await graphql<any>(QUERY);

  const faqSection = data.faqsectionCollection?.items?.[0];

  if (!faqSection) {
    throw new Error("FAQ section not found");
  }

  return mapFaqSectionAggregate(
    faqSection,
    data.statsCollection?.items
  );
}


export async function getTestimonial() {
  const QUERY = `
    query GetTestimonial($limit: Int) {
      testimonialCollection(limit: $limit) {
        items {
          sys { id }
          quote
          authorName
          authorRole
          authorCompany
          ctaLabel
          ctaLink
          authorAvatar {
            url
            contentType
            width
            height
          }
        }
      }
    }
  `;

  const data = await graphql<{
    testimonialCollection?: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item = data.testimonialCollection?.items?.[0];

  if (!item) {
    throw new Error("No testimonial found");
  }

  return mapTestimonialEntry(item);
}


export async function getArgusDiscoverSection() {
  const QUERY = `
  query GetArgusDiscoverSection($limit: Int) {
    argusDiscoverSectionCollection(limit: $limit) {
      items {
        sys { id }
        eyebrow
        title
        description

        valuePropsCollection {
          items {
            sys { id }

            ... on ArgusValuePropCard {
              title
              subtitle
              linkLabel
              linkUrl

              media {
                url
                contentType
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;


  const data = await graphql<{
    argusDiscoverSectionCollection?: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item =
    data.argusDiscoverSectionCollection?.items?.[0];

  if (!item) {
    throw new Error("No Argus Discover section found");
  }

  return mapArgusDiscoverSectionEntry(item);
}


export async function getFeatureVideoSection() {
  const QUERY = `
    query GetFeatureVideoSection($limit: Int) {
      featureVideoSectionCollection(limit: $limit) {
        items {
          sys { id }
          eyebrow
          title
          description
          interactionHint
        }
      }
    }
  `;

  const data = await graphql<{
    featureVideoSectionCollection?: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item =
    data.featureVideoSectionCollection?.items?.[0];

  if (!item) {
    throw new Error("No Feature Video section found");
  }

  return mapFeatureHighlightSectionEntry(item);
}

export async function getArgusHeroSection() {
  const QUERY = `
    query GetArgusHeroSection($limit: Int) {
      argusheroCollection(limit: $limit) {
        items {
          sys { id }
          eyebrow
          title
          description
          ctaLabel
          ctaLink
          formTitle
          emailPlaceholder
        }
      }
    }
  `;

  const data = await graphql<{
    argusheroCollection: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item = data.argusheroCollection.items[0];
  if (!item) throw new Error("No Hero section found");

  return mapHeroSectionEntry(item);
}


export async function getBentoSection() {
  const QUERY = `
    query GetBentoSection($limit: Int) {
      bentoSectionCollection(limit: $limit) {
        items {
          sys { id }
          eyebrow
          title
          description
          cardsCollection {
            items {
              sys { id }
              label
              title
              description
              colSpan
              rowSpan
              roundedVariant
              image {
                url
                title
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql<{
    bentoSectionCollection: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item = data.bentoSectionCollection.items[0];
  if (!item) throw new Error("No Bento section found");

  return mapBentoSectionEntry(item);
}


// ---------- Comedy Blueprints ----------
export async function getComedyBlueprints() {
  const QUERY = `
    query GetComedianBlueprints {
      comedianBlueprintCollection {
        items {
          sys {
            id
          }
          comedianName
          articleCategory
          headline
          teaserText
          externalUrl
          featuredImage {
            url
          }
        }
      }
    }
  `;

  const data = await graphql<{
    comedianBlueprintCollection: { items: any[] };
  }>(QUERY);

  if (!data.comedianBlueprintCollection?.items?.length) return [];

  return data.comedianBlueprintCollection.items.map((item) =>
    mapComedyBlueprintEntry({
      sys: { id: item.sys.id },
      fields: item,
    })
  );
}



// ---------- Comics ----------
export async function getAllComics() {
  const QUERY = `
    query GetAllMasters {
      masterCollection {
        items {
          sys { id }
          name
          slug
          iconicLine
          acheivement
          instagramUrl
          youtubeUrl
          image {
            url
            title
          }
        }
      }
    }
  `;

  const data = await graphql<{ masterCollection: { items: any[] } }>(QUERY);

  if (!data.masterCollection.items.length) return [];

  return data.masterCollection.items.map((item) =>
    mapComicEntry({
      sys: { id: item.sys.id },
      fields: {
        name: item.name,
        slug: item.slug,
        iconicLine: item.iconicLine,
        achievement: item.acheivement,
        instagramUrl: item.instagramUrl,
        youtubeUrl: item.youtubeUrl,
        image: item.image,
      },
    })
  );
}

export async function getComicBySlug(slug: string) {
  const QUERY = `
    query GetMasterBySlug($slug: String!) {
      masterCollection(where: { slug: $slug }, limit: 1) {
        items {
          sys { id }
          name
          slug
          iconicLine
          acheivement
          instagramUrl
          youtubeUrl
          image {
            url
            title
          }
        }
      }
    }
  `;

  const data = await graphql<{ masterCollection: { items: any[] } }>(
    QUERY,
    { slug }
  );

  const item = data.masterCollection.items[0];
  if (!item) throw new Error("Comic not found");

  return mapComicEntry({
    sys: { id: item.sys.id },
    fields: {
      name: item.name,
      slug: item.slug,
      iconicLine: item.iconicLine,
      achievement: item.acheivement,
      instagramUrl: item.instagramUrl,
      youtubeUrl: item.youtubeUrl,
      image: item.image,
    },
  });
}

// ---------- History ----------
export async function getHistoryTimeline() {
  const QUERY = `
    query GetHistoryTimeline {
      historyCollection(order: year_ASC) {
        items {
          sys { id }
          year
          title
          description
        }
      }
    }
  `;

  const data = await graphql<{
    historyCollection: { items: any[] };
  }>(QUERY);

  if (!data.historyCollection.items.length) return [];

  return data.historyCollection.items.map((item) =>
    mapHistoryEntry({
      sys: { id: item.sys.id },
      fields: {
        year: item.year,
        title: item.title,
        description: item.description,
      },
    })
  );
}

// ---------- Hero (slides-based) ----------
export async function getHero() {
  const QUERY = `
    query GetHero($limit: Int) {
      heroCollection(limit: $limit, where: { isActive: true }) {
        items {
          sys { id }
          isActive
          autoplay
          slideDuration
          transition
          slidesCollection {
            items {
              sys { id }
              videoUrl
              posterUrl
              comedianId
              quote
              year
            }
          }
        }
      }
    }
  `;

  const data = await graphql<{
    heroCollection: { items: any[] };
  }>(QUERY, { limit: 1 });

  const item = data.heroCollection.items[0];
  if (!item) throw new Error("No active hero entry found");

  return mapHeroEntry({
    sys: { id: item.sys.id },
    fields: {
      isActive: item.isActive,
      autoplay: item.autoplay,
      slideDuration: item.slideDuration,
      transition: item.transition,
      slides: item.slidesCollection?.items ?? [],
    },
  });
}

// ---------- Intro Quote ----------
export async function getIntroQuote() {
  const QUERY = `
    query GetIntroQuote($limit: Int) {
      quoteCollection(limit: $limit) {
        items {
          sys { id }
          quote { json }
          author { json }
        }
      }
    }
  `;

  const data = await graphql<{ quoteCollection: { items: any[] } }>(QUERY, { limit: 1 });

  const item = data?.quoteCollection?.items?.[0];
  if (!item) throw new Error("No quote entry found");

  return mapQuoteEntry({
    sys: { id: item.sys.id },
    fields: { quote: item.quote?.json, author: item.author?.json },
  });
}

// ---------- NEW: Hero Section (JSON-driven like your example) ----------
export async function getHeroSection() {
  const QUERY = `
    query GetHeroSection($limit: Int) {
      herosectionCollection(limit: $limit, where: { isActive: true }) {
        items {
          sys { id }
          headlineTop
          headlineAccent
          subtext
          ctaSearch
          ctaScroll
          algoliaIndexName
          algoliaSearchKey
          isActive
        }
      }
    }
  `;

  const data = await graphql<{ herosectionCollection: { items: any[] } }>(
    QUERY,
    { limit: 1 }
  );

  const item = data.herosectionCollection.items[0];
  if (!item) throw new Error("No active hero section found");

  return mapHeroSection(item);
}

