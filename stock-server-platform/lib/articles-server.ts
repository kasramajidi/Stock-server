import { prisma } from "@/lib/prisma";
import type { ArticleListItem } from "@/lib/article-types";

function formatArticleDate(publishedAt: Date): string {
  return publishedAt.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function mapArticleToListItem(a: {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  category: string;
  publishedAt: Date;
  viewCount: number;
  _count?: { comments: number };
}): ArticleListItem {
  return {
    id: a.id,
    articleId: a.id,
    title: a.title,
    summary: a.excerpt,
    image: a.image ?? "/Images/Baner/Layer 5.png",
    category: a.category,
    date: formatArticleDate(a.publishedAt),
    comments: a._count?.comments ?? 0,
    readTime: "۵ دقیقه مطالعه",
  };
}

export async function getArticlesForList(): Promise<ArticleListItem[]> {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      excerpt: true,
      image: true,
      category: true,
      publishedAt: true,
      viewCount: true,
      _count: { select: { comments: true } },
    },
  });
  return articles.map(mapArticleToListItem);
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      createdBy: { select: { fullName: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function getArticleIdsForSitemap(): Promise<
  { id: string; updatedAt: Date }[]
> {
  return prisma.article.findMany({
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
}
