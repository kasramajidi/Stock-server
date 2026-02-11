/**
 * آمار داشبورد ادمین از API — فقط مواردی که داده دارند نمایش داده می‌شوند.
 */

const PROXY = "/api/auth-proxy";

export interface DashboardStats {
  articles: number;
  products: number;
  comments: number;
  orders?: number;
}

async function fetchCount(action: string): Promise<number> {
  try {
    const res = await fetch(`${PROXY}?action=${encodeURIComponent(action)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return 0;
    const list = Array.isArray(data)
      ? data
      : data?.data ?? data?.list ?? data?.items ?? data?.products ?? [];
    return Array.isArray(list) ? list.length : 0;
  } catch {
    return 0;
  }
}

/** دریافت آمار داشبورد از API */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [articles, products, comments, orders] = await Promise.all([
    fetchCount("Article"),
    fetchCount("shop"),
    fetchCount("ExamRegister"),
    fetchCount("Order").catch(() => 0),
  ]);
  return { articles, products, comments, orders };
}

export interface OrderItem {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

function normalizeOrder(raw: Record<string, unknown>): OrderItem {
  const id = String(raw.id ?? raw.ID ?? raw.orderId ?? "");
  const customer = String(raw.customer ?? raw.Customer ?? raw.name ?? "");
  const product = String(raw.product ?? raw.Product ?? raw.title ?? "");
  const amount = String(raw.amount ?? raw.Amount ?? raw.price ?? "");
  const status = String(raw.status ?? raw.Status ?? "");
  const date = String(raw.date ?? raw.Date ?? raw.createdAt ?? "");
  return { id, customer, product, amount, status, date };
}

/** دریافت سفارشات اخیر از API (در صورت وجود) */
export async function getRecentOrders(): Promise<OrderItem[]> {
  try {
    const res = await fetch(`${PROXY}?action=Order`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return [];
    const list = Array.isArray(data)
      ? data
      : data?.data ?? data?.list ?? data?.items ?? data?.orders ?? [];
    if (!Array.isArray(list)) return [];
    return list.slice(0, 10).map((item: Record<string, unknown>) => normalizeOrder(item));
  } catch {
    return [];
  }
}
