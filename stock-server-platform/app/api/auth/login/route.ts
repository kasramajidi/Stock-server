import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth";
import { createToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const messages = Object.values(errors).flat().filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages.length ? messages : ["داده‌های ورودی معتبر نیست."] },
        { status: 400 }
      );
    }

    const { mobile, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { mobile },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, errors: ["شماره موبایل یا رمز عبور اشتباه است."] },
        { status: 401 }
      );
    }
    if (user.isBanned) {
      return NextResponse.json(
        { success: false, errors: ["حساب کاربری شما مسدود شده است."] },
        { status: 403 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, errors: ["شماره موبایل یا رمز عبور اشتباه است."] },
        { status: 401 }
      );
    }

    const token = await createToken(user.id);

    return NextResponse.json({
      success: true,
      message: "ورود با موفقیت انجام شد.",
      token,
      expiresInDays: 15,
      user: {
        id: user.id,
        fullName: user.fullName,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("JWT_SECRET")) {
      return NextResponse.json(
        { success: false, errors: ["پیکربندی سرور ناقص است."] },
        { status: 500 }
      );
    }
    console.error("Login error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ورود. دوباره تلاش کنید."] },
      { status: 500 }
    );
  }
}
