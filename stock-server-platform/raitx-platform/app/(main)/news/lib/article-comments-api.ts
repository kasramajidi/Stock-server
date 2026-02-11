/**
 * API کامنت مقاله — مطابق mrpremiumhub.org/api.ashx?action=articlecomments
 * GET: لیست نظرات یک مقاله (idarticle)
 * POST: افزودن کامنت
 * PATCH: ویرایش کامنت
 * DELETE: حذف کامنت (query: idarticle, id)
 */

const AUTH_PROXY = "/api/auth-proxy";

export interface ArticleCommentDisplayItem {
  id: number | string;
  author: string;
  content: string;
  rating: number;
  status: string;
  date?: string;
  userEmail: string;
}

function toId(v: unknown): number | string {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") return v;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

function normalizeForDisplay(raw: Record<string, unknown>): ArticleCommentDisplayItem {
  const dateRaw = raw.date ?? raw.Date ?? raw.createdAt ?? raw.CreatedAt;
  let dateStr: string | undefined;
  if (dateRaw != null) {
    const num = Number(dateRaw);
    dateStr = !Number.isNaN(num) ? String(dateRaw) : String(dateRaw);
  }
  const contentRaw = raw.commentText ?? raw.CommentText ?? raw.comment ?? raw.content ?? "";
  const authorRaw = raw.userName ?? raw.UserName ?? raw.author ?? "";
  return {
    id: toId(raw.id ?? raw.ID ?? 0),
    author: authorRaw != null ? String(authorRaw) : "",
    content: contentRaw != null ? String(contentRaw) : "",
    rating: Number(raw.rating ?? raw.Rating ?? 0),
    status: String(raw.status ?? raw.Status ?? "pending"),
    date: dateStr,
    userEmail: (raw.userEmail ?? raw.UserEmail ?? raw.email) != null ? String(raw.userEmail ?? raw.UserEmail ?? raw.email) : "",
  };
}

/** دریافت نظرات یک مقاله برای نمایش در صفحه عمومی */
export async function getArticleComments(articleId: number | string): Promise<ArticleCommentDisplayItem[]> {
  const url = `${AUTH_PROXY}?action=articlecomments&idarticle=${encodeURIComponent(String(articleId))}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as unknown;
  if (!res.ok) return [];
  const raw = Array.isArray(data) ? data : (data as Record<string, unknown>)?.data ?? (data as Record<string, unknown>)?.list ?? (data as Record<string, unknown>)?.items ?? (data as Record<string, unknown>)?.comments ?? [];
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((c: unknown) => c && typeof c === "object")
    .map((c: Record<string, unknown>) => normalizeForDisplay(c));
}

/** ارسال نظر جدید: PostData('articlecomments', { idarticle, rating, commentText, userName, userEmail, status }) */
export async function submitArticleComment(
  articleId: number | string,
  payload: { author: string; email: string; content: string; rating?: number }
): Promise<{ ok: boolean; message?: string }> {
  try {
    const idarticle = typeof articleId === "string" ? parseInt(articleId, 10) : articleId;
    const body = {
      idarticle: Number.isNaN(idarticle) ? articleId : idarticle,
      rating: Math.min(5, Math.max(1, payload.rating ?? 1)) || 1,
      commentText: payload.content.trim(),
      userName: payload.author.trim(),
      userEmail: payload.email.trim(),
      status: "pending",
    };
    const res = await fetch(`${AUTH_PROXY}?action=articlecomments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg =
      typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) {
      return { ok: false, message: errMsg ?? "سرور ثبت نظر را قبول نکرد." };
    }
    if (!res.ok) {
      return { ok: false, message: errMsg ?? "خطا در ثبت نظر" };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "خطا در ارسال نظر (اتصال به سرور برقرار نشد).",
    };
  }
}

/** ویرایش نظر: PATCHData('articlecomments', { idarticle, id, rating, commentText, userName, userEmail, status }) */
export async function updateArticleComment(
  articleId: number | string,
  commentId: number | string,
  payload: { content: string; rating?: number; userEmail: string }
): Promise<{ ok: boolean; message?: string }> {
  try {
    const idarticle = typeof articleId === "string" ? parseInt(articleId, 10) : articleId;
    const res = await fetch(`${AUTH_PROXY}?action=articlecomments`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: commentId,
        idarticle: Number.isNaN(idarticle) ? articleId : idarticle,
        commentText: payload.content.trim(),
        rating: Math.min(5, Math.max(1, payload.rating ?? 1)) || 1,
        userName: "",
        userEmail: payload.userEmail.trim(),
        status: "pending",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg =
      typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) return { ok: false, message: errMsg ?? "خطا در ویرایش نظر." };
    if (!res.ok) return { ok: false, message: errMsg ?? "خطا در ویرایش نظر." };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارتباط با سرور." };
  }
}

/** حذف نظر: DELETEData('articlecomments&idarticle=98&id=1') */
export async function deleteArticleComment(
  articleId: number | string,
  commentId: number | string,
  _userEmail?: string
): Promise<{ ok: boolean; message?: string }> {
  try {
    const url = `${AUTH_PROXY}?action=articlecomments&idarticle=${encodeURIComponent(String(articleId))}&id=${encodeURIComponent(String(commentId))}`;
    const res = await fetch(url, { method: "DELETE", headers: { "Content-Type": "application/json" } });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const errMsg =
      typeof data?.error === "string" ? data.error : typeof data?.message === "string" ? data.message : null;
    if (errMsg || data?.success === false) return { ok: false, message: errMsg ?? "خطا در حذف نظر." };
    if (!res.ok) return { ok: false, message: errMsg ?? "خطا در حذف نظر." };
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "خطا در ارتباط با سرور." };
  }
}
