"use client";

import React from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
}

export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
  rightIcon,
  className = "",
  rows,
}: FormInputProps) {
  const inputClasses = `w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#ff5538] focus:ring-1 focus:ring-[#ff5538] transition-colors ${className}`;

  return (
    <div>
      <label className="block text-right text-gray-700 text-sm mb-1.5 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {rows ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClasses} pr-10 resize-none`}
            placeholder={placeholder}
            rows={rows}
            required={required}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClasses} ${icon ? "pr-10" : ""} ${rightIcon ? "pl-10" : ""}`}
            placeholder={placeholder}
            required={required}
          />
        )}
        {rightIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

