import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { addressCreateSchema } from "@/lib/validations/address";

/**
 * GET /api/addresses — لیست آدرس‌های کاربر لاگین‌شده
 */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const addresses = await prisma.userAddress.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    addresses: addresses.map((a) => ({
      id: a.id,
      title: a.title,
      addressText: a.addressText,
      latitude: a.latitude,
      longitude: a.longitude,
      createdAt: a.createdAt,
    })),
  });
}

/**
 * POST /api/addresses — افزودن آدرس جدید
 */
export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: ["بدنه درخواست نامعتبر است."] },
      { status: 400 }
    );
  }

  const parsed = addressCreateSchema.safeParse(body);
  if (!parsed.success) {
    const messages = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean) as string[];
    return NextResponse.json(
      { success: false, errors: messages },
      { status: 400 }
    );
  }

  const { title, addressText, latitude, longitude } = parsed.data;

  const address = await prisma.userAddress.create({
    data: {
      userId: auth.userId,
      title,
      addressText,
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
    },
  });

  return NextResponse.json({
    success: true,
    address: {
      id: address.id,
      title: address.title,
      addressText: address.addressText,
      latitude: address.latitude,
      longitude: address.longitude,
      createdAt: address.createdAt,
    },
  });
}
