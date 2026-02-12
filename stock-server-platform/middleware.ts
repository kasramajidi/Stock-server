import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ?? "http://localhost:3000"
).split(",").map((o) => o.trim());

function getOrigin(req: NextRequest): string | null {
  return req.headers.get("origin") ?? req.headers.get("referer")?.split("/").slice(0, 3).join("/") ?? null;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin =
    origin && (ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin))
      ? origin
      : ALLOWED_ORIGINS[0] ?? "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export function middleware(request: NextRequest) {
  const isApi = request.nextUrl.pathname.startsWith("/api");
  const origin = getOrigin(request);

  if (request.method === "OPTIONS" && isApi) {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  const response = NextResponse.next();
  if (isApi) {
    Object.entries(corsHeaders(origin)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }
  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
