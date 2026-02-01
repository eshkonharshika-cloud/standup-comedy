"use client";

import React from "react";
import { useEditorStore, ComponentEntry, EditorState } from "@/lib/editorStore";

export default function ComponentList() {
  const components = useEditorStore((s: EditorState) => s.components);
  const add = useEditorStore((s: EditorState) => s.addComponent);
  const remove = useEditorStore((s: EditorState) => s.removeComponent);
  const select = useEditorStore((s: EditorState) => s.selectComponent);
  const selectedId = useEditorStore((s: EditorState) => s.selectedId);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 mb-2">
        <button className="px-3 py-1 rounded bg-[#FF6B01] text-black" onClick={() => add("hero")}>Add Hero</button>
        <button className="px-3 py-1 rounded bg-[#FF6B01] text-black" onClick={() => add("blogCard")}>Add Blog</button>
        <button className="px-3 py-1 rounded bg-[#FF6B01] text-black" onClick={() => add("historyItem")}>Add History</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 rounded border border-white/10 text-white/90"
          onClick={async () => {
            const data = useEditorStore.getState().components;
            await fetch('/api/preview', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
            alert('Saved');
          }}
        >
          Save
        </button>
        <button
          className="px-3 py-1 rounded border border-white/10 text-white/90"
          onClick={async () => {
            const res = await fetch('/api/preview');
            const json = await res.json();
            if (json?.data) {
              useEditorStore.getState().setComponents(json.data);
              alert('Loaded');
            } else {
              alert('Nothing saved');
            }
          }}
        >
          Load
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {components.map((c: ComponentEntry) => (
          <div key={c.id} className={`p-3 rounded border ${selectedId === c.id ? "border-[#FF6B01]" : "border-white/5"}`}>
            <div className="flex items-center justify-between">
              <div className="font-semibold">{c.type}</div>
              <div className="flex gap-2">
                <button className="text-sm text-white/60" onClick={() => select(c.id)}>Edit</button>
                <button className="text-sm text-white/60" onClick={() => remove(c.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
