/**
 * API/دادهٔ فروشگاه استوک سرور — محصولات سرور و تجهیزات شبکه
 */

export interface ShopProduct {
  id: number;
  /** شناسه محصول در Prisma (cuid) — برای ثبت سفارش در CartRequests */
  prismaProductId?: string;
  /** slug برای لینک صفحه محصول — وقتی از API می‌آید */
  slug?: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  category: string;
  brand: string;
  createdAt: string;
  sales: number;
  description: string;
  mainCategoryId: string;
  productType: "server" | "part";
}

/** دادهٔ ثابت برای فروشگاه (در صورت نبود API واقعی) */
const MOCK_PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    name: "خرید و قیمت سرور استوک HP ProLiant DL360 G9",
    price: 165000000,
    image: "/Images/Category/Server.png",
    rating: 5,
    reviews: 24,
    isNew: false,
    category: "سرور HP",
    brand: "HP",
    createdAt: "2024-01-15",
    sales: 45,
    description: "سرور استوک HP ProLiant DL360 G9 با گارانتی معتبر.",
    mainCategoryId: "server",
    productType: "server",
  },
  {
    id: 2,
    name: "سرور HPE ProLiant DL360 G10",
    price: 1466000000,
    image: "/Images/Category/Server.png",
    rating: 5,
    reviews: 18,
    isNew: true,
    category: "سرور HP",
    brand: "HPE",
    createdAt: "2024-02-01",
    sales: 12,
    description: "سرور HPE ProLiant DL360 G10.",
    mainCategoryId: "server",
    productType: "server",
  },
  {
    id: 3,
    name: "سرور HPE ProLiant DL360 G11",
    price: 0,
    image: "/Images/Category/Server.png",
    rating: 5,
    reviews: 0,
    isNew: true,
    category: "سرور HP",
    brand: "HPE",
    createdAt: "2024-02-10",
    sales: 0,
    description: "برای استعلام قیمت تماس بگیرید.",
    mainCategoryId: "server",
    productType: "server",
  },
  {
    id: 4,
    name: "قیمت و خرید سرور HP DL380 G10",
    price: 0,
    image: "/Images/Category/Server.png",
    rating: 5,
    reviews: 31,
    isNew: false,
    category: "سرور HP",
    brand: "HP",
    createdAt: "2024-01-08",
    sales: 28,
    description: "سرور HP DL380 G10 — برای استعلام تماس بگیرید.",
    mainCategoryId: "server",
    productType: "server",
  },
  {
    id: 5,
    name: "HPE 32GB Single Rank x4 DDR4-2933 Registered Smart",
    price: 0,
    image: "/Images/Baner/Layer 5.png",
    rating: 5,
    reviews: 8,
    isNew: false,
    category: "رم سرور HP",
    brand: "HPE",
    createdAt: "2024-01-20",
    sales: 56,
    description: "برای استعلام موجودی تماس بگیرید.",
    mainCategoryId: "ram",
    productType: "part",
  },
  {
    id: 6,
    name: "HPE 64GB Quad Rank x4 DDR4-2933 Load Reduced Smart",
    price: 0,
    image: "/Images/Baner/Layer 5.png",
    rating: 5,
    reviews: 5,
    isNew: true,
    category: "رم سرور HP",
    brand: "HPE",
    createdAt: "2024-02-05",
    sales: 12,
    description: "برای استعلام موجودی تماس بگیرید.",
    mainCategoryId: "ram",
    productType: "part",
  },
  {
    id: 7,
    name: "پردازنده سرور HP",
    price: 0,
    image: "/Images/Category/CPU.png",
    rating: 5,
    reviews: 42,
    isNew: false,
    category: "CPU سرور HP",
    brand: "HP",
    createdAt: "2024-01-01",
    sales: 89,
    description: "انواع CPU سرور HP — برای استعلام تماس بگیرید.",
    mainCategoryId: "cpu",
    productType: "part",
  },
  {
    id: 8,
    name: "هارد سرور",
    price: 0,
    image: "/Images/Category/HDD.png",
    rating: 5,
    reviews: 67,
    isNew: false,
    category: "هارد سرور",
    brand: "HP",
    createdAt: "2024-01-12",
    sales: 120,
    description: "هارد سرور با گارانتی.",
    mainCategoryId: "hdd",
    productType: "part",
  },
  {
    id: 9,
    name: "پاور سرور HP",
    price: 0,
    image: "/Images/Category/Power Supply.png",
    rating: 5,
    reviews: 23,
    isNew: false,
    category: "پاور سرور HP",
    brand: "HP",
    createdAt: "2024-01-18",
    sales: 34,
    description: "پاور سرور HP اصل.",
    mainCategoryId: "power-supply",
    productType: "part",
  },
  {
    id: 10,
    name: "فن سرور HP",
    price: 0,
    image: "/Images/Category/Fan.png",
    rating: 5,
    reviews: 19,
    isNew: false,
    category: "فن سرور HP",
    brand: "HP",
    createdAt: "2024-01-22",
    sales: 45,
    description: "فن سرور HP با گارانتی.",
    mainCategoryId: "fan",
    productType: "part",
  },
];

function mapPrismaToShopProduct(p: {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: string | null;
  category: string;
  brand: string;
  price?: number | null;
  createdAt: Date;
  viewCount?: number;
}): ShopProduct {
  return {
    id: 0,
    prismaProductId: p.id,
    slug: p.slug,
    name: p.title,
    price: p.price ?? 0,
    image: p.image || "",
    rating: 5,
    reviews: 0,
    isNew: false,
    category: p.category,
    brand: p.brand,
    createdAt: p.createdAt.toISOString().slice(0, 10),
    sales: 0,
    description: p.shortDescription || "",
    mainCategoryId: "server",
    productType: "server",
  };
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function fetchShopProducts(): Promise<ShopProduct[]> {
  try {
    const base = getBaseUrl();
    const url = base ? `${base}/api/products?limit=50` : "/api/products?limit=50";
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
      return data.products.map((p: { id: string; title: string; slug: string; shortDescription?: string; image?: string | null; category: string; brand: string; price?: number | null; createdAt: string | Date; viewCount?: number }) =>
        mapPrismaToShopProduct({ ...p, createdAt: new Date(p.createdAt) })
      );
    }
  } catch {
    // fallback to mock
  }
  return MOCK_PRODUCTS;
}

export async function fetchProductById(id: number | string): Promise<ShopProduct | null> {
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  if (Number.isNaN(productId)) return null;
  const list = await fetchShopProducts();
  return list.find((p) => p.id === productId) ?? null;
}
