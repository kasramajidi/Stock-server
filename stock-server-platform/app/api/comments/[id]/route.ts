import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin, isAdminRole } from "@/lib/auth";
import { commentUpdateSchema, commentReviewSchema } from "@/lib/validations/comment";

/**
 * GET /api/comments/[id] — دریافت یک کامنت (ادمین یا صاحب کامنت)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, mobile: true } },
        article: { select: { id: true, title: true, category: true } },
        parent: { select: { id: true, content: true } },
        replies: {
          include: { user: { select: { id: true, fullName: true } } },
        },
      },
    });
    if (!comment) {
      return NextResponse.json(
        { success: false, errors: ["کامنت یافت نشد."] },
        { status: 404 }
      );
    }
    const isAdmin = await prisma.user
      .findUnique({ where: { id: auth.userId }, select: { role: true } })
      .then((u) => isAdminRole(u?.role));
    const isOwner = comment.userId === auth.userId;
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, errors: ["دسترسی غیرمجاز."] },
        { status: 403 }
      );
    }
    return NextResponse.json({ success: true, comment });
  } catch (e) {
    console.error("Comment GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت کامنت."] },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/comments/[id]
 * - کاربر صاحب کامنت: فقط ویرایش content
 * - ادمین: ویرایش content یا تایید/رد و پاسخ (status + adminReply)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!comment) {
      return NextResponse.json(
        { success: false, errors: ["کامنت یافت نشد."] },
        { status: 404 }
      );
    }

    const isAdmin = await prisma.user
      .findUnique({
        where: { id: auth.userId },
        select: { role: true },
      })
      .then((u) => isAdminRole(u?.role));

    const body = await request.json();

    if (isAdmin && (body.status !== undefined || body.adminReply !== undefined)) {
      const parsed = commentReviewSchema.safeParse(body);
      if (!parsed.success) {
        const messages = Object.values(parsed.error.flatten().fieldErrors)
          .flat()
          .filter(Boolean) as string[];
        return NextResponse.json(
          { success: false, errors: messages },
          { status: 400 }
        );
      }
      const { status, adminReply } = parsed.data;
      const updated = await prisma.comment.update({
        where: { id },
        data: { status, adminReply: adminReply ?? undefined },
        include: {
          user: { select: { id: true, fullName: true } },
          article: { select: { id: true, title: true } },
        },
      });
      return NextResponse.json({
        success: true,
        message: "وضعیت کامنت بروزرسانی شد.",
        comment: updated,
      });
    }

    if (comment.userId !== auth.userId && !isAdmin) {
      return NextResponse.json(
        { success: false, errors: ["دسترسی غیرمجاز."] },
        { status: 403 }
      );
    }

    const parsed = commentUpdateSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { content: parsed.data.content },
      include: {
        user: { select: { id: true, fullName: true } },
        article: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({
      success: true,
      message: "کامنت ویرایش شد.",
      comment: updated,
    });
  } catch (e) {
    console.error("Comment PATCH error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در بروزرسانی کامنت."] },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/comments/[id] — حذف کامنت (صاحب کامنت یا ادمین)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!comment) {
      return NextResponse.json(
        { success: false, errors: ["کامنت یافت نشد."] },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { role: true },
    });
    const isAdmin = isAdminRole(user?.role);
    const isOwner = comment.userId === auth.userId;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, errors: ["دسترسی غیرمجاز."] },
        { status: 403 }
      );
    }

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "کامنت حذف شد.",
    });
  } catch (e) {
    console.error("Comment DELETE error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در حذف کامنت."] },
      { status: 500 }
    );
  }
}
