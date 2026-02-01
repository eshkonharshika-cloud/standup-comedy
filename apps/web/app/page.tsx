import React from "react";
import Navbar from "@/components/navbar/navbar";
import { HeroSection } from "@/components/hero/hero";
import { getHero } from "@standup/cms/hero";
import { getQuote } from "@standup/cms/quote";
import { getHistory } from "@standup/cms/history";
import { getAllComics } from "@standup/cms/comic";
import { getHeroSection } from "@standup/cms/herosection";
import HeroBentoSection from "@/components/herosection/herosection";
import { QuoteContract } from "@standup/contracts/quote";
import { HomeClient } from "./HomeClient";
import HistoryTimeline from "@/components/history/HistoryTimelineClient";
import ComedianMarquee from "@/components/comic/comic";
import Footer from "@/components/footer/footer";
import { JourneySection } from "@/components/blog/blog";

export default async function Page() {
  const hero = await getHero();
  const rawQuote = await getQuote();
  const quote = QuoteContract.parse(rawQuote);
  const history = await getHistory();
  const comics = await getAllComics(); // ✅ SERVER fetch
  const heroSection = await getHeroSection(); // server-side hero section data
  const blueprints = await (await import("@standup/cms/blog")).getComedyBlueprints();

  const journeys = blueprints.map((b, i) => ({
    step: String(i + 1),
    title: b.headline,
    mentor: b.comedianName,
    excerpt: b.teaserText,
    readTime: b.category,
    externalUrl: b.externalUrl,
  }));

  return (
    <>
      <Navbar />
      <HeroSection hero={hero} />
      <HistoryTimeline entries={history} />
      <ComedianMarquee comics={comics} /> {/* ✅ pass as prop */}
      <HeroBentoSection hero={heroSection} />
      {/* Blog / Masterclass Section (rendered from CMS) */}
      {/* JourneySection is exported from components/blog/blog.tsx as JourneySection */}
      
      <Footer />
      <HomeClient quote={quote} />

    </>
  );
}
