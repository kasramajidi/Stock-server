import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { notifyCompanyNewInquiry } from "@/lib/email";
import { requireAdmin } from "@/lib/auth";

/**
 * POST /api/contact — ارسال پرسش (عمومی). بلافاصله ایمیل به شرکت (kasramajidy81@gmail.com) ارسال می‌شود.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors).flat().filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }
    const { fullName, email, message } = parsed.data;
    const inquiry = await prisma.contactInquiry.create({
      data: { fullName, email, message, status: "pending" },
    });
    await notifyCompanyNewInquiry({ fullName, email, message });
    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ارسال شد. کارشناسان به زودی با شما تماس خواهند گرفت.",
        id: inquiry.id,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Contact POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ارسال پیام."] },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact — لیست همه پرسش‌ها (فقط ادمین)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const list = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: list.length, inquiries: list });
  } catch (e) {
    console.error("Contact GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست."] },
      { status: 500 }
    );
  }
}
