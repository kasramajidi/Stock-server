 "use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "./ui/InputField";
import SubmitButton from "./ui/SubmitButton";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // فقط برای دمو UI – اینجا فعلاً لاگین واقعی نداریم
    setTimeout(() => {
      setLoading(false);
      if (!phone || !password) {
        setError("شماره موبایل و رمز عبور را وارد کنید.");
      }
    }, 600);
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
          <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300" />
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

