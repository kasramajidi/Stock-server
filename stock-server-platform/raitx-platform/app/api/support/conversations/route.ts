import { NextRequest, NextResponse } from "next/server";
import { listConversations } from "@/lib/support-store";
import type { Conversation } from "@/lib/support-store";

const ADMIN_COOKIE_NAME = "admin_session";

function isAdmin(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === "authenticated";
}

/** نرمال‌سازی شماره برای مقایسه: 09... / 98... → 98xxxxxxxxx */
function normalizePhone(phone: string | undefined | null): string {
  if (phone == null || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) return digits.slice(0, 12);
  if (digits.startsWith("0") && digits.length >= 11) return "98" + digits.slice(1, 11);
  if (digits.startsWith("9") && digits.length >= 10) return "98" + digits.slice(0, 10);
  return digits;
}

/** وضعیت بر اساس آخرین پیام: اگر پشتیبانی جواب داده → جواب داده، وگرنه در حال بررسی */
function toPayload(c: Conversation) {
  const lastMsg = c.messages.length > 0 ? c.messages[c.messages.length - 1] : null;
  const status = lastMsg?.sender === "admin" ? "جواب داده" : "در حال بررسی";
  return {
    id: c.id,
    clientId: c.clientId,
    userName: c.userName,
    userPhone: c.userPhone,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    status,
    messageCount: c.messages.length,
    lastMessage:
      lastMsg
        ? {
            text: lastMsg.text.slice(0, 60),
            createdAt: lastMsg.createdAt,
          }
        : null,
  };
}

/** لیست مکالمات: اگر phone ارسال شده فقط مکالمات همان شماره؛ وگرنه ادمین = همه، کاربر عادی = هیچ. */
export async function GET(request: NextRequest) {
  const all = listConversations();

  const userPhoneRaw =
    request.nextUrl.searchParams.get("phone") ??
    request.headers.get("x-user-phone") ??
    "";
  const userPhoneNorm = normalizePhone(userPhoneRaw);

  if (userPhoneNorm) {
    const filtered = all.filter((c) => {
      if (!c.userPhone) return false;
      return normalizePhone(c.userPhone) === userPhoneNorm;
    });
    return NextResponse.json(filtered.map(toPayload));
  }

  if (isAdmin(request)) {
    return NextResponse.json(all.map(toPayload));
  }

  return NextResponse.json([]);
}
