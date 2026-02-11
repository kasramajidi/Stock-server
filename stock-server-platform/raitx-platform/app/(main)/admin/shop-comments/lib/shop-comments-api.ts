/**
 * کامنت فروشگاه:
 * - نمایش: از API محصولات (action=shop) فیلد UserComments هر محصول
 * - ویرایش/حذف: API shopcomments (PATCH, DELETE)
 */

const PROXY = "/api/auth-proxy";
const ACTION = "shopcomments";

export interface ShopCommentItem {
  id: number | string;
  idshop: number | string;
  rating: number;
  commentText: string;
  userName: string;
  userEmail: string;
  status: string;
  reply?: string;
  date?: string;
  productTitle?: string;
}

function toId(value: unknown): number | string {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") return value;
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

function normalizeComment(raw: Record<string, unknown>, idshop: number | string, productTitle?: string): ShopCommentItem {
  const commentRaw = raw.commentText ?? raw.CommentText ?? raw.comment ?? raw.content ?? "";
  const nameRaw = raw.userName ?? raw.UserName ?? raw.author ?? "";
  const emailRaw = raw.userEmail ?? raw.UserEmail ?? raw.email ?? "";
  return {
    id: toId(raw.id ?? raw.ID ?? 0),
    idshop,
    rating: Number(raw.rating ?? raw.Rating ?? 0),
    commentText: commentRaw != null ? String(commentRaw) : "",
    userName: nameRaw != null ? String(nameRaw) : "",
    userEmail: emailRaw != null ? String(emailRaw) : "",
    status: String(raw.status ?? raw.Status ?? "pending"),
    reply: raw.reply != null ? String(raw.reply) : undefined,
    date: raw.date ?? raw.Date ? String(raw.date ?? raw.Date) : undefined,
    productTitle,
  };
}

function parseUserComments(value: unknown): Record<string, unknown>[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value.filter((c) => c && typeof c === "object") as Record<string, unknown>[];
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value as string) as unknown;
    return Array.isArray(parsed) ? (parsed.filter((c) => c && typeof c === "object") as Record<string, unknown>[]) : [];
  } catch {
    return [];
  }
}

export interface ShopProductOption {
  id: number | string;
  name: string;
}

/** دریافت لیست محصولات برای فیلتر (از API فروشگاه) */
export async function getShopProductsForFilter(): Promise<ShopProductOption[]> {
  const res = await fetch(`${PROXY}?action=shop`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return [];
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item: Record<string, unknown>, i: number) => ({
    id: toId(item.id ?? item.ID ?? i + 1),
    name: String(item.title ?? item.name ?? item.Name ?? "محصول"),
  }));
}

/** تلاش برای دریافت نظرات از API مستقیم shopcomments (GET) — در صورت پشتیبانی سرور */
async function getShopCommentsFromApi(idshopFilter?: number | string): Promise<ShopCommentItem[] | null> {
  const url = idshopFilter != null
    ? `${PROXY}?action=${ACTION}&idshop=${encodeURIComponent(String(idshopFilter))}`
    : `${PROXY}?action=${ACTION}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return null;
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? data?.comments ?? [];
  if (!Array.isArray(raw)) return null;
  return raw
    .filter((c: Record<string, unknown>) => c && typeof c === "object")
    .map((c: Record<string, unknown>) => {
      const idshop = toId(c.idshop ?? c.idShop ?? c.IDShop ?? 0);
      return normalizeComment(c, idshop, undefined);
    });
}

/**
 * دریافت نظرات:
 * ۱) اگر GET shopcomments لیست برگرداند استفاده می‌کنیم.
 * ۲) وگرنه لیست محصولات از action=shop می‌گیریم و برای هر محصول action=shop&id=... را صدا می‌زنیم
 *    (در پاسخ تک‌محصول معمولاً UserComments وجود دارد).
 */
export async function getShopCommentsFromProducts(idshopFilter?: number | string): Promise<ShopCommentItem[]> {
  const fromApi = await getShopCommentsFromApi(idshopFilter);
  if (fromApi != null && fromApi.length > 0) return fromApi;

  const res = await fetch(`${PROXY}?action=shop`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "خطا در دریافت محصولات");
  }
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? [];
  if (!Array.isArray(raw)) return [];

  const productIds: number[] = [];
  const productTitles: Record<string, string> = {};
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i] as Record<string, unknown>;
    const id = Number(item.id ?? item.ID ?? i + 1) || i + 1;
    if (idshopFilter != null && String(id) !== String(idshopFilter)) continue;
    productIds.push(id);
    productTitles[String(id)] = String(item.title ?? item.name ?? item.Name ?? "");
  }

  const list: ShopCommentItem[] = [];
  for (const idshop of productIds) {
    const singleRes = await fetch(`${PROXY}?action=shop&id=${encodeURIComponent(String(idshop))}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const singleData = await singleRes.json().catch(() => ({}));
    if (!singleRes.ok) continue;
    const one = (Array.isArray(singleData) ? singleData[0] : singleData?.data ?? singleData?.item ?? singleData) as Record<string, unknown> | undefined;
    if (!one || typeof one !== "object") continue;
    const productTitle = productTitles[String(idshop)] || String(one.title ?? one.name ?? one.Name ?? "");
    const userComments = parseUserComments(one.UserComments ?? one.userComments);
    userComments.forEach((c) => {
      list.push(normalizeComment(c, idshop, productTitle || undefined));
    });
  }

  if (list.length === 0) {
    for (let i = 0; i < raw.length; i++) {
      const item = raw[i] as Record<string, unknown>;
      const idshop = Number(item.id ?? item.ID ?? i + 1) || i + 1;
      if (idshopFilter != null && String(idshop) !== String(idshopFilter)) continue;
      const productTitle = String(item.title ?? item.name ?? item.Name ?? "");
      const userComments = parseUserComments(item.UserComments ?? item.userComments);
      userComments.forEach((c) => {
        list.push(normalizeComment(c, idshop, productTitle || undefined));
      });
    }
  }

  return list;
}

/** ویرایش کامنت (وضعیت انتشار، پاسخ و غیره) */
export async function updateShopComment(payload: {
  id: number | string;
  idshop: number | string;
  rating?: number;
  commentText?: string;
  userName?: string;
  userEmail?: string;
  status?: string;
  reply?: string;
}): Promise<void> {
  const res = await fetch(`${PROXY}?action=${ACTION}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "خطا در ویرایش");
  }
}

/** حذف کامنت */
export async function deleteShopComment(idshop: number | string, id: number | string): Promise<void> {
  const res = await fetch(
    `${PROXY}?action=${ACTION}&idshop=${encodeURIComponent(String(idshop))}&id=${encodeURIComponent(String(id))}`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "خطا در حذف");
  }
}
