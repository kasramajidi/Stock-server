import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { articleUpdateSchema } from "@/lib/validations/article";

/**
 * GET /api/articles/[id] — دریافت یک مقاله (عمومی). با هر بار بازدید، viewCount یکی اضافه می‌شود.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true, mobile: true, email: true } } },
    });
    if (!article) {
      return NextResponse.json(
        { success: false, errors: ["مقاله یافت نشد."] },
        { status: 404 }
      );
    }

    await prisma.article.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      article: {
        ...article,
        viewCount: article.viewCount + 1,
        createdBy: article.createdBy ?? null,
      },
    });
  } catch (e) {
    console.error("Article GET by id error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت مقاله."] },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/articles/[id] — ویرایش مقاله (فقط ادمین)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, errors: ["مقاله یافت نشد."] },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = articleUpdateSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(data.image !== undefined && { image: data.image }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.publishedAt !== undefined && { publishedAt: data.publishedAt }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "مقاله بروزرسانی شد.",
      article,
    });
  } catch (e) {
    console.error("Article PATCH error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در بروزرسانی مقاله."] },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/articles/[id] — حذف مقاله (فقط ادمین)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, errors: ["مقاله یافت نشد."] },
        { status: 404 }
      );
    }

    await prisma.article.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "مقاله حذف شد.",
    });
  } catch (e) {
    console.error("Article DELETE error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در حذف مقاله."] },
      { status: 500 }
    );
  }
}
