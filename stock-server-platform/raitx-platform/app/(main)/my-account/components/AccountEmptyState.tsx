"use client";

import React from "react";
import { Package, Clock, ArrowLeft } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Clock size={28} strokeWidth={2} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-900">به زودی</h3>
        <p className="mt-1.5 max-w-sm text-center text-sm leading-relaxed text-gray-500">
          {message}
        </p>
        {buttonText && onButtonClick && (
          <button
            type="button"
            onClick={onButtonClick}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-[#ff5538] bg-white px-5 py-2.5 text-sm font-medium text-[#ff5538] hover:bg-[#ff5538] hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  const Icon = icon ?? <Package size={32} className="text-gray-400" strokeWidth={2} />;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-14">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100">
        {Icon}
      </div>
      <p className="mt-4 max-w-sm text-center text-sm leading-relaxed text-gray-600">
        {message}
      </p>
      {buttonText && onButtonClick && (
        <button
          type="button"
          onClick={onButtonClick}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ff5538] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#e6452e]"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
