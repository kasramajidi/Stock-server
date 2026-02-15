"use client";

import React, { useState } from "react";
import { Shield } from "lucide-react";
import { setAuthCookie, AUTH_USER_KEY, AUTH_TOKEN_KEY } from "@/lib/cookie";

function normalizeMobile(value: string): string {
  return value.replace(/\s/g, "").replace(/^\+98/, "0");
}

interface AdminLoginFormProps {
  onSuccess: () => void;
}

export default function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phone.trim() || !password) {
      setError("شماره موبایل و رمز عبور را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const mobile = normalizeMobile(phone.trim());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(Array.isArray(data.errors) && data.errors[0] ? data.errors[0] : "ورود انجام نشد. دوباره تلاش کنید.");
        return;
      }
      if (!data.success || !data.token || !data.user) {
        setError("پاسخ سرور نامعتبر است.");
        return;
      }
      setAuthCookie(data.token, true);
      try {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      } catch {
        // ignore
      }
      await new Promise((r) => setTimeout(r, 80));
      onSuccess();
    } catch {
      setError("خطا در ارتباط با سرور. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl"
        style={{ animation: "adminCardIn 0.4s ease-out" }}
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
            <Shield className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-100">ورود به پنل ادمین</h1>
            <p className="text-sm text-slate-400 mt-1">شماره موبایل و رمز عبور ادمین را وارد کنید.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-right">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="admin-login-phone" className="block text-sm font-medium text-slate-400 mb-1.5">
              شماره موبایل
            </label>
            <input
              id="admin-login-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="admin-login-pass" className="block text-sm font-medium text-slate-400 mb-1.5">
              رمز عبور
            </label>
            <input
              id="admin-login-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-medium text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center mt-4">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">
            بازگشت به سایت
          </a>
        </p>
      </div>
    </div>
  );
}
