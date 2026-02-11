/**
 * API داده‌های حساب کاربری — با ارسال کوکی برای داده‌های کاربر لاگین‌شده
 */

const PROXY = "/api/auth-proxy";
const fetchOpts: RequestInit = { credentials: "include", cache: "no-store" };

/** کلید localStorage برای شمارهٔ ورود (همان که کد اس‌ام‌اس براش فرستاده شده) */
export const LOGIN_PHONE_KEY = "loginPhone";

export interface UserProfile {
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
}

/** پاسخ API مربوط به action=users (طبق mrpremiumhub.org/api.ashx?action=users) */
export interface UsersApiItem {
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  userPhone?: string;
  phoneNumber?: string;
  isban?: boolean;
  cardNumber?: string;
  totalBalance?: number;
  availableBalance?: number;
  blockedBalance?: number;
}

function pickPhone(obj: Record<string, unknown> | null | undefined): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const raw =
    obj.phone ??
    obj.Phone ??
    obj.mobile ??
    obj.Mobile ??
    obj.userPhone ??
    obj.UserPhone ??
    obj.phoneNumber ??
    obj.PhoneNumber ??
    obj.tel;
  return typeof raw === "string" ? raw : undefined;
}

/** مقدار شبیه ایمیل را برای مقایسهٔ شماره قبول نمی‌کند */
function asPhoneOnly(value: string | undefined | null): string {
  if (value == null || typeof value !== "string") return "";
  const t = value.trim();
  return t.includes("@") ? "" : t; 
}

/** نرمال‌سازی شماره برای مقایسه: 09... / 98... / 9... → 98xxxxxxxxx (۱۲ رقم) */
export function normalizePhoneForComparison(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("98") && digits.length >= 12) return digits.slice(0, 12);
  if (digits.startsWith("0") && digits.length >= 11) return "98" + digits.slice(1, 11);
  if (digits.startsWith("9") && digits.length >= 10) return "98" + digits.slice(0, 10);
  return digits;
}

/** دریافت شمارهٔ ورود از localStorage (فقط سمت کلاینت) */
export function getLoginPhoneFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LOGIN_PHONE_KEY);
  } catch {
    return null;
  }
}

/**
 * دریافت کاربر فعلی از action=users.
 * وقتی API آرایه برمی‌گرداند، با شمارهٔ ورود (loginPhone) کاربر لاگین‌شده را پیدا می‌کند تا اطلاعات همان شماره نمایش داده شود.
 */
export async function fetchCurrentUserFromUsersApi(loginPhone?: string | null): Promise<UsersApiItem | null> {
  try {
    const res = await fetch(`${PROXY}?action=users`, fetchOpts);
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (data?.error) return null;

    const list = Array.isArray(data) ? data : [data];
    if (list.length === 0) return null;

    const loginNormalized = loginPhone ? normalizePhoneForComparison(asPhoneOnly(loginPhone)) : "";

    if (list.length === 1) {
      const user = list[0];
      if (user && typeof user === "object") {
        const u = user as Record<string, unknown>;
        return { ...user, phone: pickPhone(u) } as UsersApiItem;
      }
      return null;
    }

    if (loginNormalized) {
      for (let i = 0; i < list.length; i++) {
        const u = list[i] as Record<string, unknown>;
        const raw = pickPhone(u);
        if (!raw) continue;
        if (asPhoneOnly(raw) && normalizePhoneForComparison(raw) === loginNormalized) {
          return { ...list[i], phone: raw } as UsersApiItem;
        }
      }
    }

    const user = list[0];
    if (user && typeof user === "object") {
      const u = user as Record<string, unknown>;
      return { ...user, phone: pickPhone(u) } as UsersApiItem;
    }
    return null;
  } catch {
    return null;
  }
}

export interface WalletBalance {
  total?: number;
  available?: number;
  blocked?: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  orderType: string;
  lastUpdate: string;
  status: string;
  amount?: string;
  currencyAmount?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: string;
  lastUpdate: string;
  messageNumber?: string;
}

// ------------------- Invoice (ثبت سفارش) --------------------
/** آیتم فاکتور مطابق api.ashx?action=invoice */
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

/** پارامترهای GET فاکتور: دقیقاً مطابق mrpremiumhub.org — action=invoice&shopid=3&phone=989121234567&isPaid=false&inID=-1 */
export interface InvoiceGetParams {
  phone: string;
  shopid?: number | string;
  isPaid?: boolean;
  inID?: number | string;
}

function buildInvoiceGetUrl(params: InvoiceGetParams): string {
  const qs = new URLSearchParams({
    action: "invoice",
    shopid: params.shopid != null && params.shopid !== "" ? String(params.shopid) : "3",
    phone: params.phone,
    isPaid: params.isPaid !== undefined ? String(params.isPaid) : "false",
    inID: params.inID != null && params.inID !== "" ? String(params.inID) : "-1",
  });
  return `${PROXY}?${qs.toString()}`;
}

function parseInvoiceResponse(data: unknown): InvoiceItem[] {
  if (Array.isArray(data)) return data as InvoiceItem[];
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.data)) return o.data as InvoiceItem[];
    if (Array.isArray(o.invoices)) return o.invoices as InvoiceItem[];
    if (Array.isArray(o.items)) return o.items as InvoiceItem[];
    if (Array.isArray(o.result)) return o.result as InvoiceItem[];
  }
  return [];
}

/** نتیجهٔ GET فاکتور به‌همراه اطلاعات برای تشخیص مشکل */
export interface FetchInvoicesResult {
  list: InvoiceItem[];
  debug: {
    loginPhone: string | null;
    urlsTried: string[];
    firstStatus: number | null;
    firstResponse: unknown;
  };
}

/** فاکتورهای همین کاربر (GET با phone/userid). هر دو فرمت 98... و 09... امتحان می‌شود. */
export async function fetchInvoicesForUser(params?: Partial<Omit<InvoiceGetParams, "phone">>): Promise<InvoiceItem[]> {
  const r = await fetchInvoicesForUserWithDebug(params);
  return r.list;
}

/** مثل fetchInvoicesForUser ولی با اطلاعات دیباگ برای وقتی لیست خالی است */
export async function fetchInvoicesForUserWithDebug(params?: Partial<Omit<InvoiceGetParams, "phone">>): Promise<FetchInvoicesResult> {
  const loginPhone = getLoginPhoneFromStorage();
  const urlsTried: string[] = [];
  let firstStatus: number | null = null;
  let firstResponse: unknown = null;

  if (!loginPhone?.trim()) {
    return { list: [], debug: { loginPhone, urlsTried, firstStatus, firstResponse } };
  }

  const phoneNorm = normalizePhoneForComparison(asPhoneOnly(loginPhone));
  const phoneRaw = asPhoneOnly(loginPhone).trim();
  const phones = [phoneNorm, phoneRaw].filter(Boolean);
  const seen = new Set<string>();
  const toTry = phones.filter((p) => {
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });

  for (const phone of toTry) {
    const url = buildInvoiceGetUrl({ phone, ...params });
    urlsTried.push(url);
    const res = await fetch(url, fetchOpts);
    const data = await res.json().catch(() => ({}));
    if (firstStatus === null) {
      firstStatus = res.status;
      firstResponse = data;
    }
    const list = parseInvoiceResponse(data);
    if (list.length > 0) return { list, debug: { loginPhone, urlsTried, firstStatus, firstResponse } };
  }
  return { list: [], debug: { loginPhone, urlsTried, firstStatus, firstResponse } };
}

/**
 * ثبت سفارش (فاکتور) — POST به mrpremiumhub.org/api.ashx?action=invoice
 * بدنه: آرایهٔ آیتم‌ها با shopid, userid, quantity, isPaid, paymentStatus.
 * برای سازگاری با بک‌اندی که با 09... ذخیره می‌کند، فیلد phone (شمارهٔ خام) هم فرستاده می‌شود.
 * پاسخ موفق: {"statu":0} یا آرایه
 */
export async function createInvoice(items: InvoiceItem[]): Promise<boolean> {
  if (!items.length) return false;
  const loginPhoneRaw = getLoginPhoneFromStorage() ? asPhoneOnly(getLoginPhoneFromStorage()!).trim() : "";
  const body = items.map((item) => {
    const userid = item.userid ?? "";
    const row: Record<string, unknown> = {
      shopid: item.shopid,
      userid,
      quantity: item.quantity,
      isPaid: item.isPaid ?? false,
      paymentStatus: item.paymentStatus ?? "not payed",
      ...(item.price != null && { price: item.price }),
    };
    if (loginPhoneRaw && loginPhoneRaw !== userid) row.phone = loginPhoneRaw;
    return row;
  });
  const res = await fetch(`${PROXY}?action=invoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) return true;
  if (data && (data as { statu?: number }).statu === 0) return true;
  return false;
}

/** به‌روزرسانی فاکتور (PATCH) — مثلاً برای علامت‌زدن پرداخت‌شده */
export async function updateInvoice(id: string | number, payload: Partial<InvoiceItem>): Promise<boolean> {
  const res = await fetch(`${PROXY}?action=invoice&id=${encodeURIComponent(String(id))}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  if (data && (data as { statu?: number }).statu === 0) return true;
  return res.ok;
}

function toOrderItem(raw: Record<string, unknown>): OrderItem {
  const id = String(raw.id ?? raw.ID ?? raw.orderId ?? "");
  const orderNumber = String(raw.orderNumber ?? raw.OrderNumber ?? raw.id ?? raw.ID ?? "");
  const orderType = String(raw.orderType ?? raw.OrderType ?? raw.product ?? raw.Product ?? "—");
  const lastUpdate = String(raw.lastUpdate ?? raw.LastUpdate ?? raw.date ?? raw.Date ?? raw.updatedAt ?? "—");
  const status = String(raw.status ?? raw.Status ?? "—");
  const amount = raw.amount != null ? String(raw.amount) : undefined;
  const currencyAmount = raw.currencyAmount != null ? String(raw.currencyAmount) : amount;
  return { id, orderNumber, orderType, lastUpdate, status, amount, currencyAmount };
}

/** دریافت پروفایل کاربر (در صورت پشتیبانی بک‌اند: action=UserProfile یا GetProfile) */
export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${PROXY}?action=UserProfile`, fetchOpts);
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    if (data?.error) return null;
    return {
      name: data.name ?? data.Name ?? data.username ?? data.UserName,
      username: data.username ?? data.UserName,
      phone: pickPhone(data as Record<string, unknown>),
      email: data.email ?? data.Email,
    };
  } catch {
    return null;
  }
}

/** دریافت نام و پروفایل کاربر از API — اولویت با action=users. با شمارهٔ ورود، کاربر درست از آرایه انتخاب می‌شود. */
export async function fetchUserProfileFallback(): Promise<UserProfile | null> {
  const loginPhone = getLoginPhoneFromStorage();
  const fromUsers = await fetchCurrentUserFromUsersApi(loginPhone);
  const usersPhone = pickPhone(fromUsers as Record<string, unknown>);
  if (fromUsers?.name || fromUsers?.email || usersPhone) {
    return {
      name: fromUsers?.name ?? undefined,
      username: fromUsers?.name ?? undefined,
      phone: usersPhone ?? undefined,
      email: fromUsers?.email ?? undefined,
    };
  }

  // اگر در مرورگر هستیم، LoginCookie با کوکی فعلی را امتحان کن
  if (typeof window !== "undefined") {
    try {
      const { getAuthCookie } = await import("@/app/(main)/auth/lib/cookie");
      const cookie = getAuthCookie();
      if (cookie) {
        const res = await fetch(
          `${PROXY}?action=LoginCookie&Cookie=${encodeURIComponent(cookie)}`,
          fetchOpts
        );
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          if (!data?.error) {
            const name =
              data.name ??
              data.Name ??
              data.username ??
              data.UserName ??
              data.fullName ??
              data.FullName ??
              data.displayName;
            if (name) {
              return {
                name: String(name),
                username: data.username ?? data.UserName ?? data.name ?? data.Name,
                phone: pickPhone(data as Record<string, unknown>),
                email: data.email ?? data.Email,
              };
            }
          }
        }
      }
    } catch {
      // ادامه با actionهای دیگر
    }
  }

  const actions = [
    "UserProfile",
    "GetProfile",
    "Profile",
    "UserInfo",
    "GetUser",
    "User",
    "GetUserInfo",
    "CurrentUser",
    "Me",
    "Account",
  ];
  for (const action of actions) {
    try {
      const res = await fetch(`${PROXY}?action=${action}`, fetchOpts);
      if (!res.ok) continue;
      const data = await res.json().catch(() => ({}));
      if (data?.error || !data) continue;
      const name =
        data.name ??
        data.Name ??
        data.username ??
        data.UserName ??
        data.fullName ??
        data.FullName ??
        data.displayName;
      if (name) {
        return {
          name: String(name),
          username: data.username ?? data.UserName ?? data.name ?? data.Name,
          phone: pickPhone(data as Record<string, unknown>),
          email: data.email ?? data.Email,
        };
      }
    } catch {
      continue;
    }
  }
  return null;
}

function pickNumber(obj: Record<string, unknown>, ...keys: string[]): number | undefined {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    if (typeof v === "string") {
      const n = Number(v);
      if (!Number.isNaN(n)) return n;
    }
  }
  return undefined;
}

/** موجودی کیف پول — اول از action=users، بعد action=Wallet. total=کل، available=در دسترس، blocked=بلوکه‌شده */
export async function fetchWalletBalance(): Promise<WalletBalance> {
  const fromUsers = await fetchCurrentUserFromUsersApi();
  const u = fromUsers as Record<string, unknown> | null | undefined;
  if (u && typeof u === "object") {
    const total = pickNumber(u, "totalBalance", "TotalBalance", "total_balance", "total");
    const available = pickNumber(u, "availableBalance", "AvailableBalance", "available_balance", "available");
    const blocked = pickNumber(u, "blockedBalance", "BlockedBalance", "blocked_balance", "blocked");
    if (total != null || available != null || blocked != null) {
      return {
        total: total ?? undefined,
        available: available ?? total ?? undefined,
        blocked: blocked ?? 0,
      };
    }
  }
  try {
    const res = await fetch(`${PROXY}?action=Wallet`, fetchOpts);
    if (!res.ok) return {};
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (data?.error) return {};
    const obj = data;
    const nested = [obj, obj.data, obj.wallet, obj.balance].filter(
      (x): x is Record<string, unknown> => x != null && typeof x === "object"
    );
    for (const d of nested) {
      const total = pickNumber(d, "totalBalance", "TotalBalance", "total", "Total", "wallet", "Wallet");
      const available = pickNumber(d, "availableBalance", "AvailableBalance", "available", "Available");
      const blocked = pickNumber(d, "blockedBalance", "BlockedBalance", "blocked", "Blocked");
      if (total != null || available != null || blocked != null) {
        return {
          total: total ?? undefined,
          available: available ?? total ?? undefined,
          blocked: blocked ?? 0,
        };
      }
    }
    return {};
  } catch {
    return {};
  }
}

/** آخرین سفارش‌های کاربر */
export async function fetchRecentOrders(limit = 10): Promise<OrderItem[]> {
  try {
    const res = await fetch(`${PROXY}?action=Order`, fetchOpts);
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({}));
    const list = Array.isArray(data) ? data : data?.data ?? data?.list ?? data?.items ?? data?.orders ?? [];
    if (!Array.isArray(list)) return [];
    return list.slice(0, limit).map((item: Record<string, unknown>) => toOrderItem(item));
  } catch {
    return [];
  }
}

/** آخرین درخواست‌های پشتیبانی فقط همین کاربر (فیلتر سمت سرور با شمارهٔ ورود؛ بدون شماره لیست خالی برمی‌گردد) */
export async function fetchRecentSupportTickets(): Promise<SupportTicket[]> {
  try {
    const loginPhone = getLoginPhoneFromStorage();
    if (!loginPhone?.trim()) return [];
    const qs = `?phone=${encodeURIComponent(loginPhone.trim())}`;
    const res = await fetch(`/api/support/conversations${qs}`, { ...fetchOpts, credentials: "include" });
    if (!res.ok) return [];
    const list = await res.json().catch(() => []);
    if (!Array.isArray(list)) return [];
    return list.slice(0, 10).map((c: Record<string, unknown>) => ({
      id: String(c.id ?? ""),
      title: String(c.userName ?? c.userPhone ?? "پشتیبانی"),
      status: String(c.status ?? "در حال بررسی"),
      lastUpdate: String(c.updatedAt ?? c.createdAt ?? ""),
      messageNumber: String(c.id ?? ""),
    }));
  } catch {
    return [];
  }
}

/**
 * درخواست لینک پرداخت برای افزایش اعتبار کیف پول.
 * API: action=pay&phone=98...&money=...&cardNumber=...&Name=...
 * در صورت موفقیت آدرس درگاه پرداخت برمی‌گردد.
 */
export async function requestWalletPaymentLink(params: {
  phone: string;
  money: number;
  cardNumber: string;
  name: string;
}): Promise<string> {
  const phoneNorm = normalizePhoneForComparison(asPhoneOnly(params.phone));
  if (!phoneNorm) throw new Error("شماره تماس معتبر نیست.");
  if (!params.money || params.money <= 0) throw new Error("مبلغ را وارد کنید.");
  const card = params.cardNumber.replace(/\D/g, "");
  if (card.length < 16) throw new Error("شماره کارت باید ۱۶ رقم باشد.");
  const nameTrim = params.name.trim();
  if (!nameTrim) throw new Error("نام و نام خانوادگی را وارد کنید.");

  const qs = new URLSearchParams({
    action: "pay",
    phone: phoneNorm,
    money: String(params.money),
    cardNumber: card.slice(-16),
    Name: nameTrim,
  });
  const res = await fetch(`${PROXY}?${qs.toString()}`, { ...fetchOpts, method: "GET" });
  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text();

  if (!res.ok) {
    let errMsg = "دریافت لینک پرداخت ناموفق بود.";
    try {
      const data = JSON.parse(text) as { error?: string; message?: string };
      if (data?.error) errMsg = data.error;
      else if (data?.message) errMsg = data.message;
    } catch {
      if (text) errMsg = text.slice(0, 200);
    }
    throw new Error(errMsg);
  }

  /** درگاه پرداخت DirectPay — لینک نهایی با token از سرور */
  const DIRECTPAY_BASE = "https://api.directpay.finance/api/pardakht/payment";

  const trimmed = text.trim();

  /** استخراج URL یا توکن از پاسخ JSON با پشتیبانی چند فرمت رایج */
  function extractPaymentUrlOrToken(data: Record<string, unknown>): string | null {
    const keys = [
      "url", "paymentUrl", "payment_url", "PaymentURL",
      "link", "redirect", "redirect_url", "RedirectURL",
      "gatewayUrl", "gateway_url",
    ];
    for (const k of keys) {
      const v = data[k];
      if (typeof v === "string" && v.startsWith("http")) return v;
    }
    const d = data.data;
    if (typeof d === "string" && d.startsWith("http")) return d;
    if (d && typeof d === "object" && !Array.isArray(d)) {
      const inner = d as Record<string, unknown>;
      for (const k of ["url", "paymentUrl", "payment_url", "link"]) {
        const v = inner[k];
        if (typeof v === "string" && v.startsWith("http")) return v;
      }
      const t = inner.token;
      if (typeof t === "string" && t.trim()) return `${DIRECTPAY_BASE}?token=${encodeURIComponent(t.trim())}`;
    }
    const token = typeof data.token === "string" ? data.token.trim() : null;
    if (token) return `${DIRECTPAY_BASE}?token=${encodeURIComponent(token)}`;
    return null;
  }

  if (contentType.includes("application/json") || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      const data = JSON.parse(text) as Record<string, unknown>;
      if (data && typeof data === "object") {
        const statu = (data as { statu?: number }).statu;
        const success = (data as { success?: boolean }).success;
        if (statu === 0 || success === false) {
          const msg = typeof (data as { message?: string }).message === "string"
            ? (data as { message: string }).message
            : typeof (data as { error?: string }).error === "string"
              ? (data as { error: string }).error
              : "درگاه پرداخت پاسخی برگرداند که نشان‌دهندهٔ خطا بود.";
          throw new Error(msg);
        }
        const urlOrBuilt = extractPaymentUrlOrToken(data);
        if (urlOrBuilt) return urlOrBuilt;
      }
    } catch (e) {
      if (e instanceof Error && e.message !== "درگاه پرداخت پاسخی برگرداند که نشان‌دهندهٔ خطا بود.") throw e;
      if (e instanceof SyntaxError) {
        // پاسخ شبیه JSON نبود، ادامه با متن خام
      } else {
        throw e;
      }
    }
  }

  if (trimmed.startsWith("http")) return trimmed;
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return `${DIRECTPAY_BASE}?token=${encodeURIComponent(trimmed)}`;
  }
  const match = trimmed.match(/https?:\/\/[^\s"'\]]+/);
  if (match) return match[0];
  throw new Error("لینک پرداخت از سرور دریافت نشد. پاسخ: " + trimmed.slice(0, 80));
}

/** نتیجهٔ بررسی موجودی کیف پول برای پرداخت */
export interface WalletBalanceCheck {
  ok: boolean;
  totalBalance?: number;
  availableBalance?: number;
  blockedBalance?: number;
  message?: string;
}

/**
 * بررسی موجودی کاربر از API کاربران (action=users).
 * اگر totalBalance کمتر از مبلغ درخواستی باشد، ok=false و message خطا برمی‌گردد.
 */
export async function validateWalletBalance(amount: number): Promise<WalletBalanceCheck> {
  const loginPhone = getLoginPhoneFromStorage();
  const user = await fetchCurrentUserFromUsersApi(loginPhone ?? undefined);
  if (!user) {
    return { ok: false, message: "لطفاً وارد حساب کاربری شوید." };
  }
  const u = user as Record<string, unknown>;
  const totalBalance = pickNumber(u, "totalBalance", "TotalBalance", "total_balance", "total");
  const availableBalance = pickNumber(u, "availableBalance", "AvailableBalance", "available_balance", "available");
  const blockedBalance = pickNumber(u, "blockedBalance", "BlockedBalance", "blocked_balance", "blocked");
  const total = totalBalance ?? availableBalance ?? 0;
  if (total < amount) {
    return {
      ok: false,
      totalBalance: totalBalance ?? undefined,
      availableBalance: availableBalance ?? undefined,
      blockedBalance: blockedBalance ?? undefined,
      message: "موجودی کیف پول کافی نیست. مبلغ درخواستی بیشتر از موجودی شماست.",
    };
  }
  return {
    ok: true,
    totalBalance: totalBalance ?? undefined,
    availableBalance: availableBalance ?? undefined,
    blockedBalance: blockedBalance ?? undefined,
  };
}

/** نتیجهٔ پرداخت از کیف پول */
export interface PayFromWalletResult {
  success: boolean;
  error?: string;
  availableBalance?: number;
  blockedBalance?: number;
  totalBalance?: number;
}

/**
 * درخواست کسر مبلغ از کیف پول (سرور باید action=payFromWallet را پشتیبانی کند).
 * در صورت موفقیت موجودی جدید برمی‌گردد.
 */
export async function payFromWallet(amount: number): Promise<PayFromWalletResult> {
  const phone = getLoginPhoneFromStorage();
  const phoneNorm = phone ? normalizePhoneForComparison(asPhoneOnly(phone)) : "";
  if (!phoneNorm) {
    return { success: false, error: "شماره تماس معتبر نیست." };
  }
  if (!amount || amount <= 0) {
    return { success: false, error: "مبلغ معتبر نیست." };
  }
  try {
    const res = await fetch(`${PROXY}?action=payFromWallet`, {
      ...fetchOpts,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNorm, amount }),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      const errMsg =
        typeof data?.error === "string"
          ? data.error
          : typeof data?.message === "string"
            ? data.message
            : "پرداخت از کیف پول انجام نشد.";
      return { success: false, error: errMsg };
    }
    const availableBalance = pickNumber(data, "availableBalance", "AvailableBalance", "available");
    const blockedBalance = pickNumber(data, "blockedBalance", "BlockedBalance", "blocked");
    const totalBalance = pickNumber(data, "totalBalance", "TotalBalance", "total");
    return {
      success: true,
      availableBalance: availableBalance ?? undefined,
      blockedBalance: blockedBalance ?? undefined,
      totalBalance: totalBalance ?? undefined,
    };
  } catch {
    return { success: false, error: "خطا در ارتباط با سرور." };
  }
}

/**
 * در صورت عدم پشتیبانی سرور از payFromWallet، می‌توان بعد از پرداخت کیف پول
 * موجودی را به‌صورت محاسبه‌ای نمایش داد: کسر شده = مبلغ، مانده = available - مبلغ.
 */
export function getWalletBalanceAfterDeduct(
  availableBefore: number,
  blockedBefore: number,
  deductAmount: number
): { available: number; blocked: number; deducted: number } {
  const deducted = Math.min(deductAmount, Math.max(0, availableBefore));
  return {
    available: Math.max(0, availableBefore - deducted),
    blocked: blockedBefore,
    deducted,
  };
}
