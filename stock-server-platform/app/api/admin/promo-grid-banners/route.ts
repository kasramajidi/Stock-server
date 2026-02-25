import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

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
    { message: "آدرس تصویر باید URL معتبر یا مسیر لوکال (/Images/...) باشد." }
  );

const createSchema = z.object({
  position: z.number().int().min(1, "position باید عدد مثبت باشد."),
  imageUrl: imageUrlSchema,
  alt: z.string().max(200).optional(),
  link: z.string().max(500).optional(),
});

/**
 * GET /api/admin/promo-grid-banners — لیست بنرهای گرید وسط (ادمین)
 * سه اسلات ۱، ۲، ۳ — ویرایش یکی بقیه را پاک نمی‌کند
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const banners = await prisma.promoGridBanner.findMany({
      orderBy: { position: "asc" },
    });
    return NextResponse.json({ success: true, banners });
  } catch (e) {
    console.error("Admin promo grid banners GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت بنرها."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/promo-grid-banners — افزودن یا عوض کردن بنر اسلات ۱، ۲ یا ۳
 * با upsert: اگر اسلات پر باشد عوض می‌شود؛ بقیه اسلات‌ها دست نخورده می‌مانند
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      const errors = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }
    const banner = await prisma.promoGridBanner.upsert({
      where: { position: parsed.data.position },
      update: {
        imageUrl: parsed.data.imageUrl,
        alt: parsed.data.alt ?? null,
        link: parsed.data.link ?? null,
      },
      create: {
        position: parsed.data.position,
        imageUrl: parsed.data.imageUrl,
        alt: parsed.data.alt ?? null,
        link: parsed.data.link ?? null,
      },
    });
    return NextResponse.json(
      { success: true, banner },
      { status: 201 }
    );
  } catch (e) {
    console.error("Admin promo grid banners POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ذخیره بنر."] },
      { status: 500 }
    );
  }
}
