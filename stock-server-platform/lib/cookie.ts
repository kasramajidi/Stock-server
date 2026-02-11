/**
 * مدیریت کوکی احراز هویت (نام: loginval).
 */

const AUTH_COOKIE_NAME = "loginval";
export const REMEMBER_ME_DAYS = 30;
export const SESSION_DAYS = 7;

export function setAuthCookie(value: string, rememberMe: boolean): void {
  const days = rememberMe ? REMEMBER_ME_DAYS : SESSION_DAYS;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie =
    AUTH_COOKIE_NAME + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
}

export function getAuthCookie(): string {
  if (typeof document === "undefined") return "";
  const name = AUTH_COOKIE_NAME + "=";
  const decoded = decodeURIComponent(document.cookie);
  const parts = decoded.split(";");
  for (let i = 0; i < parts.length; i++) {
    let c = parts[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length));
    }
  }
  return "";
}

export function deleteAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie =
    AUTH_COOKIE_NAME + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}
