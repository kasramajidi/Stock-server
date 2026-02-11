/**
 * API مدیریت نظرات / درخواست‌ها — مطابق ExamRegister
 * GET لیست از action=ExamRegister و DELETE با id
 */

const PROXY = "/api/auth-proxy";
const ACTION = "ExamRegister";

export interface CommentItem {
  id: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  date?: string;
  status?: string;
}

/** تبدیل تاریخ ISO، timestamp، /Date(ms)/ یا رشته به فرمت نمایش شمسی */
function formatDate(value: unknown): string {
  if (value == null || value === "") return "";
  let d: Date;
  if (typeof value === "number") {
    d = new Date(value);
  } else {
    const s = String(value).trim();
    if (!s) return "";
    const aspNetMatch = /\/Date\((-?\d+)\)\//.exec(s);
    if (aspNetMatch) {
      d = new Date(parseInt(aspNetMatch[1], 10));
    } else {
      d = new Date(s);
    }
  }
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return "";
  }
}

function normalizeItem(raw: Record<string, unknown>): CommentItem {
  const id = String(raw.id ?? raw.Id ?? raw.ID ?? "");
  const title = String(raw.title ?? raw.Title ?? "");
  const name = String(raw.name ?? raw.Name ?? raw.author ?? "");
  const email = String(raw.email ?? raw.Email ?? "");
  const phone = String(raw.phone ?? raw.Phone ?? "");
  const comment = String(raw.comment ?? raw.Comment ?? raw.content ?? "");
  const dateRaw =
    raw.date ??
    raw.Date ??
    raw.createdAt ??
    raw.CreatedAt ??
    raw.createDate ??
    raw.CreateDate ??
    raw.registerDate ??
    raw.RegisterDate ??
    raw.insertDate ??
    raw.InsertDate;
  const date = dateRaw != null ? formatDate(dateRaw) : "";
  const status = String(raw.status ?? raw.Status ?? "").trim() || undefined;
  return {
    id,
    title,
    name,
    email,
    phone,
    comment,
    date: date || undefined,
    status,
  };
}

/** دریافت لیست درخواست‌ها از API (ExamRegister) */
export async function getComments(): Promise<CommentItem[]> {
  const res = await fetch(`${PROXY}?action=${ACTION}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "خطا در دریافت درخواست‌ها"
    );
  }
  const list = Array.isArray(data) ? data : data?.data ?? data?.items ?? [];
  return list.map((item: Record<string, unknown>) => normalizeItem(item));
}

/** حذف درخواست با id */
export async function deleteComment(id: string): Promise<void> {
  const res = await fetch(
    `${PROXY}?action=${ACTION}&id=${encodeURIComponent(id)}`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof data?.error === "string" ? data.error : "خطا در حذف"
    );
  }
}
