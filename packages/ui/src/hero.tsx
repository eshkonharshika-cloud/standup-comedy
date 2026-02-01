import React from "react";

export type HeroProps = {
  headlineTop: string;
  headlineAccent?: string;
  subtext?: string;
  ctaSearch?: string;
  ctaScroll?: string;
};

export const Hero: React.FC<HeroProps> = ({ headlineTop, headlineAccent, subtext, ctaSearch = "Search", ctaScroll = "Explore" }) => {
  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-black mb-2">
        {headlineTop} <span className="text-[#FF6B01]">{headlineAccent}</span>
      </h2>
      <p className="text-white/80 mb-4">{subtext}</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-[#FF6B01] text-black rounded-md font-bold">{ctaSearch}</button>
        <button className="px-4 py-2 border border-[#FF6B01] text-[#FF6B01] rounded-md">{ctaScroll}</button>
      </div>
    </section>
  );
};

export default Hero;
