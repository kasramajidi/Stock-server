"use client";

import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { signup } from "@/app/(main)/auth/lib/auth-api";
import { TERMS_TITLE, TERMS_FULL } from "@/app/(main)/auth/lib/terms-text";

interface RegisterFormProps {
  onSwitchToLogin?: (phone?: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const n = name.trim();
    const em = email.trim();
    const p = phone.trim();
    if (!n || !em || !p) {
      setError("نام، ایمیل و شماره تماس را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const data = await signup({ name: n, email: em, phone: p });
      const apiError = (data as { error?: string }).error;
      if (apiError) {
        setError(apiError);
      } else {
        try {
          await fetch("/api/register-log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: n, email: em, phone: p }),
          });
        } catch {
          // نادیده؛ فقط برای لاگ محلی
        }
        setSuccess("ثبت‌نام با موفقیت انجام شد. برای ورود از فرم ورود و رمز یکبار مصرف استفاده کنید.");
        setName("");
        setEmail("");
        setPhone("");
        onSwitchToLogin?.(p);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        عضویت
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 bg-green-50 py-2 px-3 rounded">
            {success}
          </p>
        )}
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-name"
          >
            نام
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-email"
          >
            آدرس ایمیل
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل را وارد کنید"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
        </div>
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="register-phone"
          >
            شماره تماس
          </label>
          <input
            id="register-phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹ یا ۹۸۹۱۲۳۴۵۶۷۸۹"
            className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            با ۰۹ شروع کنید (۱۱ رقم) یا ۹۸۹ (۱۲ رقم). اعداد فارسی یا انگلیسی قبول است.
          </p>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input
            id="register-terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ff5538] focus:ring-[#ff5538] cursor-pointer"
            aria-describedby="register-terms-desc"
          />
          <label id="register-terms-desc" htmlFor="register-terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1">
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-[#ff5538] cursor-pointer hover:opacity-80 transition-opacity font-medium underline underline-offset-1"
            >
              قوانین ريتكس
            </button>
            {" "}
            را خوانده و آن را تایید می‌کنم.
          </label>
        </div>

        {showTermsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
              <h2 id="terms-modal-title" className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 shrink-0">
                {TERMS_TITLE}
              </h2>
              <div className="p-4 overflow-y-auto text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {TERMS_FULL}
              </div>
              <div className="p-4 border-t border-gray-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="w-full py-2.5 px-4 cursor-pointerimage.png rounded-xl bg-[#ff5538] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}

        <SubmitButton disabled={loading || !termsAccepted}>
          {loading ? "در حال ثبت‌نام…" : "عضویت"}
        </SubmitButton>
        {onSwitchToLogin && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <button
                type="button"
                onClick={() => onSwitchToLogin()}
                className="text-[#ff5538] hover:opacity-80 cursor-pointer transition-opacity font-medium"
              >
                ورود
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
