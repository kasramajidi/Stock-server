import { MetadataRoute } from "next";
import { services as currencyServices } from "./(main)/currency-payment/components/servicesData";
import { services as validCardsServices } from "./(main)/valid-cards/components/servicesData";
import { fetchShopProducts } from "./(main)/shop/lib/shop-api";
import { getArticlesFromApi } from "./(main)/news/lib/articles-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/currency-payment`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/valid-cards`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const currencyEntries: MetadataRoute.Sitemap = currencyServices
    .filter((s) => s.href.startsWith("/currency-payment/"))
    .map((s) => ({
      url: `${baseUrl}${s.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const validCardsEntries: MetadataRoute.Sitemap = validCardsServices
    .filter((s) => s.href.startsWith("/valid-cards/"))
    .map((s) => ({
      url: `${baseUrl}${s.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchShopProducts();
    productEntries = products.map((p) => ({
      url: `${baseUrl}/shop/product/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // API ممکن است در زمان بیلد در دسترس نباشد
  }

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticlesFromApi();
    articleEntries = articles.map((a) => ({
      url: `${baseUrl}/news/${encodeURIComponent(a.slug)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // API ممکن است در زمان بیلد در دسترس نباشد
  }

  return [
    ...staticPages,
    ...currencyEntries,
    ...validCardsEntries,
    ...productEntries,
    ...articleEntries,
  ];
}
