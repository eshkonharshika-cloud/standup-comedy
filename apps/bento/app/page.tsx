import { getBentoSection } from "@standup/cms/bento";
import { BentoSectionContract } from "@standup/contracts/bento";
import BentoPageContent from "@/components/bento/BentoPageContent";

/**
 * Dynamic SEO Metadata
 */
export async function generateMetadata() {
  const rawBento = await getBentoSection();
  const bento = BentoSectionContract.parse(rawBento);

  return {
    title: bento.title,
    description: bento.description,
    openGraph: {
      title: bento.title,
      description: bento.description,
      type: "website",
    },
  };
}

export default async function Page() {
  const rawBento = await getBentoSection();
  const bento = BentoSectionContract.parse(rawBento);

  /**
   * JSON-LD Schema
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: bento.title,
    description: bento.description,
    headline: bento.title,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: bento.cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        description: card.description,
        image: card.imageUrl,
      })),
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <BentoPageContent cmsData={bento} />
    </>
  );
}
