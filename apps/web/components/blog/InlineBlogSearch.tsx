"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Masterclass, MasterclassItem } from "@standup/contracts/blog";

const COLORS = { ORANGE: "#FF6B01", WHITE: "#FFFFFF", DARK: "#121212" };

export default function InlineBlogSearch() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Masterclass>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = entries.filter((e) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      e.headline.toLowerCase().includes(q) ||
      e.comedianName.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 text-left z-20">
      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blueprints by comedian, headline or category..."
          className="w-full px-6 py-3 rounded-2xl bg-[#0f0f0f] border border-white/5 text-white placeholder:text-white/40"
        />
      </div>

      {loading && <div className="text-[#FF6B01] font-bold">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item: MasterclassItem) => (
          <motion.a
            key={item.id}
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="block p-4 rounded-xl bg-[#0f0f0f] border border-white/5 hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              {item.featuredImage && (
                <img
                  src={item.featuredImage.url}
                  alt={item.featuredImage.title ?? item.headline}
                  className="w-24 h-16 object-cover rounded-md"
                />
              )}

              <div>
                <h3 className="text-white font-bold text-lg">{item.headline}</h3>
                <p className="text-white/60 text-sm">{item.teaserText}</p>
                <p className="text-xs text-[#FF6B01] mt-2">By {item.comedianName} · {item.category}</p>
              </div>
            </div>
          </motion.a>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="text-white/60 col-span-full">No blueprints found for “{query}”. Try another term.</div>
        )}
      </div>
    </div>
  );
}
