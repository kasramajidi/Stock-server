"use client";

import React from "react";
import { ChevronLeft, Loader2 } from "lucide-react";

interface ListEmptyStateProps {
  icon?: React.ReactNode | null;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
}

export default function ListEmptyState({
  icon,
  message,
  actionLabel,
  onAction,
  loading = false,
}: ListEmptyStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card py-10">
        <Loader2 size={24} className="animate-spin text-muted-foreground" strokeWidth={1.8} />
        <p className="text-[13px] text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card py-10 px-4">
      {icon != null && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground">
          {icon}
        </div>
      )}
      <p className="text-center text-[13px] text-muted-foreground">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--primary-hover)] hover:underline"
        >
          <ChevronLeft size={14} className="rotate-180" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
