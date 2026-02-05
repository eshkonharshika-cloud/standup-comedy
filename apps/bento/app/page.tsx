import { getBentoSection } from "@standup/cms/bento";
import { BentoSectionContract } from "@standup/contracts/argus/bento";
import BentoPageContent from "@/components/bento/BentoPageContent";
import { getArgusHeroSection } from "@standup/cms/bento";
import { ArgusHeroSectionContract } from "@standup/contracts/argus/hero";
import HeroSection from "@/components/hero/hero";
import TopNavbar from "@/components/navbar/navbar";
import SubNavbar from "@/components/navbar/subnavbar";
import FeatureHighlightSection from "@/components/featurevideo/FeatureHighlightSection";
import { FeatureHighlightSectionContract } from "@standup/contracts/argus/featurevideo";
import { getFeatureVideoSection } from "@standup/cms/bento";
import { getArgusDiscoverSection } from "@standup/cms/bento";
import { ArgusDiscoverSectionContract } from "@standup/contracts/argus/propcard";
import ArgusDiscoverSection from "@/components/discover/ArgusDiscoverSection";
import TestimonialSection from "@/components/testimonial/testimonial";
import { getTestimonial } from "@standup/cms/bento";
import { TestimonialContract } from "@standup/contracts/argus/testimonial";
import FaqStatsSection from "@/components/faq-section/faq-section";
import { getFaqSectionAggregate } from "@standup/cms/bento";
import { FaqSectionAggregateContract } from "@standup/contracts/argus/faq";
import { getCapabilitySection } from "@standup/cms/bento";
import { CapabilitySectionContract } from "@standup/contracts/argus/capabilities";
import { CapabilityMarqueeSection } from "@/components/capabilities/CapabilityMarquee";
import { getProductReleaseSection } from "@standup/cms/bento";
import { ProductReleaseSectionContract } from "@standup/contracts/argus/product_realeses";
import ProductReleasesSection from "@/components/product_realeses/product-releases-section";
import Footer from "@/components/footer/footer";

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
  const rawHero = await getArgusHeroSection();
  const hero = ArgusHeroSectionContract.parse(rawHero);
  const rawFeatureHighlight = await getFeatureVideoSection();
  const featureHighlight = FeatureHighlightSectionContract.parse(rawFeatureHighlight);
  const rawDiscover = await getArgusDiscoverSection();
  const discover = ArgusDiscoverSectionContract.parse(rawDiscover);
  const rawTestimonial = await getTestimonial();
  const testimonial = TestimonialContract.parse(rawTestimonial);
  const rawFaq = await getFaqSectionAggregate();
  const faq = FaqSectionAggregateContract.parse(rawFaq);
  const rawCapability = await getCapabilitySection();
  const capability = CapabilitySectionContract.parse(rawCapability);
  const rawProductRelease = await getProductReleaseSection();
  const productRelease = ProductReleaseSectionContract.parse(rawProductRelease);

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
      <TopNavbar />
      <div id="hero">
        <HeroSection hero={hero} />
      </div>
      <SubNavbar />
      <main className="bg-white">
        <div id="bento">
          <BentoPageContent cmsData={bento} />
        </div>
        <div id="feature-video">
          <FeatureHighlightSection section={featureHighlight} />
        </div>
        <div id="discover">
          <ArgusDiscoverSection data={discover} />
        </div>
        <div id="testimonials">
          <TestimonialSection data={testimonial} />
        </div>
        <div id="faq">
          <FaqStatsSection data={faq} />
        </div>
        <div id="capabilities">
          <CapabilityMarqueeSection data={capability} />
        </div>
        <div id="releases">
          <ProductReleasesSection data={productRelease} />
        </div>
        <Footer />
      </main>

    </>
  );
}
