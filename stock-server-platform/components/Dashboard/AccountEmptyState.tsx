"use client";

import React from "react";
import { Package, Clock, ChevronLeft } from "lucide-react";

interface AccountEmptyStateProps {
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  isComingSoon?: boolean;
}

export default function AccountEmptyState({
  message,
  buttonText,
  onButtonClick,
  icon,
  isComingSoon = false,
}: AccountEmptyStateProps) {
  if (isComingSoon) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/30 px-4 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
          <Clock size={20} strokeWidth={1.8} />
        </div>
        <p className="mt-4 text-[13px] font-medium text-foreground">به زودی</p>
        <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-muted-foreground">{message}</p>
        {buttonText && onButtonClick && (
          <button
            type="button"
            onClick={onButtonClick}
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
          >
            <ChevronLeft size={14} className="rotate-180" />
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  const Icon = icon ?? <Package size={24} className="text-muted-foreground" strokeWidth={1.8} />;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/30 px-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">{Icon}</div>
      <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground">{message}</p>
      {buttonText && onButtonClick && (
        <button
          type="button"
          onClick={onButtonClick}
          className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
        >
          <ChevronLeft size={14} className="rotate-180" />
          {buttonText}
        </button>
      )}
    </div>
  );
}
