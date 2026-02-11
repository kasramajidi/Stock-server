/**
 * API احراز هویت مطابق mrpremiumhub.org (صفحه تست API):
 * - POST action=signup  → نام، ایمیل، phone (98...)
 * - GET  action=smspass&phone=98...  → دریافت رمز یکبار مصرف (اس‌ام‌اس)
 * - GET  action=login&phone=98...&pass=...  → ورود، برگرداندن cookie
 * - GET  action=LoginCookie&Cookie=...  → ورود با کوکی ذخیره‌شده
 * در مرورگر از پروکسی /api/auth-proxy استفاده می‌شود تا CORS رفع شود.
 */

const API_BASE =
  typeof window !== "undefined" ? "/api/auth-proxy" : "https://mrpremiumhub.org/api.ashx";

/** تبدیل شماره به فرمت API: 09... یا ۰۹... → 989... (۱۱ رقم) */
export function normalizePhoneForApi(phone: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const digits = phone.trim().replace(/\s/g, "");
  let result = "";
  for (let i = 0; i < digits.length; i++) {
    const c = digits[i];
    if (c >= "0" && c <= "9") result += c;
    else {
      const p = persianDigits.indexOf(c);
      if (p !== -1) result += String(p);
    }
  }
  if (result.startsWith("0") && result.length === 11) {
    return "98" + result.slice(1);
  }
  if (result.startsWith("98") && result.length >= 12) return result;
  if (result.startsWith("9") && result.length === 10) return "98" + result;
  return result;
}

async function postData<T = unknown>(action: string, data: object): Promise<T> {
  const res = await fetch(`${API_BASE}?action=${encodeURIComponent(action)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/** GET مطابق GetData در تست: ?action=smspass&phone=98... یا ?action=login&phone=...&pass=... */
async function getData<T = unknown>(queryString: string): Promise<T> {
  const q = queryString.startsWith("action=") ? queryString : `action=${queryString}`;
  const res = await fetch(`${API_BASE}?${q}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/** پاسخ عمومی API (ممکن است cookie یا پیام خطا برگرداند) */
export interface AuthApiResponse {
  cookie?: string;
  error?: string;
  [key: string]: unknown;
}

/** ثبت‌نام: نام، ایمیل، شماره تماس (فرمت 09... یا ۹۸... قبول است) */
export async function signup(params: {
  name: string;
  email: string;
  phone: string;
}): Promise<AuthApiResponse> {
  const phone = normalizePhoneForApi(params.phone);
  return postData<AuthApiResponse>("signup", { ...params, phone });
}

/** دریافت رمز یکبار مصرف (اس‌ام‌اس). مطابق تست: GetData('smspass&phone=989111234') → ?action=smspass&phone=989... */
export async function requestSmsPass(phone: string): Promise<AuthApiResponse> {
  const normalized = normalizePhoneForApi(phone);
  if (normalized.length !== 12 || !normalized.startsWith("98")) {
    return { error: "شماره تماس معتبر نیست. با ۰۹ و ۱۱ رقم وارد کنید، مثل ۰۹۱۲۳۴۵۶۷۸۹" };
  }
  return getData<AuthApiResponse>(`action=smspass&phone=${encodeURIComponent(normalized)}`);
}

/** ورود با شماره و رمز اس‌ام‌اس. مطابق GetData('login&phone=989121234567&pass=452845') */
export async function login(params: {
  phone: string;
  pass: string;
}): Promise<AuthApiResponse> {
  const phone = normalizePhoneForApi(params.phone);
  return getData<AuthApiResponse>(
    `action=login&phone=${encodeURIComponent(phone)}&pass=${encodeURIComponent(params.pass)}`
  );
}

/** ورود با کوکی ذخیره‌شده. مطابق GetData('LoginCookie&Cookie='+...) */
export async function loginWithCookie(cookie: string): Promise<AuthApiResponse> {
  return getData<AuthApiResponse>(
    `action=LoginCookie&Cookie=${encodeURIComponent(cookie)}`
  );
}
