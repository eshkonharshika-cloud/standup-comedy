"use client";

import React from "react";
import { useForm } from "react-hook-form";
import type { ComponentEntry } from "@/lib/editorStore";
import { useEditorStore } from "@/lib/editorStore";

type Props = {
  entry: ComponentEntry & { type: "hero" };
};

export default function HeroEditor({ entry }: Props) {
  const update = useEditorStore((s) => s.updateProps);
  const { register, handleSubmit, reset } = useForm({ defaultValues: entry.props });

  React.useEffect(() => {
    reset(entry.props);
  }, [entry, reset]);

  const onSubmit = (data: any) => {
    update(entry.id, data);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm">Headline Top</label>
        <input {...register("headlineTop")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div>
        <label className="block text-sm">Headline Accent</label>
        <input {...register("headlineAccent")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div>
        <label className="block text-sm">Subtext</label>
        <textarea {...register("subtext")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div className="flex gap-2">
        <div>
          <label className="block text-sm">CTA Search</label>
          <input {...register("ctaSearch")} className="rounded border p-2 bg-white/5" />
        </div>
        <div>
          <label className="block text-sm">CTA Scroll</label>
          <input {...register("ctaScroll")} className="rounded border p-2 bg-white/5" />
        </div>
      </div>
    </form>
  );
}
