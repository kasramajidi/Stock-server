import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin, isAdminRole } from "@/lib/auth";
import { cartRequestUpdateSchema } from "@/lib/validations/cart-request";

/**
 * GET /api/cart-requests/[id] — جزئیات یک درخواست سبد خرید
 * کاربر فقط درخواست خودش؛ ادمین هر درخواستی.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const cartRequest = await prisma.cartRequest.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: { select: { id: true, title: true, slug: true, category: true, brand: true, priceLabel: true } },
        },
      },
      user: { select: { id: true, fullName: true, mobile: true, email: true } },
    },
  });

  if (!cartRequest) {
    return NextResponse.json(
      { success: false, errors: ["درخواست یافت نشد."] },
      { status: 404 }
    );
  }

  const isAdmin = await prisma.user
    .findUnique({
      where: { id: auth.userId },
      select: { role: true },
    })
    .then((u) => isAdminRole(u?.role));

  if (!isAdmin && cartRequest.userId !== auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز."] },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    cartRequest,
  });
}

/**
 * PATCH /api/cart-requests/[id] — بروزرسانی وضعیت یا یادداشت ادمین (فقط ادمین)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const isAdmin = await prisma.user
    .findUnique({
      where: { id: auth.userId },
      select: { role: true },
    })
    .then((u) => isAdminRole(u?.role));

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, errors: ["فقط ادمین می‌تواند درخواست را ویرایش کند."] },
      { status: 403 }
    );
  }

  const { id } = await params;
  const cartRequest = await prisma.cartRequest.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!cartRequest) {
    return NextResponse.json(
      { success: false, errors: ["درخواست یافت نشد."] },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: ["بدنه درخواست نامعتبر است."] },
      { status: 400 }
    );
  }

  const parsed = cartRequestUpdateSchema.safeParse(body);
  if (!parsed.success) {
    const messages = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean) as string[];
    return NextResponse.json(
      { success: false, errors: messages },
      { status: 400 }
    );
  }

  const data: { status?: string; adminNote?: string | null } = {};
  if (parsed.data.status !== undefined) data.status = parsed.data.status;
  if (parsed.data.adminNote !== undefined) data.adminNote = parsed.data.adminNote;

  const updated = await prisma.cartRequest.update({
    where: { id },
    data,
    include: {
      items: {
        include: {
          product: { select: { id: true, title: true, slug: true, category: true, priceLabel: true } },
        },
      },
      user: { select: { id: true, fullName: true, mobile: true, email: true } },
    },
  });

  return NextResponse.json({
    success: true,
    message: "درخواست بروزرسانی شد.",
    cartRequest: updated,
  });
}

/**
 * DELETE /api/cart-requests/[id] — حذف درخواست سبد خرید
 * کاربر فقط درخواست خودش؛ ادمین هر درخواستی.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const cartRequest = await prisma.cartRequest.findUnique({
    where: { id },
    select: { id: true, userId: true },
  });
  if (!cartRequest) {
    return NextResponse.json(
      { success: false, errors: ["درخواست یافت نشد."] },
      { status: 404 }
    );
  }

  const isAdmin = await prisma.user
    .findUnique({
      where: { id: auth.userId },
      select: { role: true },
    })
    .then((u) => isAdminRole(u?.role));
  const isOwner = cartRequest.userId === auth.userId;

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { success: false, errors: ["دسترسی غیرمجاز."] },
      { status: 403 }
    );
  }

  await prisma.cartRequest.delete({ where: { id } });
  return NextResponse.json({
    success: true,
    message: "درخواست حذف شد.",
  });
}
