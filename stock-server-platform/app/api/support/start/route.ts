import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supportStartSchema } from "@/lib/validations/support";
import { randomUUID } from "crypto";

/**
 * POST /api/support/start
 * بدن: firstName, lastName, phone
 * خروجی: conversationId, clientToken — با این توکن کاربر می‌تواند پیام بفرستد و بخواند.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = supportStartSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }
    const { firstName, lastName, phone } = parsed.data;
    const clientToken = randomUUID();
    const conversation = await prisma.supportConversation.create({
      data: {
        firstName,
        lastName,
        phone,
        clientToken,
      },
    });
    return NextResponse.json(
      {
        success: true,
        conversationId: conversation.id,
        clientToken,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Support start error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ثبت اطلاعات."] },
      { status: 500 }
    );
  }
}
