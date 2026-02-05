
import {
    getBentoSection,
    getArgusHeroSection,
    getFaqSectionAggregate,
    getTestimonial,
    getCapabilitySection,
    getProductReleaseSection,
    getFeatureVideoSection,
    getArgusDiscoverSection
} from "@standup/cms/bento";
import UniversalEditor from "@/components/editor/UniversalEditor";

export default async function EditorPage() {
    // Fetch all sections in parallel
    const [
        bento,
        hero,
        faq,
        testimonial,
        capabilities,
        productReleases,
        featureVideo,
        discover
    ] = await Promise.all([
        getBentoSection(),
        getArgusHeroSection(),
        getFaqSectionAggregate(),
        getTestimonial(),
        getCapabilitySection(),
        getProductReleaseSection(),
        getFeatureVideoSection(),
        getArgusDiscoverSection()
    ]);

    const allData = {
        bento,
        hero,
        faq,
        testimonial,
        capabilities,
        productReleases,
        featureVideo,
        discover
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <UniversalEditor initialAllData={allData} />
        </div>
    );
}
