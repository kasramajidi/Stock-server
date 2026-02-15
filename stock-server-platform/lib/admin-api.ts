/**
 * فراخوانی API با احراز هویت — برای پنل ادمین
 * توکن از کوکی (loginval) یا localStorage (token) خوانده می‌شود.
 */

import { getAuthCookie } from "@/lib/cookie";
import { AUTH_TOKEN_KEY } from "@/lib/cookie";

function getToken(): string {
  if (typeof window === "undefined") return "";
  try {
    const fromStorage = localStorage.getItem(AUTH_TOKEN_KEY);
    if (fromStorage) return fromStorage.trim();
  } catch {
    // ignore
  }
  return getAuthCookie();
}

export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = "Bearer " + token;
  return headers;
}

export async function adminFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<{ data?: T; ok: boolean; status: number; errors?: string[] }> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
      ...(options.headers as HeadersInit),
    },
  });
  let data: T | undefined;
  let errors: string[] | undefined;
  try {
    const json = await res.json();
    data = json as T;
    if (Array.isArray((json as { errors?: string[] }).errors)) {
      errors = (json as { errors: string[] }).errors;
    }
  } catch {
    // ignore
  }
  return { data, ok: res.ok, status: res.status, errors };
}

export interface MeUser {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

export interface MeResponse {
  success: boolean;
  user?: MeUser;
}
