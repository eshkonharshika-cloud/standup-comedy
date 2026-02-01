import React from "react";

export type BlogCardProps = {
  headline: string;
  excerpt?: string;
  comedian?: string;
  category?: string;
  featuredImage?: { url: string; alt?: string };
  externalUrl?: string;
};

export const BlogCard: React.FC<BlogCardProps> = ({ headline, excerpt, comedian, category, featuredImage, externalUrl }) => {
  return (
    <article className="bg-black/70 p-4 rounded-lg shadow-md flex gap-4 items-start">
      {featuredImage && (
        // Keep simple img; editor tests will mock image behaviour. In production we prefer next/image.
        // Editor will render using same component but the web app can switch to next/image.
        <img src={featuredImage.url} alt={featuredImage.alt ?? headline} className="w-28 h-20 object-cover rounded-md" />
      )}
      <div className="flex-1">
        <h3 className="text-xl font-bold">{headline}</h3>
        {excerpt && <p className="text-white/70 mt-2">{excerpt}</p>}
        <div className="mt-3 text-sm text-white/60">
          {comedian && <span>By {comedian}</span>}
          {category && <span className="ml-2">· {category}</span>}
          {externalUrl && (
            <a className="ml-3 text-[#FF6B01] font-semibold" href={externalUrl} target="_blank" rel="noreferrer">
              Read
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
