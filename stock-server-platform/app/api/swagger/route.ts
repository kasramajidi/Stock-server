import { NextResponse } from "next/server";
import { openApiDoc } from "@/lib/swagger";

/**
 * خروجی OpenAPI (Swagger) به صورت JSON برای Swagger UI
 */
export async function GET() {
  return NextResponse.json(openApiDoc);
}
