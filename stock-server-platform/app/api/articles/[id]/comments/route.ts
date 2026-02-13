import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { commentCreateSchema } from "@/lib/validations/comment";

/** شکل خروجی یک کامنت با کاربر و پاسخ‌ها */
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
 * GET /api/articles/[id]/comments
 * - عمومی: فقط کامنت‌های approved (با پاسخ‌های تو در تو)
 * - ادمین: همه با هر status؛ اگر query approvedOnly=true فقط approved
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: articleId } = await params;
  const { searchParams } = new URL(request.url);
  const approvedOnly = searchParams.get("approvedOnly") !== "false"; // پیش‌فرض فقط تأیید شده

  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });
    if (!article) {
      return NextResponse.json(
        { success: false, errors: ["مقاله یافت نشد."] },
        { status: 404 }
      );
    }

    const where: { articleId: string; parentId: null; status?: string } = {
      articleId,
      parentId: null,
    };
    if (approvedOnly) where.status = "approved";

    const topLevel = await prisma.comment.findMany({
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
    console.error("Comments GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت کامنت‌ها."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/articles/[id]/comments — ثبت کامنت یا پاسخ (نیاز به لاگین)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id: articleId } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });
    if (!article) {
      return NextResponse.json(
        { success: false, errors: ["مقاله یافت نشد."] },
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
      const parent = await prisma.comment.findFirst({
        where: { id: parentId, articleId },
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
      select: { isBanned: true },
    });
    if (user?.isBanned) {
      return NextResponse.json(
        { success: false, errors: ["حساب شما مسدود است."] },
        { status: 403 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        userId: auth.userId,
        parentId: parentId ?? undefined,
        content,
        status: "pending",
      },
      include: {
        user: { select: { id: true, fullName: true } },
      },
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
    console.error("Comment POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ثبت کامنت."] },
      { status: 500 }
    );
  }
}
