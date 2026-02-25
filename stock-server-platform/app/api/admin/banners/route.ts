import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

/** پذیرش URL کامل (http/https) یا مسیر لوکال پروژه (شروع با /) مثل /Images/Baner/banner.png */
const imageUrlSchema = z
  .string()
  .min(1, "آدرس تصویر الزامی است.")
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
    { message: "آدرس تصویر باید URL معتبر (https://...) یا مسیر لوکال (مثل /Images/Baner/banner.png) باشد." }
  );

const createBannerSchema = z.object({
  imageUrl: imageUrlSchema,
  alt: z.string().max(200).optional(),
});

const reorderSchema = z.object({
  order: z.array(z.string()).min(1, "ترتیب خالی است."),
});

/**
 * GET /api/admin/banners — لیست بنرها (ادمین)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const banners = await prisma.heroBanner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, banners });
  } catch (e) {
    console.error("Admin banners GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت بنرها."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/banners — افزودن بنر (ادمین)
 * Body: { imageUrl: string, alt?: string }
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = createBannerSchema.safeParse(body);
    if (!parsed.success) {
      const errors = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }
    const maxOrder = await prisma.heroBanner.aggregate({
      _max: { sortOrder: true },
    });
    const sortOrder = (maxOrder._max.sortOrder ?? -1) + 1;
    const banner = await prisma.heroBanner.create({
      data: {
        imageUrl: parsed.data.imageUrl,
        alt: parsed.data.alt ?? undefined,
        sortOrder,
      },
    });
    return NextResponse.json(
      { success: true, banner },
      { status: 201 }
    );
  } catch (e) {
    console.error("Admin banners POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ایجاد بنر."] },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/banners — تغییر ترتیب بنرها (ادمین)
 * Body: { order: string[] } — آرایه idها به ترتیب نهایی
 */
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = reorderSchema.safeParse(body);
    if (!parsed.success) {
      const errors = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }
    await Promise.all(
      parsed.data.order.map((id, index) =>
        prisma.heroBanner.updateMany({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );
    const banners = await prisma.heroBanner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, banners });
  } catch (e) {
    console.error("Admin banners PATCH error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در بروزرسانی ترتیب."] },
      { status: 500 }
    );
  }
}
