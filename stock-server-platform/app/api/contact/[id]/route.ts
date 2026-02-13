import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { contactReviewSchema } from "@/lib/validations/contact";
import { sendResponseToUser } from "@/lib/email";

/**
 * GET /api/contact/[id] — دریافت یک پرسش (فقط ادمین)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });
  if (!inquiry) {
    return NextResponse.json(
      { success: false, errors: ["پرسش یافت نشد."] },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, inquiry });
}

/**
 * DELETE /api/contact/[id] — حذف پرسش (فقط ادمین)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  await prisma.contactInquiry.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({
    success: true,
    message: "پرسش حذف شد.",
  });
}

/**
 * PATCH /api/contact/[id] — تایید/رد توسط ادمین و ارسال پاسخ به ایمیل کاربر
 * Body: { status: "approved" | "rejected", adminResponse?: string }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });
  if (!inquiry) {
    return NextResponse.json(
      { success: false, errors: ["پرسش یافت نشد."] },
      { status: 404 }
    );
  }
  const body = await request.json().catch(() => ({}));
  const parsed = contactReviewSchema.safeParse(body);
  if (!parsed.success) {
    const messages = Object.values(parsed.error.flatten().fieldErrors).flat().filter(Boolean) as string[];
    return NextResponse.json(
      { success: false, errors: messages.length ? messages : ["وضعیت معتبر نیست (approved یا rejected)."] },
      { status: 400 }
    );
  }
  const { status, adminResponse } = parsed.data;
  const updated = await prisma.contactInquiry.update({
    where: { id },
    data: { status, adminResponse: adminResponse ?? null },
  });
  await sendResponseToUser({
    to: inquiry.email,
    fullName: inquiry.fullName,
    status,
    adminResponse: adminResponse ?? null,
  });
  return NextResponse.json({
    success: true,
    message: status === "approved" ? "پرسش تایید و ایمیل به کاربر ارسال شد." : "پرسش رد و ایمیل به کاربر ارسال شد.",
    inquiry: updated,
  });
}
