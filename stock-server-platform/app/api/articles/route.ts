import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { articleCreateSchema } from "@/lib/validations/article";
import { notifyUsersNewArticle } from "@/lib/email";

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
        createdById: true,
        createdBy: { select: { id: true, fullName: true, mobile: true, email: true } },
        createdAt: true,
        updatedAt: true,
        comments: {
          where: { parentId: null },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
            parentId: true,
            adminReply: true,
            user: { select: { id: true, fullName: true } },
            replies: {
              orderBy: { createdAt: "asc" },
              select: {
                id: true,
                content: true,
                status: true,
                createdAt: true,
                adminReply: true,
                user: { select: { id: true, fullName: true } },
              },
            },
          },
        },
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
        createdById: auth.userId,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://stockserver.ir";
    const articleUrl = `${baseUrl.replace(/\/$/, "")}/article/${article.id}`;

    const users = await prisma.user.findMany({
      where: { isBanned: false },
      select: { email: true, fullName: true },
    });

    const sendResults = await Promise.allSettled(
      users.map((u) =>
        notifyUsersNewArticle({
          fullName: u.fullName,
          to: u.email,
          articleTitle: article.title,
          articleExcerpt: article.excerpt,
          articleUrl,
        })
      )
    );
    const failed = sendResults.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value));
    if (failed.length > 0) {
      console.warn("[POST /api/articles] برخی ایمیل‌های اطلاع‌رسانی ارسال نشد:", failed.length, "از", users.length);
    }

    const articleWithCreator = await prisma.article.findUnique({
      where: { id: article.id },
      include: { createdBy: { select: { id: true, fullName: true, mobile: true, email: true } } },
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
          createdById: article.createdById,
          createdBy: articleWithCreator?.createdBy ?? null,
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
