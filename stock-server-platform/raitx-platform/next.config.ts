import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: http: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https: http: ws: wss:",
              "frame-src 'self' https://www.openstreetmap.org https://www.google.com https://maps.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "mrpremiumhub.org", pathname: "/**" },
      { protocol: "http", hostname: "mrpremiumhub.org", pathname: "/**" },
      { protocol: "https", hostname: "cms.tehranpayment.com", pathname: "/**" },
      { protocol: "http", hostname: "cms.tehranpayment.com", pathname: "/**" },
      { protocol: "https", hostname: "www.tehranpayment.com", pathname: "/**" },
      { protocol: "http", hostname: "www.tehranpayment.com", pathname: "/**" },
      { protocol: "https", hostname: "tehranpayment.com", pathname: "/**" },
      { protocol: "http", hostname: "tehranpayment.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "http", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
    unoptimized: false,
    loader: "default",
    qualities: [100, 25, 50, 75, 90, 92, 95],
  },
};

export default nextConfig;
