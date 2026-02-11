"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";
import Cart from "./page";

export default function CartPageClient() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cookie = getAuthCookie()?.trim() ?? "";
    let hasStoredUser = false;
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const o = JSON.parse(raw);
        hasStoredUser = !!o && typeof o === "object" && (o.phone ?? o.token ?? o.username ?? o.name);
      }
    } catch {
      // ignore
    }
    setIsAuth(cookie !== "" || hasStoredUser);
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!isAuth) {
      router.replace("/auth?next=/cart");
      return;
    }
  }, [authChecked, isAuth, router]);

  if (!authChecked) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">در حال بارگذاری…</p>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">در حال انتقال به صفحهٔ ورود…</p>
      </div>
    );
  }

  return <Cart />;
}

