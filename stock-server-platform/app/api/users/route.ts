import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/users — لیست همه کاربران (فقط ادمین)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        mobile: true,
        email: true,
        role: true,
        isBanned: true,
        createdAt: true,
        updatedAt: true,
        comments: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
            articleId: true,
            parentId: true,
            article: { select: { id: true, title: true } },
          },
        },
        productComments: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
            productId: true,
            parentId: true,
            product: { select: { id: true, title: true } },
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (e) {
    console.error("Users list error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست کاربران."] },
      { status: 500 }
    );
  }
}
