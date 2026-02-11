 "use client";

import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export default function InputField({
  label,
  id,
  type = "text",
  error,
  ...rest
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-600 text-right"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...rest}
        className={`w-full rounded-2xl border bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#17e2fe]/40 focus:border-[#17e2fe] transition-colors ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      />
      {error && (
        <p className="text-xs text-red-600 text-right" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

