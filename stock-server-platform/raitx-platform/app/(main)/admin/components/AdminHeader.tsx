"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            پنل مدیریت
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-xs sm:text-sm text-gray-500 hover:text-[#ff5538] transition-colors"
            >
              بازگشت به سایت
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#ff5538] transition-colors disabled:opacity-50"
            >
              {loggingOut ? "در حال خروج…" : "خروج"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
