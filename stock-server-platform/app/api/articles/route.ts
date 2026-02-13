import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { articleCreateSchema } from "@/lib/validations/article";

/**
 * GET /api/articles
 * - همه مقالات، از جدیدترین به قدیمی‌ترین (بر اساس تاریخ)
 * - Query: search=... جستجو در عنوان (اختیاری)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || undefined;

    const where = search
      ? { title: { contains: search, mode: "insensitive" as const } }
      : undefined;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        image: true,
        title: true,
        publishedAt: true,
        tags: true,
        viewCount: true,
        category: true,
        excerpt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (e) {
    console.error("Articles GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست مقالات."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/articles — ایجاد مقاله (فقط ادمین)
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = articleCreateSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      console.error("[POST /api/articles] Validation failed:", messages, "Raw body keys:", Object.keys(body ?? {}));
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const article = await prisma.article.create({
      data: {
        image: data.image ?? undefined,
        title: data.title,
        publishedAt: data.publishedAt ?? new Date(),
        tags: data.tags ?? [],
        category: data.category,
        content: data.content,
        excerpt: data.excerpt,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "مقاله با موفقیت ایجاد شد.",
        article: {
          id: article.id,
          image: article.image,
          title: article.title,
          publishedAt: article.publishedAt,
          tags: article.tags,
          viewCount: article.viewCount,
          category: article.category,
          excerpt: article.excerpt,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Article POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ایجاد مقاله."] },
      { status: 500 }
    );
  }
}
