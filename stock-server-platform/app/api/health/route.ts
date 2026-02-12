import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** API سلامت سرور و اتصال دیتابیس — مستند در Swagger */
export async function GET() {
  let dbStatus = "disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "connected";
  } catch {
    dbStatus = "error";
  }

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
}
