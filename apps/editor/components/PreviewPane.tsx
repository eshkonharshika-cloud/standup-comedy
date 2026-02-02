"use client";

import React from "react";
import { useEditorStore, EditorState, ComponentEntry } from "@/lib/editorStore";
import { Hero, BlogCard, HistoryItem } from "@repo/ui";
import HeroEditor from "./editors/HeroEditor";
import BlogCardEditor from "./editors/BlogCardEditor";
import HistoryItemEditor from "./editors/HistoryItemEditor";

export default function PreviewPane() {
  const components = useEditorStore((s: EditorState) => s.components);
  const selectedId = useEditorStore((s: EditorState) => s.selectedId);

  const selected = components.find((c: ComponentEntry) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Preview</h1>
        <div className="text-sm text-white/70">Preview updates as you edit</div>
      </div>

      <div className="space-y-4">
        {components.map((c: ComponentEntry) => (
          <div key={c.id} className="p-4">
            {c.type === "hero" && <Hero {...c.props} />}
            {c.type === "blogCard" && <BlogCard {...c.props} />}
            {c.type === "historyItem" && <HistoryItem {...c.props} />}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {selected ? (
          <div className="bg-black/50 p-4 rounded-md">
            {selected.type === "hero" && <HeroEditor entry={selected} />}
            {selected.type === "blogCard" && <BlogCardEditor entry={selected} />}
            {selected.type === "historyItem" && <HistoryItemEditor entry={selected} />}
          </div>
        ) : (
          <div className="text-white/60">Select a component to edit its props</div>
        )}
      </div>
    </div>
  );
}
