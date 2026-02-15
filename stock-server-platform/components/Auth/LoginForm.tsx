"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "./ui/InputField";
import SubmitButton from "./ui/SubmitButton";
import { setAuthCookie, AUTH_USER_KEY, AUTH_TOKEN_KEY } from "@/lib/cookie";

function normalizeMobile(value: string): string {
  return value.replace(/\s/g, "").replace(/^\+98/, "0");
}

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
      setAuthCookie(data.token, rememberMe);
      try {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      } catch {
        // ignore
      }
      const redirect = searchParams.get("redirect");
      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
      } else {
        router.push("/dashboard/accountDetails");
      }
    } catch {
      setError("خطا در ارتباط با سرور. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <p className="text-xs sm:text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-3 py-2 text-right">
          {error}
        </p>
      )}

      <InputField
        id="login-phone"
        label="شماره موبایل"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
      />

      <InputField
        id="login-pass"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="رمز عبور"
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded border-slate-300"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>مرا به خاطر بسپار</span>
        </label>
        <button
          type="button"
          className="text-[#17e2fe] hover:text-[#14c8e0] font-medium"
        >
          فراموشی رمز عبور
        </button>
      </div>

      <SubmitButton loading={loading}>ورود</SubmitButton>

      <p className="text-xs sm:text-sm text-slate-500 text-center">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#17e2fe] hover:text-[#14c8e0] font-semibold cursor-pointer"
        >
          ثبت‌نام کنید
        </button>
      </p>
    </form>
  );
}

