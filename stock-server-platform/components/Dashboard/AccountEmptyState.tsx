"use client";

import type { ReactNode } from "react";

interface AccountEmptyStateProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  icon?: ReactNode;
  isComingSoon?: boolean;
}

export default function AccountEmptyState({
  message,
  buttonText,
  onButtonClick,
  icon,
  isComingSoon,
}: AccountEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <p className="text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onButtonClick}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {buttonText}
      </button>
      {isComingSoon && (
        <span className="text-xs text-muted-foreground">به زودی</span>
      )}
    </div>
  );
}
