 "use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/Auth/ui/AuthCard";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

function AuthContent() {
  const searchParams = useSearchParams();
  const modeRegister = searchParams.get("mode") === "register";
  const [isLogin, setIsLogin] = useState(!modeRegister);

  const title = isLogin ? "ورود به حساب کاربری" : "ثبت‌نام در استوک سرور";
  const description = isLogin
    ? "برای مدیریت سفارش‌ها و مشاهده سوابق خرید، وارد حساب کاربری خود شوید."
    : "با ایجاد حساب، سفارش‌های خود را سریع‌تر ثبت کنید و سوابق خرید را یکجا ببینید.";

  return (
    <main className="min-h-screen bg-slate-50/80 py-10 sm:py-14">
      <div className="mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k flex justify-center">
        <div className="w-full max-w-md">
          <AuthCard title={title} description={description}>
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </AuthCard>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center text-slate-500">
          در حال بارگذاری…
        </main>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

