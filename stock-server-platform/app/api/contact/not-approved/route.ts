import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/contact/not-approved — لیست پرسش‌های تایید نشده (pending + rejected) (فقط ادمین)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const list = await prisma.contactInquiry.findMany({
      where: { status: { in: ["pending", "rejected"] } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: list.length, inquiries: list });
  } catch (e) {
    console.error("Contact not-approved GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست."] },
      { status: 500 }
    );
  }
}
