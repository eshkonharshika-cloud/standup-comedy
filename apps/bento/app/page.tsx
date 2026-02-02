import { getBentoSection } from "@standup/cms/bento";
import { BentoSectionContract } from "@standup/contracts/bento";
import BentoSection from "@/components/bento/bento";
export default async function Page() {
  const rawBento = await getBentoSection();
  const bento = BentoSectionContract.parse(rawBento);

  return (
    <>
      {/* other sections */}
      <BentoSection data={bento} />
    </>
  );
}
