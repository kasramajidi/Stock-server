"use client";

import React from "react";
import { MapPin } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";

export default function AddressesSection() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          آدرس‌ها
        </p>
        <AccountEmptyState
        message="هنوز آدرسی ثبت نکرده‌اید."
        buttonText="افزودن آدرس"
        onButtonClick={() => {}}
        icon={<MapPin size={24} className="text-muted-foreground" strokeWidth={1.8} />}
      />
      </section>
    </div>
  );
}
