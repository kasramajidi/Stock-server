"use client";

import React from "react";
import { Coins } from "lucide-react";

export default function CryptocurrencySection() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">رمزارز</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          خدمات مرتبط با رمزارز به زودی در این بخش در دسترس خواهد بود.
        </p>
      </div>

      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50/50 p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff5538]/10 text-[#ff5538]">
          <Coins size={26} strokeWidth={2} />
        </div>
        <p className="mt-4 max-w-sm text-center text-sm text-gray-500">
          امکان خرید، فروش و مدیریت رمزارز در نسخه‌های بعدی پلتفرم اضافه می‌شود.
        </p>
      </div>
    </div>
  );
}
