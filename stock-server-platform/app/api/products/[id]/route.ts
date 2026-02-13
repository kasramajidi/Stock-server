import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productUpdateSchema } from "@/lib/validations/product";

/**
 * GET /api/products/[id] — دریافت یک محصول با id، slug یا title (عنوان دقیق). با هر بار فراخوانی viewCount یکی اضافه می‌شود.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }, { title: id }],
      },
      include: {
        createdBy: {
          select: { id: true, fullName: true, mobile: true, email: true },
        },
      },
    });
    if (!product) {
      return NextResponse.json(
        { success: false, errors: ["محصول یافت نشد."] },
        { status: 404 }
      );
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        viewCount: product.viewCount + 1,
        createdBy: product.createdBy ?? null,
      },
    });
  } catch (e) {
    console.error("Product GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت محصول."] },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/products/[id] — ویرایش محصول (فقط ادمین). id فقط cuid است (نه slug).
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const existing = await prisma.product.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, errors: ["محصول یافت نشد."] },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);
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
    if (data.slug !== undefined && data.slug !== existing.slug) {
      const slugTaken = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (slugTaken) {
        return NextResponse.json(
          { success: false, errors: ["این slug قبلاً استفاده شده است."] },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.brand !== undefined && { brand: data.brand }),
        ...(data.partNumbers !== undefined && { partNumbers: data.partNumbers }),
        ...(data.priceLabel !== undefined && { priceLabel: data.priceLabel }),
        ...(data.inStock !== undefined && { inStock: data.inStock }),
        ...(data.statusLabel !== undefined && { statusLabel: data.statusLabel }),
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.specs !== undefined && { specs: data.specs as object }),
      },
      include: { createdBy: { select: { id: true, fullName: true, mobile: true, email: true } } },
    });

    return NextResponse.json({
      success: true,
      message: "محصول بروزرسانی شد.",
      product: { ...product, createdBy: product.createdBy ?? null },
    });
  } catch (e) {
    console.error("Product PATCH error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در بروزرسانی محصول."] },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id] — حذف محصول (فقط ادمین)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const existing = await prisma.product.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, errors: ["محصول یافت نشد."] },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "محصول حذف شد.",
    });
  } catch (e) {
    console.error("Product DELETE error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در حذف محصول."] },
      { status: 500 }
    );
  }
}
