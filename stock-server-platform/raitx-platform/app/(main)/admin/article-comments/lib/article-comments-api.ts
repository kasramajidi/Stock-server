const PROXY = "/api/auth-proxy";
const ACTION = "articlecomments";

export interface ArticleCommentItem {
  id: number | string;
  idarticle: number | string;
  rating: number;
  commentText: string;
  userName: string;
  userEmail: string;
  status: string;
  date?: string;
  articleTitle?: string;
}

function toId(value: unknown): number | string {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") return value;
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

function normalizeComment(raw: Record<string, unknown>, idarticle: number | string, articleTitle?: string): ArticleCommentItem {
  return {
    id: toId(raw.id ?? raw.ID ?? 0),
    idarticle,
    rating: Number(raw.rating ?? raw.Rating ?? 0),
    commentText: String(raw.commentText ?? raw.comment ?? raw.content ?? ""),
    userName: String(raw.userName ?? raw.UserName ?? raw.author ?? ""),
    userEmail: String(raw.userEmail ?? raw.UserEmail ?? raw.email ?? ""),
    status: String(raw.status ?? raw.Status ?? "pending"),
    date: raw.date ?? raw.Date ? String(raw.date ?? raw.Date) : undefined,
    articleTitle,
  };
}

function parseComments(value: unknown): Record<string, unknown>[] {
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

export interface ArticleOption {
  id: number | string;
  title: string;
}

export async function getArticlesForFilter(): Promise<ArticleOption[]> {
  const res = await fetch(`${PROXY}?action=Article`, {
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
    title: String(item.title ?? item.Title ?? item.name ?? "مقاله"),
  }));
}

async function getArticleCommentsFromApi(idarticleFilter?: number | string): Promise<ArticleCommentItem[] | null> {
  const url = idarticleFilter != null
    ? `${PROXY}?action=${ACTION}&idarticle=${encodeURIComponent(String(idarticleFilter))}`
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
      const idarticle = toId(c.idarticle ?? c.idArticle ?? c.IDArticle ?? 0);
      return normalizeComment(c, idarticle, undefined);
    });
}

export async function getArticleComments(idarticleFilter?: number | string): Promise<ArticleCommentItem[]> {
  const fromApi = await getArticleCommentsFromApi(idarticleFilter);
  if (fromApi != null && fromApi.length > 0) return fromApi;

  const res = await fetch(`${PROXY}?action=Article`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : "خطا در دریافت مقالات");
  const raw = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? [];
  if (!Array.isArray(raw)) return [];

  const articleTitles: Record<string, string> = {};
  const ids: (number | string)[] = [];
  raw.forEach((item: Record<string, unknown>, i: number) => {
    const id = toId(item.id ?? item.ID ?? i + 1);
    if (idarticleFilter != null && String(id) !== String(idarticleFilter)) return;
    ids.push(id);
    articleTitles[String(id)] = String(item.title ?? item.Title ?? item.name ?? "article");
  });

  const list: ArticleCommentItem[] = [];
  for (const idarticle of ids) {
    const singleRes = await fetch(`${PROXY}?action=${ACTION}&idarticle=${encodeURIComponent(String(idarticle))}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const singleData = await singleRes.json().catch(() => ({}));
    if (!singleRes.ok) continue;
    const rawComments = Array.isArray(singleData)
      ? singleData
      : singleData?.data ?? singleData?.list ?? singleData?.items ?? singleData?.comments ?? [];
    if (!Array.isArray(rawComments)) continue;
    const title = articleTitles[String(idarticle)] ?? "مقاله";
    rawComments
      .filter((c: unknown) => c && typeof c === "object")
      .forEach((c: Record<string, unknown>) => list.push(normalizeComment(c, idarticle, title)));
  }

  if (list.length === 0) {
    raw.forEach((item: Record<string, unknown>, i: number) => {
      const idarticle = toId(item.id ?? item.ID ?? i + 1);
      if (idarticleFilter != null && String(idarticle) !== String(idarticleFilter)) return;
      const title = String(item.title ?? item.Title ?? item.name ?? "article");
      const comments = parseComments(item.UserComments ?? item.userComments ?? item.comments);
      comments.forEach((c) => list.push(normalizeComment(c, idarticle, title)));
    });
  }

  return list;
}

export async function deleteArticleComment(idarticle: number | string, id: number | string): Promise<void> {
  const res = await fetch(
    `${PROXY}?action=${ACTION}&idarticle=${encodeURIComponent(String(idarticle))}&id=${encodeURIComponent(String(id))}`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : "خطا در حذف");
}
