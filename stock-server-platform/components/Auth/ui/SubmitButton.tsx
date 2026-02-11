 "use client";

import React from "react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function SubmitButton({
  children,
  loading,
  disabled,
  ...rest
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="submit"
      disabled={isDisabled}
      {...rest}
      className={`w-full flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
        rest.className ?? ""
      }`}
    >
      {loading && (
        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      <span>{children}</span>
    </button>
  );
}

