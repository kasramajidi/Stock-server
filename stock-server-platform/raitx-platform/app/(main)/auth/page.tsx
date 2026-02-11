"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/app/(main)/auth/Components/LoginForm";
import RegisterForm from "@/app/(main)/auth/Components/RegisterForm";
import MainContainer from "@/app/(main)/auth/Components/ui/MainContainer";

function AuthContent() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;
  const modeRegister = searchParams.get("mode") === "register";
  const [isLogin, setIsLogin] = useState(!modeRegister);
  const [initialPhone, setInitialPhone] = useState("");

  return (
    <main className="min-h-screen bg-white pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-md">
        <MainContainer>
          {isLogin ? (
            <LoginForm
              initialPhone={initialPhone}
              onSwitchToRegister={() => setIsLogin(false)}
              redirectNext={next}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={(phone) => {
                setInitialPhone(phone ?? "");
                setIsLogin(true);
              }}
            />
          )}
        </MainContainer>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">در حال بارگذاری…</div>}>
      <AuthContent />
    </Suspense>
  );
}
