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
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

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
