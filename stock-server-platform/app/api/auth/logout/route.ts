import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * برای یکدستی با کلاینت؛ خروج واقعی با پاک کردن توکن/کوکی در سمت کلاینت انجام می‌شود.
 * این endpoint همیشه 200 برمی‌گرداند (در صورت نیاز بعداً می‌توان لاگ یا بلاک‌لیست توکن اضافه کرد).
 */
export async function POST() {
  return NextResponse.json({
    success: true,
    message: "خروج با موفقیت انجام شد.",
  });
}
