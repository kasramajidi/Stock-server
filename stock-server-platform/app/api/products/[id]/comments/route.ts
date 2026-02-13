import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { commentCreateSchema } from "@/lib/validations/comment";
import { notifyCompanyNewProductComment } from "@/lib/email";

/** شکل خروجی یک کامنت محصول با کاربر و پاسخ‌ها */
function commentToJson(c: {
  id: string;
  content: string;
  status: string;
  adminReply: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; fullName: string };
  replies?: unknown[];
}) {
  return {
    id: c.id,
    content: c.content,
    status: c.status,
    adminReply: c.adminReply,
    parentId: c.parentId,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    user: { id: c.user.id, fullName: c.user.fullName },
    replies: c.replies ?? [],
  };
}

/**
 * GET /api/products/[id]/comments
 * - عمومی: فقط کامنت‌های approved (با پاسخ‌های تو در تو)
 * - ادمین: با approvedOnly=false همه را می‌بیند.
 * - id می‌تواند cuid یا slug محصول باشد.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productIdOrSlug } = await params;
  const { searchParams } = new URL(request.url);
  const approvedOnly = searchParams.get("approvedOnly") !== "false";

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: productIdOrSlug }, { slug: productIdOrSlug }],
      },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json(
        { success: false, errors: ["محصول یافت نشد."] },
        { status: 404 }
      );
    }

    const where: { productId: string; parentId: null; status?: string } = {
      productId: product.id,
      parentId: null,
    };
    if (approvedOnly) where.status = "approved";

    const topLevel = await prisma.productComment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: {
          where: approvedOnly ? { status: "approved" as const } : undefined,
          orderBy: { createdAt: "asc" },
          include: { user: { select: { id: true, fullName: true } } },
        },
      },
    });

    const comments = topLevel.map((c) =>
      commentToJson({
        ...c,
        replies: c.replies.map((r) =>
          commentToJson({ ...r, replies: undefined })
        ),
      })
    );

    return NextResponse.json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (e) {
    console.error("Product comments GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت کامنت‌ها."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products/[id]/comments — ثبت کامنت یا پاسخ (نیاز به لاگین)
 * - id می‌تواند cuid یا slug محصول باشد.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id: productIdOrSlug } = await params;
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: productIdOrSlug }, { slug: productIdOrSlug }],
      },
      select: { id: true, title: true, category: true },
    });
    if (!product) {
      return NextResponse.json(
        { success: false, errors: ["محصول یافت نشد."] },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = commentCreateSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }

    const { content, parentId } = parsed.data;
    if (parentId) {
      const parent = await prisma.productComment.findFirst({
        where: { id: parentId, productId: product.id },
      });
      if (!parent) {
        return NextResponse.json(
          { success: false, errors: ["کامنت والد یافت نشد."] },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { isBanned: true, fullName: true },
    });
    if (user?.isBanned) {
      return NextResponse.json(
        { success: false, errors: ["حساب شما مسدود است."] },
        { status: 403 }
      );
    }

    const comment = await prisma.productComment.create({
      data: {
        productId: product.id,
        userId: auth.userId,
        parentId: parentId ?? undefined,
        content,
        status: "pending",
      },
      include: {
        user: { select: { id: true, fullName: true } },
      },
    });

    await notifyCompanyNewProductComment({
      userFullName: user?.fullName ?? "کاربر",
      productTitle: product.title,
      productCategory: product.category,
      commentContent: content,
      productId: product.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "کامنت ثبت شد و پس از تایید نمایش داده می‌شود.",
        comment: commentToJson({ ...comment, replies: undefined }),
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Product comment POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ثبت کامنت."] },
      { status: 500 }
    );
  }
}
