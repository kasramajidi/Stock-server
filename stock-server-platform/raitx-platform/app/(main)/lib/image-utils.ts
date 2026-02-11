/**
 * دامنه‌هایی که سرور تصویرشان کند جواب می‌دهد و باعث timeout (۵۰۴) می‌شوند.
 * با unoptimized بارگذاری مستقیم در مرورگر انجام می‌شود و خطای upstream برطرف می‌شود.
 */
const SLOW_IMAGE_HOSTS = ["cms.tehranpayment.com"];

export function shouldUnoptimizeImage(src: string): boolean {
  if (!src || typeof src !== "string") return false;
  try {
    const u = new URL(src, "https://x");
    return SLOW_IMAGE_HOSTS.some((h) => u.hostname === h);
  } catch {
    return false;
  }
}
