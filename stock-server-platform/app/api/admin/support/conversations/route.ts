import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const list = await prisma.supportConversation.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
    const conversations = list.map((c) => ({
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      phone: c.phone,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      lastMessage: c.messages[0]
        ? {
            content: c.messages[0].content,
            senderType: c.messages[0].senderType,
            createdAt: c.messages[0].createdAt,
          }
        : null,
    }));
    return NextResponse.json({
      success: true,
      conversations,
    });
  } catch (e) {
    console.error("Admin support conversations GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست مکالمات."] },
      { status: 500 }
    );
  }
}
