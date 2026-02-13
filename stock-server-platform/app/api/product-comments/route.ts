import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/product-comments?category=...
 * فقط ادمین. لیست کامنت‌های محصولات. با category فیلتر دسته‌بندی محصول.
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim() || undefined;

  try {
    const where = category ? { product: { category } } : undefined;

    const comments = await prisma.productComment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true, mobile: true, email: true } },
        product: { select: { id: true, title: true, category: true } },
        parent: { select: { id: true, content: true } },
      },
    });

    return NextResponse.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (e) {
    console.error("Product comments list error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست کامنت‌های محصول."] },
      { status: 500 }
    );
  }
}
