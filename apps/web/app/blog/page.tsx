import BlogSearchClient from "@/components/blog/BlogSearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - MicDropINDIA",
  description: "Search and explore masterclasses and blueprints",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-black mb-6">Blog</h1>
        <p className="mb-8 text-white/90">Explore masterclasses, blueprints, and the best comedy learning resources.</p>
        <div className="bg-black/60 p-6 rounded-lg shadow-lg">
          <BlogSearchClient />
        </div>
      </div>
    </main>
  );
}
