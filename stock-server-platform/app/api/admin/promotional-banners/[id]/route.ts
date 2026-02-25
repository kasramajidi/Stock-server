import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const imageUrlSchema = z
  .string()
  .min(1)
  .refine(
    (val) => {
      if (val.startsWith("/")) return /^\/[^/].*/.test(val);
      try {
        const u = new URL(val);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "آدرس تصویر نامعتبر است." }
  );

const updateSchema = z.object({
  position: z.enum(["left", "right"]).optional(),
  imageUrl: imageUrlSchema.optional(),
  alt: z.string().max(200).optional().nullable(),
  link: z.string().max(500).optional().nullable(),
});

/**
 * PATCH /api/admin/promotional-banners/[id] — ویرایش بنر
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      const errors = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }
    const data: Record<string, unknown> = {};
    if (parsed.data.position !== undefined) data.position = parsed.data.position;
    if (parsed.data.imageUrl !== undefined) data.imageUrl = parsed.data.imageUrl;
    if (parsed.data.alt !== undefined) data.alt = parsed.data.alt;
    if (parsed.data.link !== undefined) data.link = parsed.data.link;
    const banner = await prisma.promotionalBanner.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, banner });
  } catch (e) {
    console.error("Admin promotional banner PATCH error:", e);
    return NextResponse.json(
      { success: false, errors: ["بنر یافت نشد یا خطا در ویرایش."] },
      { status: 404 }
    );
  }
}

/**
 * DELETE /api/admin/promotional-banners/[id] — حذف بنر
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(_request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;
  try {
    await prisma.promotionalBanner.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Admin promotional banner DELETE error:", e);
    return NextResponse.json(
      { success: false, errors: ["بنر یافت نشد یا خطا در حذف."] },
      { status: 404 }
    );
  }
}
