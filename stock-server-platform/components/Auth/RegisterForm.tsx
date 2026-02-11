 "use client";

import React, { useState } from "react";
import InputField from "./ui/InputField";
import SubmitButton from "./ui/SubmitButton";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (!fullName || !phone || !password) {
        setError("نام، شماره موبایل و رمز عبور را کامل وارد کنید.");
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
        id="register-name"
        label="نام و نام خانوادگی"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="مثلاً علی رضایی"
      />
      <InputField
        id="register-phone"
        label="شماره موبایل"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
      />
      <InputField
        id="register-email"
        label="ایمیل (اختیاری)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@mail.com"
      />
      <InputField
        id="register-pass"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="حداقل ۸ کاراکتر"
      />

      <div className="flex items-start gap-2 text-xs text-slate-500">
        <input type="checkbox" className="mt-1 w-3.5 h-3.5 rounded border-slate-300" />
        <span>
          با ثبت‌نام،{" "}
          <span className="text-[#17e2fe] font-medium cursor-pointer">
            قوانین و مقررات استوک سرور
          </span>{" "}
          را می‌پذیرم.
        </span>
      </div>

      <SubmitButton loading={loading}>ثبت‌نام</SubmitButton>

      <p className="text-xs sm:text-sm text-slate-500 text-center">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#17e2fe] hover:text-[#14c8e0] font-semibold cursor-pointer"
        >
          ورود
        </button>
      </p>
    </form>
  );
}

