import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import { notFound } from "next/navigation";
import { getArticleBySlugFromApi, getRelatedArticlesFromApi } from "../lib/articles-api";
import { HiLocationMarker, HiArrowLeft } from "react-icons/hi";
import { FaTelegram, FaWhatsapp, FaTwitter, FaFacebook } from "react-icons/fa";
import TableOfContents from "./components/TableOfContents";
import RelatedArticlesCarousel from "./components/RelatedArticlesCarousel";
import CommentForm from "./components/CommentForm";
import ArticleViewTracker from "./components/ArticleViewTracker";

const ALLOWED_HTML_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "a", "img", "ul", "ol", "li",
  "table", "thead", "tbody", "tr", "th", "td", "h2", "h3", "h4", "div", "span", "figure", "figcaption",
]);
const ALLOWED_ATTR = new Set(["href", "src", "alt", "title", "class", "target", "rel"]);

/**
 * سانیتایز HTML بدون jsdom برای جلوگیری از خطای ESM در سرور.
 * فقط تگ‌ها و attributeهای مجاز را نگه می‌دارد و بقیه را حذف می‌کند.
 */
function sanitizeArticleHtml(html: string): string {
  let out = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed\b[^>]*>/gi, "");

  out = out.replace(/<(\/?)([a-z][a-z0-9]*)\b([^>]*)>/gi, (_, close: string, tagName: string, attrs: string) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_HTML_TAGS.has(tag)) return "";
    if (close) return `</${tag}>`;
    const allowedAttrs: string[] = [];
    const attrRegex = /([a-z][a-z0-9-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gi;
    let m: RegExpExecArray | null;
    while ((m = attrRegex.exec(attrs)) !== null) {
      const name = m[1].toLowerCase();
      if (!ALLOWED_ATTR.has(name) || name.startsWith("on")) continue;
      const val = (m[2] ?? m[3] ?? m[4] ?? "").trim();
      if (name === "href" || name === "src") {
        if (/^\s*javascript\s*:/i.test(val)) continue;
      }
      const v = val.includes('"') ? `'${val.replace(/'/g, "&#39;")}'` : `"${val.replace(/"/g, "&quot;")}"`;
      allowedAttrs.push(`${name}=${v}`);
    }
    return allowedAttrs.length ? `<${tag} ${allowedAttrs.join(" ")}>` : `<${tag}>`;
  });

  /* پاراگراف‌هایی که فقط لینک تصویر دارند را به تگ img تبدیل کن تا به‌صورت تصویر نمایش داده شوند (نه متن) */
  const onlyImageUrlInTag = /<(p|div|span)\b[^>]*>\s*(https?:\/\/[^\s<>"']+\.(?:jpe?g|png|gif|webp)(?:\?[^<>"']*)?)\s*<\/\1>/gi;
  out = out.replace(onlyImageUrlInTag, (_match, _tagName, url: string) => {
    const escaped = url.replace(/"/g, "&quot;");
    return `<figure class="my-4"><img src="${escaped}" alt="تصویر مقاله" class="w-full max-w-full h-auto rounded-xl object-cover" loading="lazy" /></figure>`;
  });
  /* لینک تصویر که به‌تنهایی بین دو تگ آمده (متن خالص) */
  const bareImageUrl = />\s*(https?:\/\/[^\s<>"']+\.(?:jpe?g|png|gif|webp)(?:\?[^<>"']*)?)\s*</g;
  out = out.replace(bareImageUrl, (_match, url: string) => {
    const escaped = url.replace(/"/g, "&quot;");
    return `><figure class="my-4"><img src="${escaped}" alt="تصویر مقاله" class="w-full max-w-full h-auto rounded-xl object-cover" loading="lazy" /></figure><`;
  });

  return out;
}

const TABLE_ROW_REGEX = /^\|.+\|$/;

function isTableRow(line: string): boolean {
  return TABLE_ROW_REGEX.test(String(line).trim());
}

function parseTableRow(line: string): string[] {
  return String(line)
    .trim()
    .split("|")
    .map((c) => c.trim())
    .filter((_, i, arr) => arr.length <= 1 || (i > 0 && i < arr.length - 1));
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.every((c) => /^[-:\s]+$/.test(c));
}

function renderContentBlock(
  block: string,
  key: string | number,
  baseClass: string,
  imageAlt?: string
): React.ReactNode {
  const trimmed = String(block).trim();
  if (trimmed.startsWith("<") && trimmed.length > 1) {
    return (
      <div
        key={key}
        className={`${baseClass} article-html-content max-w-none text-right`}
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(trimmed) }}
      />
    );
  }
  if (/^(https?:\/\/|data:image\/)/i.test(trimmed)) {
    return (
      <figure key={key} className="my-4">
        <img
          src={trimmed}
          alt={imageAlt ?? "تصویر مقاله"}
          className="w-full max-w-full h-auto rounded-xl object-cover"
        />
      </figure>
    );
  }
  const lines = trimmed.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const allTableRows = lines.length >= 2 && lines.every(isTableRow);
  if (allTableRows) {
    const rows = lines.map(parseTableRow).filter((cells) => cells.length > 0);
    const sepIndex = rows.findIndex((cells) => isSeparatorRow(cells));
    let headerRows = sepIndex >= 0 ? rows.slice(0, sepIndex) : [rows[0]];
    let bodyRows = sepIndex >= 0 ? rows.slice(sepIndex + 1) : rows.slice(1);
    if (bodyRows.length === 0 && headerRows.length === 1) {
      bodyRows = headerRows;
      headerRows = [];
    }
    return (
      <div key={key} className="my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full min-w-[280px] text-right text-[13px] border-collapse">
          {headerRows.length > 0 && (
            <thead>
              {headerRows.map((cells, ri) => (
                <tr key={ri} className="border-b border-gray-200 bg-gray-50">
                  {cells.map((cell, ci) => (
                    <th key={ci} className="px-4 py-3 font-semibold text-gray-800">
                      {cell}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {bodyRows.map((cells, ri) => (
              <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50/50">
                {cells.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-gray-600">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p key={key} className={`${baseClass} whitespace-pre-line`}>
      {block}
    </p>
  );
}

function renderContentBlocks(
  blocks: string[],
  startKey: number,
  baseClass: string,
  imageAlt?: string
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (!block || typeof block !== "string") {
      i++;
      continue;
    }
    const trimmed = String(block).trim();
    if (/^(https?:\/\/|data:image\/)/i.test(trimmed)) {
      nodes.push(renderContentBlock(block, startKey + i, baseClass, imageAlt));
      i++;
      continue;
    }
    if (isTableRow(trimmed)) {
      const rows2: string[][] = [];
      let j = i;
      while (j < blocks.length && isTableRow(String(blocks[j]).trim())) {
        rows2.push(parseTableRow(String(blocks[j]).trim()));
        j++;
      }
      if (rows2.length > 0) {
        const sepIdx = rows2.findIndex((cells) => isSeparatorRow(cells));
        let headerRows = sepIdx >= 0 ? rows2.slice(0, sepIdx) : [rows2[0]];
        let bodyRows = sepIdx >= 0 ? rows2.slice(sepIdx + 1) : rows2.slice(1);
        if (bodyRows.length === 0 && headerRows.length === 1) {
          bodyRows = headerRows;
          headerRows = [];
        }
        nodes.push(
          <div key={startKey + i} className="my-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[280px] text-right text-[13px] border-collapse">
              {headerRows.length > 0 && (
                <thead>
                  {headerRows.map((cells, ri) => (
                    <tr key={ri} className="border-b border-gray-200 bg-gray-50">
                      {cells.map((cell, ci) => (
                        <th key={ci} className="px-4 py-3 font-semibold text-gray-800">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
              )}
              <tbody>
                {bodyRows.map((cells, ri) => (
                  <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50/50">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-gray-600">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i = j;
        continue;
      }
    }
    nodes.push(renderContentBlock(block, startKey + i, baseClass, imageAlt));
    i++;
  }
  return nodes;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugFromApi(slug);

  if (!article) {
    return {
      title: "مقاله یافت نشد",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const articleUrl = `${baseUrl}/news/${encodeURIComponent(article.slug)}`;
  const articleImage = article.image?.startsWith("http")
    ? article.image
    : article.image?.startsWith("/")
      ? `${baseUrl}${article.image}`
      : article.image
        ? `${baseUrl}/${article.image.replace(/^\//, "")}`
        : `${baseUrl}/Images/Shop/product-pic1.jpg`;

  const firstText = article.content?.find((b) => b && !/^(https?:\/\/|data:image\/)/i.test(String(b).trim()));
  const description = (firstText ? String(firstText).substring(0, 160) : "") || article.title;

  return {
    title: article.title,
    description,
    keywords: [article.category, article.title].filter(Boolean),
    alternates: {
      canonical: `/news/${encodeURIComponent(article.slug)}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: articleUrl,
      siteName: "ريتكس",
      locale: "fa_IR",
      images: [
        {
          url: articleImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.date ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [articleImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlugFromApi(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticlesFromApi(slug, 10);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const articleUrl = `${baseUrl}/news/${encodeURIComponent(article.slug)}`;
  const articleImage = article.image?.startsWith("http")
    ? article.image
    : article.image?.startsWith("/")
      ? `${baseUrl}${article.image}`
      : article.image
        ? `${baseUrl}/${article.image.replace(/^\//, "")}`
        : undefined;
  const firstText = article.content?.find((b) => b && !/^(https?:\/\/|data:image\/)/i.test(String(b).trim()));
  const description = (firstText ? String(firstText).substring(0, 160) : "") || article.title;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    image: articleImage,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "ريتكس" },
    publisher: {
      "@type": "Organization",
      name: "ريتكس",
      logo: { "@type": "ImageObject", url: `${baseUrl}/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
  };

  return (
    <>
      <ArticleViewTracker articleId={article.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <section className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="bg-white rounded-xl w-full lg:w-[78%] shadow-cyan-100 p-4 sm:p-6 border border-gray-200" dir="rtl">
            <Image
              src={article.image}
              alt={article.title}
              width={10000}
              height={1000}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-xl object-cover"
              unoptimized={shouldUnoptimizeImage(article.image)}
            />
            
            <h4 className="mt-3 bg-gradient-to-b from-purple-500 to-blue-500 text-[19px] block text-transparent bg-clip-text font-bold">
              {article.title}
            </h4>
            
            <div className="flex items-center justify-between mt-4 mb-6 border-b border-b-gray-200 pb-4">
              <div className="text-gray-300 flex items-center gap-x-3 text-[12px]">
                <div className="flex items-center">
                  <HiLocationMarker className="text-sm" />
                  <span className="inline-block">{article.date}</span>
                </div>
                <div className="flex items-center">
                  <HiArrowLeft className="rotate-180 text-sm" />
                  <span className="inline-block">{article.comments} دیدگاه</span>
                </div>
              </div>
              <div className="text-xs flex items-center gap-1">
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {article.content.slice(0, 1).map((block, index) =>
                renderContentBlock(
                  block,
                  index,
                  "text-gray-500 leading-6 text-justify text-[13px]",
                  article.title
                )
              )}
            </div>

            {article.headings.map((heading, index) => {
              const block = article.content[1 + index];

              return (
                <div key={index} id={`heading-${index}`} className="mt-5">
                  <h3 className="text-[22px] my-5 font-bold">{heading}</h3>
                  {block
                    ? renderContentBlock(
                        block,
                        `h-${index}`,
                        "text-gray-500 leading-6 text-justify text-[13px] mb-3",
                        article.title
                      )
                    : null}
                </div>
              );
            })}

            {article.content.length > 1 + (article.headings?.length ?? 0) &&
              renderContentBlocks(
                article.content.slice(1 + (article.headings?.length ?? 0)),
                1000,
                "mt-3 text-gray-500 leading-6 text-justify text-[13px] mb-3",
                article.title
              )}
          </div>

          <div className="w-full lg:w-[22%]">
            <div className="sticky top-2 space-y-6">
              <TableOfContents headings={article.headings} />
              <RelatedArticlesCarousel articles={relatedArticles} />
            </div>
          </div>
        </section>

        <CommentForm articleId={article.id} initialComments={article.userComments} />
      </div>
    </main>
    </>
  );
}

