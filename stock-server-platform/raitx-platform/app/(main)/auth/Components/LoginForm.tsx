"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { login, requestSmsPass, normalizePhoneForApi } from "@/app/(main)/auth/lib/auth-api";
import { setAuthCookie } from "@/app/(main)/auth/lib/cookie";
import { LOGIN_PHONE_KEY } from "@/app/(main)/my-account/lib/my-account-api";
import { TERMS_TITLE, TERMS_FULL } from "@/app/(main)/auth/lib/terms-text";

const AUTH_STORAGE_KEY = "loginval";

interface LoginFormProps {
  initialPhone?: string;
  onSwitchToRegister?: () => void;
  /** پس از ورود موفق، به این آدرس ریدایرکت شود (مثلاً /cart یا /checkout) */
  redirectNext?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialPhone = "",
  onSwitchToRegister,
  redirectNext,
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState(initialPhone);
  const [pass, setPass] = useState("");
  useEffect(() => {
    setPhone(initialPhone ?? "");
  }, [initialPhone]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const [otpCooldownSeconds, setOtpCooldownSeconds] = useState(0);

  useEffect(() => {
    if (otpCooldownSeconds <= 0) return;
    const t = setInterval(() => {
      setOtpCooldownSeconds((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [otpCooldownSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const p = phone.trim();
    const pw = pass.trim();
    if (!p || !pw) {
      setError("شماره تماس و رمز یکبار مصرف را وارد کنید.");
      return;
    }
    setLoading(true);
    try {
      const data = await login({ phone: p, pass: pw });
      if (data.cookie) {
        setAuthCookie(data.cookie, false);
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, data.cookie);
          const normalized = normalizePhoneForApi(p);
          const displayPhone = normalized.startsWith("98") && normalized.length === 12
            ? "0" + normalized.slice(2)
            : p.trim();
          localStorage.setItem(LOGIN_PHONE_KEY, displayPhone);
        }
        setSuccess("ورود با موفقیت انجام شد.");
        setPass("");
        const nextUrl = redirectNext && redirectNext.startsWith("/") ? redirectNext : "/my-account";
        router.replace(nextUrl, { scroll: false });
        return;
      } else {
        setError((data as { error?: string }).error || "ورود ناموفق بود.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSms = async () => {
    const p = phone.trim();
    if (!p) {
      setError("شماره تماس را وارد کنید.");
      return;
    }
    setError("");
    setSuccess("");
    setSmsLoading(true);
    try {
      const data = await requestSmsPass(p);
      const apiError = (data as { error?: string }).error;
      if (apiError) {
        const isSmsError =
          apiError.toLowerCase().includes("sms") ||
          apiError.toLowerCase().includes("send") ||
          apiError.toLowerCase().includes("failed");
        const message = isSmsError
          ? "ارسال پیامک ناموفق بود. شماره را با فرمت ۰۹۱۲۳۴۵۶۷۸۹ (۱۱ رقم با ۰۹) وارد کنید. در تست سرور ممکن است فقط برای برخی شماره‌ها پیامک فعال باشد؛ شماره ۰۹۰۴۴۲۸۴۵۲۵ را امتحان کنید یا با پشتیبانی تماس بگیرید."
          : apiError;
        setError(message);
        setSmsLoading(false);
        return;
      }
      const raw = data as Record<string, unknown>;
      const code =
        typeof raw.pass === "string"
          ? raw.pass
          : typeof raw.code === "string"
            ? raw.code
            : typeof raw.otp === "string"
              ? raw.otp
              : typeof raw.password === "string"
                ? raw.password
                : typeof raw.Pass === "string"
                  ? raw.Pass
                  : typeof raw.Code === "string"
                    ? raw.Code
                    : null;
      if (code) {
        setPass(code);
        setSuccess(
          `رمز یکبار مصرف: ${code} (در فیلد رمز قرار گرفت؛ از همین استفاده کنید.)`
        );
      } else {
        setSuccess("رمز یکبار مصرف به شماره شما ارسال شد. در صورت عدم دریافت، پاسخ سرور را با پشتیبانی چک کنید.");
      }
      setOtpCooldownSeconds(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ارسال رمز.");
    } finally {
      setSmsLoading(false);
    }
  };

  const otpButtonDisabled = smsLoading || otpCooldownSeconds > 0;
  const otpSecondsFa = new Intl.NumberFormat("fa-IR").format(otpCooldownSeconds);
  const otpButtonLabel =
    smsLoading
      ? "در حال ارسال…"
      : otpCooldownSeconds > 0
        ? `ارسال مجدد پس از ${otpSecondsFa} ثانیه`
        : "دریافت رمز";

  return (
    <div className="w-full">
      <h2 className="text-2xl mb-8 text-center font-semibold text-gray-900">
        ورود
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
            htmlFor="login-phone"
          >
            شماره تماس
          </label>
          <input
            id="login-phone"
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
        <div>
          <label
            className="block text-right text-gray-700 text-sm mb-1.5"
            htmlFor="login-pass"
          >
            رمز یکبار مصرف (اس‌ام‌اس)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="login-pass"
                name="pass"
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="رمز ارسال‌شده را وارد کنید"
                className="w-full bg-white border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#ff5538] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleRequestSms}
              disabled={otpButtonDisabled}
              className="whitespace-nowrap px-3 py-2.5 border border-[#ff5538] text-[#ff5538] rounded-lg hover:bg-[#ff5538] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {otpButtonLabel}
            </button>
          </div>
        </div>
        <div className="flex items-start gap-3 pt-2">
          <input
            id="login-terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ff5538] focus:ring-[#ff5538] cursor-pointer"
            aria-describedby="login-terms-desc"
          />
          <label id="login-terms-desc" htmlFor="login-terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="login-terms-modal-title">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
              <h2 id="login-terms-modal-title" className="text-lg font-semibold text-gray-900 p-4 border-b border-gray-200 shrink-0">
                {TERMS_TITLE}
              </h2>
              <div className="p-4 overflow-y-auto text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {TERMS_FULL}
              </div>
              <div className="p-4 border-t border-gray-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="w-full py-2.5 cursor-pointer px-4 rounded-xl bg-[#ff5538] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}
        <SubmitButton disabled={loading || !termsAccepted}>
          {loading ? "در حال ورود…" : "ورود"}
        </SubmitButton>
        {onSwitchToRegister && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#ff5538] hover:opacity-80 cursor-pointer transition-opacity font-medium"
              >
                عضویت
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
