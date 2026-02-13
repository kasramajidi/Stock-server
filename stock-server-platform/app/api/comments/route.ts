import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/comments?category=...
 * فقط ادمین. لیست کامنت‌ها؛ اگر category داده شده فقط کامنت‌های مقالات آن دسته.
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim() || undefined;

  try {
    const where = category
      ? { article: { category } }
      : undefined;

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true, mobile: true, email: true } },
        article: { select: { id: true, title: true, category: true } },
        parent: { select: { id: true, content: true } },
      },
    });

    return NextResponse.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (e) {
    console.error("Comments list error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست کامنت‌ها."] },
      { status: 500 }
    );
  }
}
