"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the heavy client InlineBlogSearch and disable SSR
const InlineBlogSearch = dynamic(() => import("./InlineBlogSearch"), { ssr: false });

export default function BlogSearchClient() {
  return (
    <div className="w-full">
      <InlineBlogSearch />
    </div>
  );
}
