import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";
const ADMIN_COOKIE_VALUE = "authenticated"; // مقدار ثابت؛ با موفق بودن لاگین ست می‌شود
const COOKIE_MAX_AGE = 60 * 60 * 24; // ۲۴ ساعت

/** یوزرنیم و پسورد پیش‌فرض ادمین (می‌توانی از env بخوانی) */
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const user = (username ?? "").trim();
    const pass = password ?? "";

    if (!user || !pass) {
      return NextResponse.json(
        { ok: false, error: "نام کاربری و رمز عبور را وارد کنید." },
        { status: 400 }
      );
    }

    if (user !== DEFAULT_ADMIN_USERNAME || pass !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "نام کاربری یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "خطا در سرور." },
      { status: 500 }
    );
  }
}
