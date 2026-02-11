/**
 * API داشبورد مشتری — داده‌های mock یا اتصال به بک‌اند
 */

export const LOGIN_PHONE_KEY = "loginPhone";

export interface UserProfile {
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
}

export interface WalletBalance {
  total?: number;
  available?: number;
  blocked?: number;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: string;
  lastUpdate: string;
  messageNumber?: string;
}

export interface InvoiceItem {
  shopid?: number | string;
  userid?: string;
  quantity?: number;
  isPaid?: boolean;
  paymentStatus?: string;
  price?: number;
  id?: string | number;
  shop?: { id?: number; title?: string; price?: number; [key: string]: unknown };
  user?: { name?: string; phone?: string; [key: string]: unknown };
  [key: string]: unknown;
}

export function getLoginPhoneFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LOGIN_PHONE_KEY);
  } catch {
    return null;
  }
}

export function normalizePhoneForComparison(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) return digits.slice(0, 12);
  if (digits.startsWith("0") && digits.length >= 11) return "98" + digits.slice(1, 11);
  if (digits.startsWith("9") && digits.length >= 10) return "98" + digits.slice(0, 10);
  return digits;
}

/** پروفایل کاربر — از localStorage یا mock */
export async function fetchUserProfileFallback(): Promise<UserProfile | null> {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored) as Record<string, unknown>;
      const name = [user.name, user.username, user.fullName].find((x) => typeof x === "string") as string | undefined;
      return {
        name: name ?? undefined,
        username: (user.username as string) ?? name,
        phone: (user.phone as string) ?? undefined,
        email: (user.email as string) ?? undefined,
      };
    }
  } catch {
    // ignore
  }
  return null;
}

/** موجودی کیف پول — mock؛ بعداً به API واقعی وصل شود */
export async function fetchWalletBalance(): Promise<WalletBalance> {
  await new Promise((r) => setTimeout(r, 300));
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem("walletBalance");
    if (stored) {
      const parsed = JSON.parse(stored) as WalletBalance;
      return parsed;
    }
  } catch {
    // ignore
  }
  return { total: 0, available: 0, blocked: 0 };
}

/** فاکتورهای کاربر — mock؛ بعداً از API سفارش */
export async function fetchInvoicesForUser(): Promise<InvoiceItem[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [];
}

/** آخرین درخواست‌های پشتیبانی — mock */
export async function fetchRecentSupportTickets(): Promise<SupportTicket[]> {
  await new Promise((r) => setTimeout(r, 300));
  return [];
}
