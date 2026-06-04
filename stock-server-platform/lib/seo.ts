const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-server.ir";

export const webSiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "استوک سرور",
  alternateName: "Stock Server",
  url: baseUrl,
  description: "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت",
  inLanguage: "fa-IR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/shop?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function buildArticleJsonLd(article: {
  id: string;
  title: string;
  excerpt: string;
  image?: string | null;
  publishedAt: Date;
  createdByName?: string | null;
}) {
  const url = `${baseUrl}/article/${article.id}`;
  const image = article.image?.startsWith("/")
    ? `${baseUrl}${article.image}`
    : article.image ?? `${baseUrl}/Images/Baner/Layer 5.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image,
    datePublished: article.publishedAt.toISOString(),
    author: article.createdByName
      ? { "@type": "Person", name: article.createdByName }
      : { "@type": "Organization", name: "استوک سرور" },
    publisher: {
      "@type": "Organization",
      name: "استوک سرور",
      logo: { "@type": "ImageObject", url: `${baseUrl}/Images/Baner/Layer 5.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function buildBlogPostJsonLd(post: {
  slug: string;
  title: string;
  summary: string;
  image: string;
  date: string;
}) {
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = post.image.startsWith("/")
    ? `${baseUrl}${post.image}`
    : post.image;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image,
    author: { "@type": "Organization", name: "استوک سرور" },
    publisher: {
      "@type": "Organization",
      name: "استوک سرور",
      logo: { "@type": "ImageObject", url: `${baseUrl}/Images/Baner/Layer 5.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "استوک سرور",
  alternateName: "Stock Server",
  url: baseUrl,
  logo: `${baseUrl}/Images/Baner/Layer 5.png`,
  description: "فروش سرور و تجهیزات شبکه",
  address: { "@type": "PostalAddress", addressCountry: "IR", addressLocality: "تهران" },
  sameAs: ["https://t.me/stock-server", "https://www.linkedin.com/company/stock-server"],
};
