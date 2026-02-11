import { NextResponse } from "next/server";

/**
 * API سفارش‌ها — برای داشبورد.
 * فعلاً لیست خالی برمی‌گرداند؛ بعداً به دیتابیس/سرویس سفارش وصل شود.
 */
export async function GET() {
  return NextResponse.json({ orders: [] });
}
