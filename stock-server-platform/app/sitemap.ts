import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";
import { getArticleIdsForSitemap } from "@/lib/articles-server";
import { getProductsForSitemap } from "@/lib/products-server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([
    getProductsForSitemap().catch(() => []),
    getArticleIdsForSitemap().catch(() => []),
  ]);

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/shop/product/${p.slug || p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/article/${a.id}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const blogSlugEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productEntries, ...articleEntries, ...blogSlugEntries];
}
