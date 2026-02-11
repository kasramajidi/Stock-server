"use client";

import React from "react";

export default function DashboardCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">سفارش‌ها</p>
        <p className="mt-1 text-2xl font-light">۰</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">آدرس‌ها</p>
        <p className="mt-1 text-2xl font-light">۰</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">کیف پول</p>
        <p className="mt-1 text-2xl font-light">۰ تومان</p>
      </div>
    </div>
  );
}
