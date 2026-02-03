
import { getBentoSection, getComedyBlueprints, getAllComics } from "@standup/cms/bento";
import BentoEditor from "@/components/editor/BentoEditor";

export default async function EditorPage() {
    const bento = await getBentoSection();
    const blueprints = await getComedyBlueprints();
    const comics = await getAllComics();

    // Combine entries for mapping
    const availableEntries = [
        ...blueprints.map(b => ({
            id: b.id,
            title: b.headline,
            label: "Blueprint",
            description: b.teaserText,
            imageUrl: b.featuredImage?.url
        })),
        ...comics.map(c => ({
            id: c.id,
            title: c.name,
            label: "Comic",
            description: c.iconicLine,
            imageUrl: c.image // Comic image is a string URL
        }))
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <BentoEditor initialData={bento} availableEntries={availableEntries} />
        </div>
    );
}
