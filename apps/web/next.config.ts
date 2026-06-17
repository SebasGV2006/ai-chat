import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ai-chat/ai-core", "@ai-chat/types", "@ai-chat/ui"],
  experimental: {
    serverComponentsExternalPackages: ["@libsql/client", "bcryptjs"],
  },
};

export default nextConfig;
