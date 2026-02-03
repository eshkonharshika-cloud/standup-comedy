import { getBentoSection } from "@standup/cms/bento";
import { BentoSectionContract } from "@standup/contracts/bento";
import BentoPageContent from "@/components/bento/BentoPageContent";

export default async function Page() {
  const rawBento = await getBentoSection();
  const bento = BentoSectionContract.parse(rawBento);

  return <BentoPageContent cmsData={bento} />;
}
