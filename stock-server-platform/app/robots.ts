import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/auth",
          "/api/",
          "/api-docs",
          "/support",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
