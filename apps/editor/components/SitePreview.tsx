"use client";

import React from "react";

export default function SitePreview() {
  return (
    <div className="border border-white/5 rounded-md overflow-hidden">
      <iframe src="/" className="w-full h-[70vh]" title="Site Preview" />
    </div>
  );
}
