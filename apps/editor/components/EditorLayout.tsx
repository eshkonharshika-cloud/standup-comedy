"use client";

import React from "react";
import ComponentList from "./ComponentList";
import PreviewPane from "./PreviewPane";
import SitePreview from "./SitePreview";

export default function EditorLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-80 border-r border-white/10 p-4">
        <h3 className="font-bold text-lg mb-4">Components</h3>
        <ComponentList />
      </aside>

      <main className="flex-1 p-6">
        <PreviewPane />
      </main>

      <aside className="w-96 border-l border-white/10 p-4 bg-black/60">
        <h3 className="font-bold text-lg mb-4">Site Preview</h3>
        <SitePreview />
      </aside>
    </div>
  );
}
