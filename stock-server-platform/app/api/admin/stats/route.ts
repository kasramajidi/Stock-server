import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/stats — آمار پیشخوان: آیتم‌های سبد خرید و رشد کاربران (ماهانه و سالانه)
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  const startThisMonth = new Date(Date.UTC(year, month, 1));
  const startNextMonth = new Date(Date.UTC(year, month + 1, 1));
  const startLastMonth = new Date(Date.UTC(year, month - 1, 1));
  const startThisYear = new Date(Date.UTC(year, 0, 1));
  const startNextYear = new Date(Date.UTC(year + 1, 0, 1));
  const startLastYear = new Date(Date.UTC(year - 1, 0, 1));

  try {
    const [
      cartThisMonth,
      cartLastMonth,
      cartThisYear,
      cartLastYear,
      usersTotal,
      usersThisMonth,
      usersLastMonth,
      usersThisYear,
      usersLastYear,
    ] = await Promise.all([
      prisma.cartRequestItem.aggregate({
        where: {
          cartRequest: {
            createdAt: { gte: startThisMonth, lt: startNextMonth },
          },
        },
        _sum: { quantity: true },
      }),
      prisma.cartRequestItem.aggregate({
        where: {
          cartRequest: {
            createdAt: { gte: startLastMonth, lt: startThisMonth },
          },
        },
        _sum: { quantity: true },
      }),
      prisma.cartRequestItem.aggregate({
        where: {
          cartRequest: {
            createdAt: { gte: startThisYear, lt: startNextYear },
          },
        },
        _sum: { quantity: true },
      }),
      prisma.cartRequestItem.aggregate({
        where: {
          cartRequest: {
            createdAt: { gte: startLastYear, lt: startThisYear },
          },
        },
        _sum: { quantity: true },
      }),
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: startThisMonth, lt: startNextMonth } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: startLastMonth, lt: startThisMonth } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: startThisYear, lt: startNextYear } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: startLastYear, lt: startThisYear } },
      }),
    ]);

    const cartItemsThisMonth = cartThisMonth._sum.quantity ?? 0;
    const cartItemsLastMonth = cartLastMonth._sum.quantity ?? 0;
    const cartItemsThisYear = cartThisYear._sum.quantity ?? 0;
    const cartItemsLastYear = cartLastYear._sum.quantity ?? 0;

    const monthlyCartGrowth =
      cartItemsLastMonth === 0
        ? (cartItemsThisMonth > 0 ? 100 : 0)
        : Math.round(((cartItemsThisMonth - cartItemsLastMonth) / cartItemsLastMonth) * 100);
    const yearlyCartGrowth =
      cartItemsLastYear === 0
        ? (cartItemsThisYear > 0 ? 100 : 0)
        : Math.round(((cartItemsThisYear - cartItemsLastYear) / cartItemsLastYear) * 100);

    const monthlyUserGrowth =
      usersLastMonth === 0
        ? (usersThisMonth > 0 ? 100 : 0)
        : Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100);
    const yearlyUserGrowth =
      usersLastYear === 0
        ? (usersThisYear > 0 ? 100 : 0)
        : Math.round(((usersThisYear - usersLastYear) / usersLastYear) * 100);

    // دادهٔ نمودار: ۱۲ ماه اخیر (از قدیم به جدید)
    const results = await Promise.all(
      Array.from({ length: 12 }, (_, i) => {
        const d = new Date(year, month - 11 + i, 1);
        const startM = new Date(d.getFullYear(), d.getMonth(), 1);
        const endM = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        const label = `${d.getMonth() + 1}/${String(d.getFullYear()).slice(-2)}`;
        return Promise.all([
          prisma.cartRequestItem.aggregate({
            where: {
              cartRequest: {
                createdAt: { gte: startM, lt: endM },
              },
            },
            _sum: { quantity: true },
          }),
          prisma.user.count({
            where: { createdAt: { gte: startM, lt: endM } },
          }),
        ]).then(([cartAgg, userCount]) => ({
          label,
          cartValue: cartAgg._sum.quantity ?? 0,
          userCount,
        }));
      })
    );
    const cartItemsByMonth = results.map((r) => ({ label: r.label, value: r.cartValue }));
    const usersByMonth = results.map((r) => ({ label: r.label, count: r.userCount }));

    return NextResponse.json({
      success: true,
      cartItems: {
        thisMonth: cartItemsThisMonth,
        lastMonth: cartItemsLastMonth,
        thisYear: cartItemsThisYear,
        lastYear: cartItemsLastYear,
        monthlyGrowthPercent: monthlyCartGrowth,
        yearlyGrowthPercent: yearlyCartGrowth,
      },
      users: {
        total: usersTotal,
        thisMonth: usersThisMonth,
        lastMonth: usersLastMonth,
        thisYear: usersThisYear,
        lastYear: usersLastYear,
        monthlyGrowthPercent: monthlyUserGrowth,
        yearlyGrowthPercent: yearlyUserGrowth,
      },
      chartData: {
        cartItemsByMonth,
        usersByMonth,
      },
    });
  } catch (e) {
    console.error("Admin stats error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در محاسبه آمار."] },
      { status: 500 }
    );
  }
}
