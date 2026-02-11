"use client";

import React from "react";

export default function WalletSection() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          کیف پول
        </p>
        <p className="text-muted-foreground">موجودی: ۰ تومان</p>
      </section>
    </div>
  );
}
