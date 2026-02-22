import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const SUPPORT_CHAT_MAX_AGE_MINUTES = 30;

function isAuthorized(request: NextRequest): Promise<boolean | NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (cronSecret && bearer === cronSecret) return Promise.resolve(true);
  return requireAdmin(request).then((auth) => {
    if (auth instanceof NextResponse) return auth;
    return true;
  });
}

async function runCleanup() {
  const cutoff = new Date(Date.now() - SUPPORT_CHAT_MAX_AGE_MINUTES * 60 * 1000);
  const result = await prisma.supportConversation.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });
  return NextResponse.json({
    success: true,
    deleted: result.count,
    message: `${result.count} مکالمه قدیمی‌تر از ${SUPPORT_CHAT_MAX_AGE_MINUTES} دقیقه حذف شد.`,
  });
}

/**
 * حذف مکالمات چت پشتیبانی قدیمی‌تر از ۳۰ دقیقه.
 * فراخوانی: با توکن ادمین (Authorization: Bearer <JWT>) یا با کلید cron (Authorization: Bearer <CRON_SECRET>).
 * برای اجرای خودکار هر چند دقیقه یک بار از cron استفاده کن.
 */
export async function POST(request: NextRequest) {
  const auth = await isAuthorized(request);
  if (auth instanceof NextResponse) return auth;
  try {
    return await runCleanup();
  } catch (e) {
    console.error("Cleanup support chat error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در پاکسازی چت."] },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = await isAuthorized(request);
  if (auth instanceof NextResponse) return auth;
  try {
    return await runCleanup();
  } catch (e) {
    console.error("Cleanup support chat error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در پاکسازی چت."] },
      { status: 500 }
    );
  }
}
