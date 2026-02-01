"use client";

import React from "react";
import { useForm } from "react-hook-form";
import type { ComponentEntry } from "@/lib/editorStore";
import { useEditorStore } from "@/lib/editorStore";

type Props = {
  entry: ComponentEntry & { type: "blogCard" };
};

export default function BlogCardEditor({ entry }: Props) {
  const update = useEditorStore((s) => s.updateProps);
  const { register, handleSubmit, reset } = useForm({ defaultValues: entry.props });

  React.useEffect(() => {
    reset(entry.props);
  }, [entry, reset]);

  const onSubmit = (data: any) => update(entry.id, data);

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm">Headline</label>
        <input {...register("headline")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div>
        <label className="block text-sm">Excerpt</label>
        <textarea {...register("excerpt")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div className="flex gap-2">
        <div>
          <label className="block text-sm">Comedian</label>
          <input {...register("comedian")} className="rounded border p-2 bg-white/5" />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <input {...register("category")} className="rounded border p-2 bg-white/5" />
        </div>
      </div>
      <div>
        <label className="block text-sm">External URL</label>
        <input {...register("externalUrl")} className="w-full rounded border p-2 bg-white/5" />
      </div>
    </form>
  );
}
