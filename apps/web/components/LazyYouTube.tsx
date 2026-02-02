"use client";
import { useState } from "react";

export default function LazyYouTube({ videoId }: { videoId: string }) {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  ) : (
    <div
      onClick={() => setLoaded(true)}
      className="relative cursor-pointer w-full max-w-[560px] aspect-video"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
      />
      <button className="absolute inset-0 m-auto w-16 h-16 text-white bg-orange-600 rounded-full">▶</button>
    </div>
  );
}
