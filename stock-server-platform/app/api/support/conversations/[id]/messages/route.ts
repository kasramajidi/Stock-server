import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supportMessageSchema } from "@/lib/validations/support";

function getToken(request: NextRequest): string | null {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (token) return token.trim();
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: conversationId } = await params;
  const token = getToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, errors: ["توکن ارسال نشده است."] },
      { status: 401 }
    );
  }
  try {
    const conversation = await prisma.supportConversation.findFirst({
      where: { id: conversationId, clientToken: token },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: { admin: { select: { id: true, fullName: true, avatarUrl: true } } },
        },
      },
    });
    if (!conversation) {
      return NextResponse.json(
        { success: false, errors: ["مکالمه یافت نشد یا توکن نامعتبر است."] },
        { status: 404 }
      );
    }
    const messages = conversation.messages.map((m) => ({
      id: m.id,
      senderType: m.senderType,
      content: m.content,
      createdAt: m.createdAt,
      admin: m.senderType === "support" && m.admin ? { fullName: m.admin.fullName, avatarUrl: m.admin.avatarUrl } : null,
    }));
    return NextResponse.json({
      success: true,
      messages,
      supportSeenAt: conversation.supportSeenAt?.toISOString() ?? null,
    });
  } catch (e) {
    console.error("Support messages GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت پیام‌ها."] },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: conversationId } = await params;
  const token = getToken(request);
  if (!token) {
    return NextResponse.json(
      { success: false, errors: ["توکن ارسال نشده است."] },
      { status: 401 }
    );
  }
  try {
    const conversation = await prisma.supportConversation.findFirst({
      where: { id: conversationId, clientToken: token },
    });
    if (!conversation) {
      return NextResponse.json(
        { success: false, errors: ["مکالمه یافت نشد یا توکن نامعتبر است."] },
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
        senderType: "user",
        content: parsed.data.content,
      },
    });
    return NextResponse.json(
      { success: true, message },
      { status: 201 }
    );
  } catch (e) {
    console.error("Support messages POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ارسال پیام."] },
      { status: 500 }
    );
  }
}
