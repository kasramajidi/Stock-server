"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { fetchUserProfileFallback } from "../lib/my-account-api";

export default function WelcomeBox() {
  const [username, setUsername] = useState("کاربر");

  useEffect(() => {
    let mounted = true;
    // اول از API اسم را بگیر (با کوکی لاگین)
    fetchUserProfileFallback().then((profile) => {
      if (!mounted) return;
      if (profile?.name) {
        setUsername(profile.name);
        if (typeof localStorage !== "undefined") {
          try {
            const prev = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...prev, username: profile.name, name: profile.name }));
          } catch {}
        }
        return;
      }
      // اگر API چیزی برنگرداند، از localStorage استفاده کن
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored);
          if (user?.username || user?.name) setUsername(user.username || user.name || "کاربر");
        }
      } catch {}
    });
    return () => { mounted = false; };
  }, []);

  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-full bg-[#ff5538]" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 pr-1">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff5538] text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ff5538]/10 px-2 py-0.5 text-xs font-medium text-[#ff5538]">
            <Sparkles size={12} />
            پیشخوان
          </span>
          <h2 className="mt-1.5 text-lg font-bold text-gray-900">
            سلام، {username}
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            از اینجا سفارش‌ها، آدرس‌ها و تنظیمات حساب را مدیریت کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
