"use client";

import React from "react";
import { useForm } from "react-hook-form";
import type { ComponentEntry } from "@/lib/editorStore";
import { useEditorStore } from "@/lib/editorStore";

type Props = {
  entry: ComponentEntry & { type: "historyItem" };
};

export default function HistoryItemEditor({ entry }: Props) {
  const update = useEditorStore((s) => s.updateProps);
  const { register, handleSubmit, reset } = useForm({ defaultValues: entry.props });

  React.useEffect(() => {
    reset(entry.props);
  }, [entry, reset]);

  const onSubmit = (data: any) => update(entry.id, data);

  return (
    <form onBlur={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm">Title</label>
        <input {...register("title")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div>
        <label className="block text-sm">Year</label>
        <input {...register("year")} className="w-full rounded border p-2 bg-white/5" />
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea {...register("description")} className="w-full rounded border p-2 bg-white/5" />
      </div>
    </form>
  );
}
