"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import InputField from "./ui/InputField";
import SubmitButton from "./ui/SubmitButton";
import { setAuthCookie, AUTH_USER_KEY, AUTH_TOKEN_KEY } from "@/lib/cookie";
import { signupSchema } from "@/lib/validations/auth";

const TERMS_TEXT = `اطلاعات موردنیاز ما جهت ثبت سفارش و دلایل آن
استوک سرور با تاکید بر احترامی که برای حریم شخصی کاربران قائل است، برای خرید، ثبت نظر یا استفاده از برخی امکانات وب‌سایت اطلاعاتی را از کاربران درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کاربران ارائه دهد. برای پردازش و ارسال سفارش، اطلاعاتی مانند آدرس، شماره تلفن و ایمیل مورد نیاز است.
یادآوری می‌شود آدرس ایمیل و تلفن‌هایی که مشتری در پروفایل خود ثبت می‌کند، تنها آدرس ایمیل و تلفن‌های رسمی و مورد تایید مشتری است و تمام مکاتبات و پاسخ‌های شرکت از طریق آنها صورت می‌گیرد.
بنابراین درج آدرس، ایمیل و شماره تماس‌های همراه و ثابت توسط مشتری، به منزله مورد تایید بودن صحت آنها است و در صورتی که موارد فوق به صورت صحیح یا کامل درج نشده باشد، استوک سرور جهت اطمینان از صحت و قطعیت ثبت سفارش می‌تواند از مشتری، اطلاعات تکمیلی و بیشتری درخواست کند.

توجه داشته باشید :
تنها راه ارتباطی استوک سرور با مشتریان خود در حال حاضر آدرس ایمیل info@stockserver.ir بوده و کلیه اطلاعات سفارش ، خدمات و سرویس های ویژه از این طریق اطلاع رسانی می گردد.
بنابراین ارسال هرگونه پیامک تحت عنوان استوک سرور، با هر شماره تخلف و سوء استفاده از نام استوک سرور است و در صورت دریافت چنین پیامکی، لطفاً جهت پیگیری قانونی آن را به info@stockserver.ir اطلاع دهید.

حفظ اطلاعات کاربری
باید تاکید شود که حفظ و نگهداری رمز عبور و نام کاربری بر عهده کاربران است و لذا برای جلوگیری از هرگونه سواستفاده احتمالی، کاربران نباید آن اطلاعات را برای شخص دیگری فاش کنند. در صورتی که کاربر شماره همراه خود را به فردی دیگر واگذار کرد، جهت جلوگیری از سواستفاده یا مشکلات احتمالی کاربران باید شماره موبایل خود را در پروفایل تغییر داده و شماره جدیدی ثبت نمایند.

مسئولیت عدم محافظت از اطلاعات کاربری
مسئولیت هرگونه خسارت احتمالی که ناشی از عدم رعایت موارد فوق‌الذکر توسط کاربر باشد، با خود کاربر بوده وکاربر حق هر گونه ادعا علیه استوک سرور را از خود سلب می‌کند.

استوک سرور هویت شخصی کاربران را محرمانه می‌داند و اطلاعات شخصی آنان را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند، مگر اینکه با حکم مقام قضایی یا اداری صالحه یا طبق قوانین و مقررات رایج کشور موظف باشد در اختیار مراجع ذی‌صلاح قرار دهد. در این موارد هیچ گونه مسئولیت قانونی مبنی بر جبران خسارت برای استوک سرور وجود ندارد و کاربران با اعلام رضایت خود در استفاده از خدمات وب سایت ضمنا حق هرگونه اعتراض را از خود سلب نموده اند.`;

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    mobile?: string;
    email?: string;
    password?: string;
    acceptTerms?: string;
  }>({});

  useEffect(() => {
    if (showTerms) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showTerms]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowTerms(false);
    };
    if (showTerms) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showTerms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const parsed = signupSchema.safeParse({
      fullName: fullName.trim(),
      mobile: phone.trim().replace(/\s/g, "").replace(/^\+98/, "0"),
      email: email.trim(),
      password,
      acceptTerms,
    });

    if (!parsed.success) {
      const err = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        fullName: err.fullName?.[0],
        mobile: err.mobile?.[0],
        email: err.email?.[0],
        password: err.password?.[0],
        acceptTerms: err.acceptTerms?.[0],
      });
      setError(Object.values(err).flat().filter(Boolean)[0] ?? "لطفاً فیلدها را بررسی کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: parsed.data.fullName,
          mobile: parsed.data.mobile,
          email: parsed.data.email,
          password: parsed.data.password,
          acceptTerms: parsed.data.acceptTerms,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(Array.isArray(data.errors) ? data.errors.join(" ") : data.message || "خطا در ثبت‌نام.");
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
      router.push("/dashboard/accountDetails");
    } catch {
      setError("خطا در ارتباط با سرور.");
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
        id="register-name"
        label="نام و نام خانوادگی"
        value={fullName}
        onChange={(e) => { setFullName(e.target.value); setFieldErrors((p) => ({ ...p, fullName: undefined })); }}
        placeholder="مثلاً علی رضایی"
        error={fieldErrors.fullName}
      />
      <InputField
        id="register-phone"
        label="شماره موبایل"
        type="tel"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setFieldErrors((p) => ({ ...p, mobile: undefined })); }}
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
        error={fieldErrors.mobile}
      />
      <InputField
        id="register-email"
        label="ایمیل"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
        placeholder="example@mail.com"
        error={fieldErrors.email}
      />
      <InputField
        id="register-pass"
        label="رمز عبور"
        type="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
        placeholder="حداقل ۸ کاراکتر"
        error={fieldErrors.password}
        showPasswordToggle
      />

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            id="accept-terms"
            checked={acceptTerms}
            onChange={(e) => { setAcceptTerms(e.target.checked); setFieldErrors((p) => ({ ...p, acceptTerms: undefined })); }}
            className={`mt-1 w-3.5 h-3.5 shrink-0 rounded border-slate-300 ${fieldErrors.acceptTerms ? "ring-2 ring-red-400" : ""}`}
          />
          <label htmlFor="accept-terms" className="cursor-pointer">
            با ثبت‌نام،{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }}
              onKeyDown={(e) => e.key === "Enter" && setShowTerms(true)}
              className="text-[#17e2fe] hover:text-[#14c8e0] font-medium underline"
            >
              قوانین و مقررات استوک سرور
            </span>
            {" "}را می‌پذیرم.
          </label>
        </div>
        {fieldErrors.acceptTerms && (
          <p className="text-xs text-red-600 text-right" role="alert">
            {fieldErrors.acceptTerms}
          </p>
        )}
      </div>

      {showTerms &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowTerms(false)}
          >
            <div
              dir="rtl"
              className="relative w-full max-w-lg max-h-[85vh] rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between shrink-0 p-4 border-b">
                <h2 className="font-bold text-slate-800">قوانین و مقررات استوک سرور</h2>
                <button
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="بستن"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 text-sm text-slate-600 text-right scrollbar-hide">
                {TERMS_TEXT}
              </div>
              <div className="shrink-0 p-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      <SubmitButton loading={loading} disabled={!acceptTerms}>
        ثبت‌نام
      </SubmitButton>

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
