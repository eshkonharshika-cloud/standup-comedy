import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@standup/cms", "@standup/contracts", "@repo/ui"],
};

export default nextConfig;
