import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productCreateSchema } from "@/lib/validations/product";

/**
 * GET /api/products
 * - لیست محصولات؛ Query: search، category، brand، order (newest|views)، page، limit
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || undefined;
    const category = searchParams.get("category")?.trim() || undefined;
    const brand = searchParams.get("brand")?.trim() || undefined;
    const order = searchParams.get("order") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
    const skip = (page - 1) * limit;

    const where: { title?: { contains: string; mode: "insensitive" }; category?: string; brand?: string } = {};
    if (search) where.title = { contains: search, mode: "insensitive" };
    if (category) where.category = category;
    if (brand) where.brand = brand;

    const orderBy =
      order === "views"
        ? [{ viewCount: "desc" as const }, { createdAt: "desc" as const }]
        : [{ createdAt: "desc" as const }];

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          createdBy: {
            select: { id: true, fullName: true, mobile: true, email: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      count: products.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (e) {
    console.error("Products GET error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در دریافت لیست محصولات."] },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products — ایجاد محصول (فقط ادمین)
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const parsed = productCreateSchema.safeParse(body);
    if (!parsed.success) {
      const messages = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, errors: ["این slug قبلاً استفاده شده است."] },
        { status: 400 }
      );
    }

    const data = parsed.data;
    await prisma.product.create({
      data: {
        slug: data.slug,
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        category: data.category,
        brand: data.brand,
        partNumbers: data.partNumbers ?? [],
        priceLabel: data.priceLabel,
        inStock: data.inStock ?? true,
        statusLabel: data.statusLabel,
        rating: data.rating ?? undefined,
        image: data.image ?? undefined,
        specs: data.specs ?? undefined,
        createdById: auth.userId,
      },
    });

    const product = await prisma.product.findUnique({
      where: { slug: data.slug },
      include: {
        createdBy: {
          select: { id: true, fullName: true, mobile: true, email: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, errors: ["خطا در بازخوانی محصول."] },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "محصول با موفقیت ایجاد شد.",
        product: {
          ...product,
          createdBy: product.createdBy ?? null,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Product POST error:", e);
    return NextResponse.json(
      { success: false, errors: ["خطا در ایجاد محصول."] },
      { status: 500 }
    );
  }
}
