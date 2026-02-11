"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  register?: Record<string, unknown>;
  error?: string;
  placeholder?: string;
  [key: string]: unknown;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  register,
  error,
  placeholder,
  ...rest
}) => (
  <div className="mb-6">
    <label
      className="block text-right text-gray-800 text-sm font-semibold mb-2"
      htmlFor={id}
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={id}
      type={type}
      {...register}
      {...rest}
      placeholder={placeholder}
      className={`w-full bg-white border border-gray-300 md:p-3 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-[#ff5538] transition-all ${
        error ? "border-red-400 focus:ring-red-400 focus:border-red-400" : ""
      }`}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="text-red-500 text-xs mt-1 text-right"
        role="alert"
      >
        {error}
      </p>
    )}
  </div>
);

export default InputField;