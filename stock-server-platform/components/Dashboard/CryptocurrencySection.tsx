"use client";

import React from "react";
import { Coins } from "lucide-react";

export default function CryptocurrencySection() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/30 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
        <Coins size={22} strokeWidth={1.8} />
      </div>
      <p className="mt-4 text-[13px] font-medium text-foreground">رمزارز</p>
      <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
        خدمات مرتبط با رمزارز به زودی در این بخش در دسترس خواهد بود.
      </p>
    </div>
  );
}
