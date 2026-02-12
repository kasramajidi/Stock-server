import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // swagger-ui-react از lifecycleهای قدیمی React استفاده می‌کند و در Strict Mode هشدار می‌دهد
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85, 95],
    unoptimized: false,
    remotePatterns: [],
  },
  output: "standalone",
};

export default nextConfig;
