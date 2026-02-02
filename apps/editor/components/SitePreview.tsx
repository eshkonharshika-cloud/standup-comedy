"use client";

export default function SitePreview() {
  return (
    <div className="border border-white/10 rounded-md overflow-hidden">
      <iframe
        src="/"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-[70vh]"
        title="Site Preview"
      />
    </div>
  );
}
