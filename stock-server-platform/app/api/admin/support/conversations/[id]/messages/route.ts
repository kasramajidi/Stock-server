import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { supportMessageSchema } from "@/lib/validations/support";

/**
 * GET /api/admin/support/conversations/[id]/messages — پیام‌های یک مکالمه (ادمین)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id: conversationId } = await params;
  try {
    const conversation = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: { admin: { select: { id: true, fullName: true, avatarUrl: true } } },
        },
      },
    });
    if (!conversation) {
      return NextResponse.json(
        { success: false, errors: ["مکالمه یافت نشد."] },
        { status: 404 }
      );
    }
    // وقتی پشتیبانی چت را باز می‌کند = «دیده شده» برای کاربر
    await prisma.supportConversation.update({
      where: { id: conversationId },
      data: { supportSeenAt: new Date() },
    });
    return NextResponse.json({
      success: true,
      conversation: {
        id: conversation.id,
        firstName: conversation.firstName,
        lastName: conversation.lastName,
        phone: conversation.phone,
        createdAt: conversation.createdAt,
      },
      messages: conversation.messages,
    });
  } catch (e) {
    console.error("Admin support messages GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت پیام‌ها."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/support/conversations/[id]/messages — ارسال پیام پشتیبانی (ادمین)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id: conversationId } = await params;
  try {
    const conversation = await prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      return NextResponse.json(
        { success: false, errors: ["مکالمه یافت نشد."] },
        { status: 404 }
      );
    }
    const body = await request.json();
    const parsed = supportMessageSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }
    const message = await prisma.supportMessage.create({
      data: {
        conversationId,
        senderType: "support",
        adminId: auth.userId,
        content: parsed.data.content,
      },
      include: { admin: { select: { id: true, fullName: true, avatarUrl: true } } },
    });
    await prisma.supportConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });
    const messageForClient = {
      ...message,
      admin: message.admin ? { fullName: message.admin.fullName, avatarUrl: message.admin.avatarUrl } : null,
    };
    return NextResponse.json(
      { success: true, message: messageForClient },
      { status: 201 }
    );
  } catch (e) {
    console.error("Admin support messages POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ارسال پیام."] },
      { status: 500 }
    );
  }
}
