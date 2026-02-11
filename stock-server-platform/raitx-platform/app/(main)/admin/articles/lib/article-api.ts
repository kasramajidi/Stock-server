const API_BASE = "https://mrpremiumhub.org/api.ashx";

export interface ApiArticleRelatedService {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface ApiArticle {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
  headings: string[];
  Relatedservice?: ApiArticleRelatedService;
}

function handleResponse<T>(res: Response): Promise<T> {
  return res.json().then((data) => {
    if (!res.ok) {
      const msg =
        (typeof (data as { error?: string }).error === "string" && (data as { error?: string }).error) ||
        (typeof (data as { message?: string }).message === "string" && (data as { message?: string }).message) ||
        `خطای سرور (کد: ${res.status})`;
      throw new Error(msg);
    }
    return data as T;
  });
}

/** نرمال‌سازی یک مقاله از API (برگرداندن Category با C بزرگ به category) */
function normalizeArticle(raw: Record<string, unknown>): ApiArticle {
  const cat = raw.category ?? raw.Category;
  const category = cat != null && String(cat).trim() !== "" ? String(cat).trim() : null;
  return {
    id: Number(raw.id ?? raw.ID ?? 0),
    title: String(raw.title ?? raw.Title ?? ""),
    slug: String(raw.slug ?? raw.Slug ?? ""),
    category,
    image: String(raw.image ?? raw.Image ?? "").trim() || "/Images/Shop/product-pic1.jpg",
    date: String(raw.date ?? raw.Date ?? ""),
    comments: Number(raw.comments ?? raw.Comments ?? 0),
    content: Array.isArray(raw.content) ? raw.content.map(String) : [],
    headings: Array.isArray(raw.headings) ? raw.headings.map(String) : [],
    Relatedservice: raw.Relatedservice as ApiArticle["Relatedservice"],
  };
}

export async function getArticles(): Promise<ApiArticle[]> {
  try {
    const res = await fetch(`${API_BASE}?action=Article&_t=${Date.now()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await handleResponse<unknown>(res);
    if (!Array.isArray(data)) return [];
    return data.map((item) => normalizeArticle(typeof item === "object" && item != null ? (item as Record<string, unknown>) : {}));
  } catch {
    // در صورت خطا
  }
  return [];
}

/** دسته‌بندی‌های یکتا از API مقالات (برای پر کردن فیلد دسته‌بندی در فرم) */
export async function getArticleCategories(): Promise<string[]> {
  const list = await getArticles();
  const set = new Set<string>();
  list.forEach((a) => {
    if (a.category && String(a.category).trim()) set.add(String(a.category).trim());
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b, "fa"));
}

export async function createArticle(payload: {
  title: string;
  slug: string;
  category: string;
  image?: string;
  date?: string;
  comments?: number;
  content: string[];
  headings: string[];
  relatedService?: ApiArticleRelatedService;
}): Promise<ApiArticle> {
  const categoryValue = (payload.category ?? "").trim();
  const body: Record<string, unknown> = {
    title: payload.title,
    slug: payload.slug,
    Category: categoryValue,
    category: categoryValue,
    image: payload.image ?? "/Images/Shop/product-pic1.jpg",
    date: payload.date ?? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
    comments: payload.comments ?? 0,
    content: payload.content,
    headings: payload.headings,
    relatedService: payload.relatedService,
  };
  const res = await fetch(`${API_BASE}?action=Article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const raw = await handleResponse<Record<string, unknown>>(res);
  const normalized = normalizeArticle(raw ?? {});
  if (normalized.category == null && categoryValue) {
    return { ...normalized, category: categoryValue };
  }
  return normalized;
}

export async function updateArticle(payload: {
  id: number;
  title?: string;
  slug?: string;
  category?: string | null;
  image?: string;
  date?: string;
  comments?: number;
  content?: string[];
  headings?: string[];
  relatedService?: ApiArticleRelatedService;
  fullArticle?: ApiArticle;
}): Promise<ApiArticle> {
  const full = payload.fullArticle;
  if (!full) {
    throw new Error("برای ویرایش، fullArticle الزامی است");
  }

  // بک‌اند آپدیت واقعی ندارد؛ اول مقالهٔ جدید می‌سازیم، بعد قدیمی را حذف می‌کنیم
  const created = await createArticle({
    title: full.title ?? "",
    slug: full.slug ?? "",
    category: full.category ?? "",
    image: full.image || "/Images/Shop/product-pic1.jpg",
    date: full.date ?? "",
    comments: full.comments ?? 0,
    content: full.content ?? [],
    headings: full.headings ?? [],
    relatedService: full.Relatedservice ?? undefined,
  });
  await new Promise((r) => setTimeout(r, 300));
  await deleteArticle(payload.id);
  return created;
}

export async function deleteArticle(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}?action=Article&id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  await handleResponse<unknown>(res);
}
