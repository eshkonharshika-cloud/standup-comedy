import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@standup/cms", "@standup/contracts", "@repo/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
