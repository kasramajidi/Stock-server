"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export default function InputField({
  label,
  id,
  type = "text",
  error,
  showPasswordToggle = false,
  ...rest
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-600 text-right"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          {...rest}
          className={`w-full rounded-2xl border bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#17e2fe]/40 focus:border-[#17e2fe] transition-colors ${
            error ? "border-red-300" : "border-slate-200"
          } ${isPassword && showPasswordToggle ? "pl-10" : ""}`}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 text-right" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

