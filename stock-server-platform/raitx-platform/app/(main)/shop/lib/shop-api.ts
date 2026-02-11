/** منبع رسمی: https://mrpremiumhub.org/api.ashx?action=shop — در کلاینت از پروکسی استفاده می‌شود تا CORS نشود */
const SHOP_API_EXTERNAL = "https://mrpremiumhub.org/api.ashx?action=shop";

function getShopApiUrl(): string {
  if (typeof window !== "undefined") return "/api/auth-proxy?action=shop";
  return SHOP_API_EXTERNAL;
}

export type ApiShopItem = {
  id?: number | string;
  title?: string;
  groups?: string;
  price?: number;
  value?: number;
  img?: string;
  video?: string;
  text?: string;
  UserComments?: string | UserCommentItem[];
  NumberOfComments?: number;
  Score?: number;
  [key: string]: unknown;
};

/** یک نظر کاربر از API */
export interface UserCommentItem {
  id?: string | number;
  author?: string;
  content?: string;
  date?: string;
  rating?: number;
  status?: string;
  /** پاسخ ادمین */
  reply?: string;
  /** ایمیل نویسنده (برای تشخیص نظر خود کاربر) */
  userEmail?: string;
  [key: string]: unknown;
}

function toCommentId(value: unknown): string | number | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") return value;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function normalizeCommentForDisplay(c: Record<string, unknown>): UserCommentItem {
  const contentRaw = c.content ?? c.commentText ?? c.CommentText ?? c.comment ?? "";
  const authorRaw = c.author ?? c.userName ?? c.UserName ?? "";
  return {
    id: toCommentId(c.id ?? c.ID),
    author: authorRaw != null ? String(authorRaw) : "",
    content: contentRaw != null ? String(contentRaw) : "",
    date: (c.date ?? c.Date ?? c.createdAt) != null ? String(c.date ?? c.Date ?? c.createdAt) : undefined,
    rating: typeof c.rating === "number" ? c.rating : Number(c.Rating ?? c.rating ?? 0),
    status: (c.status ?? c.Status ?? "pending") as string,
    reply: c.reply != null ? String(c.reply) : undefined,
    userEmail: (c.userEmail ?? c.UserEmail) != null ? String(c.userEmail ?? c.UserEmail) : undefined,
  };
}

/** همهٔ آیتم‌های UserComments را برمی‌گرداند (هر تعداد، حتی با userName/userEmail تهی) */
function parseUserComments(value: string | UserCommentItem[] | undefined): UserCommentItem[] {
  if (value == null) return [];
  const raw: Record<string, unknown>[] = Array.isArray(value)
    ? value.filter((c) => c && typeof c === "object") as Record<string, unknown>[]
    : (() => {
        if (typeof value !== "string") return [];
        const s = value.trim();
        if (!s) return [];
        try {
          const parsed = JSON.parse(s) as unknown;
          return Array.isArray(parsed) ? (parsed.filter((c) => c && typeof c === "object") as Record<string, unknown>[]) : [];
        } catch {
          return [];
        }
      })();
  return raw.map(normalizeCommentForDisplay);
}

function mapGroupToMainCategoryId(groups: string): "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other" {
  const g = (groups ?? "").toLowerCase();
  if (/پرداخت|ارزی|ویزا|مستر|پی پال/.test(groups ?? "")) return "currency";
  if (/آزمون|تافل|آیلتس|جی آر ای|ایلتس|ثبت نام/.test(groups ?? "")) return "exams";
  if (/سفارت|ویزا|وقت مصاحبه/.test(groups ?? "")) return "embassy";
  if (/اپلای|دانشگاه|شهریه|اپلیکیشن/.test(groups ?? "")) return "apply";
  if (/گیفت|کارت/.test(groups ?? "")) return "giftcards";
  return "other";
}

export interface ShopProduct {
  id: number;
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
  mainCategoryId: "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other";
  productType: "service";
  /** نظرات کاربران از API */
  userComments?: UserCommentItem[];
}

export function mapApiItemToShopProduct(item: ApiShopItem, index: number): ShopProduct {
  const id = Number(item.id ?? item.ID ?? index + 1) || index + 1;
  const name = String(item.title ?? item.name ?? item.Name ?? "—");
  const groups = String(item.groups ?? item.category ?? item.Category ?? "—");
  const price = Math.max(0, Number(item.price ?? item.Price ?? 0));
  const image = String(item.img ?? item.image ?? "/Images/Shop/product-pic1.jpg").trim() || "/Images/Shop/product-pic1.jpg";
  const rawText = String(item.text ?? "").trim() || "خرید از ريتكس.";
  const description =
    rawText
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join("\n\n") || "خرید از ريتكس.";
  const userComments = parseUserComments(item.UserComments);
  const reviewsCount = userComments.length || Math.max(0, Number(item.NumberOfComments ?? 0));
  const ratingsFromComments = userComments
    .map((c) => (typeof c.rating === "number" && c.rating >= 1 && c.rating <= 5 ? c.rating : null))
    .filter((r): r is number => r != null);
  const averageRating =
    ratingsFromComments.length > 0
      ? Math.round((ratingsFromComments.reduce((a, b) => a + b, 0) / ratingsFromComments.length) * 10) / 10
      : Number(item.Score ?? 5);
  return {
    id,
    name,
    price,
    image,
    rating: Math.min(5, Math.max(0, averageRating)),
    reviews: reviewsCount,
    isNew: false,
    category: groups,
    brand: "—",
    createdAt: new Date().toISOString().slice(0, 10),
    sales: Math.max(0, Number(item.value ?? item.stock ?? 0)),
    description,
    mainCategoryId: mapGroupToMainCategoryId(groups),
    productType: "service",
    userComments: userComments.length > 0 ? userComments : undefined,
  };
}

export async function fetchShopProducts(): Promise<ShopProduct[]> {
  const res = await fetch(getShopApiUrl(), { method: "GET", next: { revalidate: 120 } });
  const data = await res.json();
  if (!res.ok) throw new Error(typeof data?.message === "string" ? data.message : "خطا در دریافت محصولات");
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item: ApiShopItem, i: number) => mapApiItemToShopProduct(item, i));
}

/** دریافت یک محصول با نظرات از API (برای صفحهٔ جزئیات) */
export async function fetchProductById(id: number | string): Promise<ShopProduct | null> {
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  if (Number.isNaN(productId)) return null;
  try {
    const res = await fetch(`${getShopApiUrl()}&id=${productId}`, { method: "GET", next: { revalidate: 120 } });
    const data = await res.json();
    if (!res.ok) return null;
    const raw = data?.data ?? data?.item ?? data;
    const item = Array.isArray(raw) ? raw[0] : raw;
    if (!item || typeof item !== "object") return null;
    return mapApiItemToShopProduct(item as ApiShopItem, 0);
  } catch {
    return null;
  }
}

/** ارسال نظر جدید مطابق API: PostData('shopcomments', { idshop, rating, commentText, userName, userEmail, status }) */
const AUTH_PROXY = "/api/auth-proxy";

export async function submitProductComment(
  productId: number | string,
  payload: { author: string; email: string; content: string; rating: number }
): Promise<{ ok: boolean; message?: string }> {
  try {
    const idshop = typeof productId === "string" ? parseInt(productId, 10) : productId;
    const body = {
      idshop: Number.isNaN(idshop) ? productId : idshop,
      rating: Math.min(5, Math.max(1, payload.rating)) || 1,
      commentText: payload.content.trim(),
      userName: payload.author.trim(),
      userEmail: payload.email.trim(),
      status: "pending",
    };
    const res = await fetch(`${AUTH_PROXY}?action=shopcomments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg = typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) {
      return { ok: false, message: errMsg ?? "سرور ثبت نظر را قبول نکرد." };
    }
    if (!res.ok) {
      return { ok: false, message: errMsg ?? (data?.message as string) ?? "خطا در ثبت نظر" };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارسال نظر (اتصال به سرور برقرار نشد)." };
  }
}

/** ویرایش نظر توسط خود کاربر (ارسال userEmail برای تأیید در بک‌اند) */
export async function updateProductComment(
  productId: number | string,
  commentId: number | string,
  payload: { content: string; rating: number; userEmail: string }
): Promise<{ ok: boolean; message?: string }> {
  try {
    const idshop = typeof productId === "string" ? parseInt(productId, 10) : productId;
    const res = await fetch(`${AUTH_PROXY}?action=shopcomments`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: commentId,
        idshop: Number.isNaN(idshop) ? productId : idshop,
        commentText: payload.content.trim(),
        rating: Math.min(5, Math.max(1, payload.rating)) || 1,
        userEmail: payload.userEmail.trim(),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg = typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) return { ok: false, message: errMsg ?? "خطا در ویرایش نظر." };
    if (!res.ok) return { ok: false, message: errMsg ?? "خطا در ویرایش نظر." };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارتباط با سرور." };
  }
}

/** حذف نظر توسط خود کاربر (بک‌اند ممکن است با userEmail تأیید کند) */
export async function deleteProductComment(
  productId: number | string,
  commentId: number | string,
  userEmail: string
): Promise<{ ok: boolean; message?: string }> {
  try {
    const idshop = typeof productId === "string" ? parseInt(productId, 10) : productId;
    const url = `${AUTH_PROXY}?action=shopcomments&idshop=${encodeURIComponent(String(Number.isNaN(idshop) ? productId : idshop))}&id=${encodeURIComponent(String(commentId))}`;
    const res = await fetch(url, { method: "DELETE", headers: { "Content-Type": "application/json" } });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg = typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) return { ok: false, message: errMsg ?? "خطا در حذف نظر." };
    if (!res.ok) return { ok: false, message: errMsg ?? "خطا در حذف نظر." };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارتباط با سرور." };
  }
}
