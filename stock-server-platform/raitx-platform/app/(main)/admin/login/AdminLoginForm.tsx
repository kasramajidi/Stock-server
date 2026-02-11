"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminLoginFormProps {
  nextPath?: string | null;
}

export default function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        const next = (nextPath && nextPath.trim()) || "/admin";
        router.push(next);
        router.refresh();
      } else {
        setError(data.error ?? "نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch {
      setError("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#f8f9fa]"
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#ff5538]/5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#ff5538]/5" />
      </div>

      <div className="w-full max-w-[400px] relative">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="h-1 w-full bg-[#ff5538]" />
          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#ff5538]/10 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-[#ff5538]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                ورود به پنل ادمین
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">ريتكس</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 py-3 px-4 rounded-xl">
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-sm font-medium text-gray-700 mb-2 text-right"
                >
                  نام کاربری
                </label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full h-12 bg-gray-50/80 border border-gray-200 rounded-xl px-4 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/25 focus:border-[#ff5538] focus:bg-white transition-all duration-200 text-sm"
                  placeholder="نام کاربری ادمین"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-gray-700 mb-2 text-right"
                >
                  رمز عبور
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full h-12 bg-gray-50/80 border border-gray-200 rounded-xl px-4 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/25 focus:border-[#ff5538] focus:bg-white transition-all duration-200 text-sm"
                  placeholder="رمز عبور"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#ff5538] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#ff5538]/25 hover:shadow-[#ff5538]/30 hover:opacity-95 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/50 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    در حال ورود…
                  </span>
                ) : (
                  "ورود به پنل"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          فقط مدیران سایت دسترسی دارند.
        </p>
      </div>
    </main>
  );
}

