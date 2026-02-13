import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/auth";
import { cartRequestCreateSchema } from "@/lib/validations/cart-request";
import { notifyCompanyNewCartRequest, sendCartRequestConfirmationToUser } from "@/lib/email";

/**
 * POST /api/cart-requests — ثبت درخواست سبد خرید (کاربر لاگین‌شده)
 * Body: { items: [{ productId, quantity }], note? }
 * بعد از ثبت، ایمیل به کارفرما ارسال می‌شود.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { isBanned: true, fullName: true, email: true, mobile: true },
  });
  if (user?.isBanned) {
    return NextResponse.json(
      { success: false, errors: ["حساب شما مسدود است."] },
      { status: 403 }
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

  const parsed = cartRequestCreateSchema.safeParse(body);
  if (!parsed.success) {
    const messages = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean) as string[];
    return NextResponse.json(
      { success: false, errors: messages },
      { status: 400 }
    );
  }

  const { items, note } = parsed.data;

  const productIds = [...new Set(items.map((i) => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, title: true, category: true },
  });
  const foundIds = new Set(products.map((p) => p.id));
  const missing = productIds.filter((id) => !foundIds.has(id));
  if (missing.length > 0) {
    return NextResponse.json(
      { success: false, errors: ["یکی یا چند محصول یافت نشد."] },
      { status: 400 }
    );
  }

  const cartRequest = await prisma.cartRequest.create({
    data: {
      userId: auth.userId,
      note: note ?? undefined,
      status: "pending",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: { select: { id: true, title: true, category: true, priceLabel: true } },
        },
      },
      user: { select: { id: true, fullName: true, mobile: true, email: true } },
    },
  });
  const productTitles = cartRequest.items.map((i) => `${i.product.title} (${i.quantity})`).join("\n");

  await sendCartRequestConfirmationToUser({
    to: user!.email,
    fullName: user!.fullName,
  });

  await notifyCompanyNewCartRequest({
    userFullName: user!.fullName,
    userId: auth.userId,
    userEmail: user!.email,
    userMobile: user!.mobile,
    note: note ?? undefined,
    itemsSummary: productTitles,
    cartRequestId: cartRequest.id,
  });

  return NextResponse.json(
    {
      success: true,
      message: "درخواست سبد خرید ثبت شد. به زودی با شما تماس گرفته می‌شود.",
      cartRequest: {
        id: cartRequest.id,
        status: cartRequest.status,
        note: cartRequest.note,
        createdAt: cartRequest.createdAt,
        items: cartRequest.items.map((i) => ({
          id: i.id,
          productId: i.productId,
          product: i.product,
          quantity: i.quantity,
        })),
        user: cartRequest.user,
      },
    },
    { status: 201 }
  );
}

/**
 * GET /api/cart-requests — کاربر: درخواست‌های خودش؛ ادمین: همه
 */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const isAdmin = await prisma.user
    .findUnique({
      where: { id: auth.userId },
      select: { role: true },
    })
    .then((u) => u?.role === "admin");

  const where = isAdmin ? undefined : { userId: auth.userId };

  const list = await prisma.cartRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
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
    count: list.length,
    cartRequests: list,
  });
}
