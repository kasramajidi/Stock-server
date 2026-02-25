import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { addressUpdateSchema } from "@/lib/validations/address";

/**
 * PATCH /api/addresses/[id] — ویرایش آدرس
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const existing = await prisma.userAddress.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["آدرس یافت نشد."] },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: ["بدنه درخواست نامعتبر است."] },
      { status: 400 }
    );
  }

  const parsed = addressUpdateSchema.safeParse(body);
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

  const address = await prisma.userAddress.update({
    where: { id },
    data: {
      ...(title != null && { title }),
      ...(addressText != null && { addressText }),
      ...(latitude !== undefined && { latitude }),
      ...(longitude !== undefined && { longitude }),
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

/**
 * DELETE /api/addresses/[id] — حذف آدرس
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(_request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const existing = await prisma.userAddress.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== auth.userId) {
    return NextResponse.json(
      { success: false, errors: ["آدرس یافت نشد."] },
      { status: 404 }
    );
  }

  await prisma.userAddress.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
