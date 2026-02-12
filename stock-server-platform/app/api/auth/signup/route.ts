import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations/auth";
import { createToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const messages = Object.values(errors).flat().filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages.length ? messages : ["داده‌های ورودی معتبر نیست."] },
        { status: 400 }
      );
    }

    const { fullName, mobile, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { mobile },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, errors: ["این شماره موبایل قبلاً ثبت شده است."] },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        mobile,
        email,
        passwordHash,
        acceptTerms: true,
      },
      select: {
        id: true,
        fullName: true,
        mobile: true,
        email: true,
        createdAt: true,
      },
    });

    const token = await createToken(user.id);

    return NextResponse.json(
      {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد.",
        token,
        expiresInDays: 15,
        user: {
          id: user.id,
          fullName: user.fullName,
          mobile: user.mobile,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof Error && e.message.includes("JWT_SECRET")) {
      return NextResponse.json(
        { success: false, errors: ["پیکربندی سرور ناقص است."] },
        { status: 500 }
      );
    }
    console.error("Signup error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ثبت‌نام. دوباره تلاش کنید."] },
      { status: 500 }
    );
  }
}
