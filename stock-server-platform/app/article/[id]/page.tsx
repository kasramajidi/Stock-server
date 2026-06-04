import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/Article/ArticleView";
import { getArticleById } from "@/lib/articles-server";
import { buildArticleJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) {
    return { title: "مقاله یافت نشد", robots: { index: false, follow: false } };
  }

  const description =
    article.excerpt?.slice(0, 160) ||
    article.title;

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      url: `/article/${id}`,
      images: article.image ? [{ url: article.image, alt: article.title }] : undefined,
    },
    alternates: { canonical: `/article/${id}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const viewData = {
    id: article.id,
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    category: article.category,
    image: article.image,
    viewCount: article.viewCount,
    publishedAt: article.publishedAt.toISOString(),
    tags: article.tags,
    createdBy: article.createdBy,
  };

  const jsonLd = buildArticleJsonLd({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    publishedAt: article.publishedAt,
    createdByName: article.createdBy?.fullName,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView article={viewData} />
    </>
  );
}
