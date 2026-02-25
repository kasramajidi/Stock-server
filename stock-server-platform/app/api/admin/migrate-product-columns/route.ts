import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET/POST /api/admin/migrate-product-columns
 * ستون‌های price، original_price، offer_discount_percent را به جدول products اضافه می‌کند.
 * فقط ادمین. بعد از یک بار اجرا، دیگر لازم نیست.
 * برای اجرا: در مرورگر لاگین کن، بعد این آدرس را باز کن: /api/admin/migrate-product-columns
 */
export async function GET(request: NextRequest) {
  return runMigration(request);
}

export async function POST(request: NextRequest) {
  return runMigration(request);
}

async function runMigration(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price" INTEGER`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "original_price" INTEGER`
    );
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "offer_discount_percent" INTEGER`
    );

    return NextResponse.json({
      success: true,
      message: "ستون‌ها با موفقیت اضافه شدند.",
    });
  } catch (e) {
    console.error("Migration error:", e);
    return NextResponse.json(
      {
        success: false,
        errors: [String(e)],
      },
      { status: 500 }
    );
  }
}
