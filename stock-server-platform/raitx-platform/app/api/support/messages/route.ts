import { NextRequest, NextResponse } from "next/server";
import {
  getConversationByClientId,
  createConversation,
  addMessage,
  getMessages,
  getConversation,
} from "@/lib/support-store";

const ADMIN_COOKIE_NAME = "admin_session";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === "authenticated";
}

/** دریافت پیام‌های یک مکالمه */
export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get("conversationId");
  const clientId = request.nextUrl.searchParams.get("clientId");

  if (conversationId) {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const list = getMessages(conversationId);
    return NextResponse.json({ messages: list });
  }

  if (clientId) {
    const conv = getConversationByClientId(clientId);
    if (!conv) return NextResponse.json({ messages: [] });
    return NextResponse.json({ messages: conv.messages });
  }

  return NextResponse.json({ error: "conversationId or clientId required" }, { status: 400 });
}

/** ارسال پیام (کاربر یا ادمین) */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "بدنه درخواست نامعتبر است" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "بدنه درخواست نامعتبر است" }, { status: 400 });
  }

  const conversationId = typeof body.conversationId === "string" ? body.conversationId : undefined;
  const clientId = typeof body.clientId === "string" ? body.clientId : undefined;
  const sender = body.sender === "user" || body.sender === "admin" ? body.sender : undefined;
  const text = typeof body.text === "string" ? body.text : "";
  const userName = typeof body.userName === "string" ? body.userName : undefined;
  const userPhone = typeof body.userPhone === "string" ? body.userPhone : undefined;

  if (!sender) {
    return NextResponse.json({ error: "sender باید user یا admin باشد" }, { status: 400 });
  }
  if (!text.trim()) {
    return NextResponse.json({ error: "متن پیام الزامی است" }, { status: 400 });
  }

  if (sender === "admin" && !isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let conv;
  if (conversationId) {
    conv = getConversation(conversationId);
    if (!conv) {
      return NextResponse.json({ error: "مکالمه یافت نشد" }, { status: 404 });
    }
  } else if (clientId) {
    conv = getConversationByClientId(clientId);
    if (!conv) {
      conv = createConversation(clientId, userName, userPhone);
    }
  } else {
    return NextResponse.json({ error: "conversationId یا clientId الزامی است" }, { status: 400 });
  }

  const msg = addMessage(conv.id, sender, text.trim());
  if (!msg) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

  return NextResponse.json({ message: msg, conversationId: conv.id });
}
