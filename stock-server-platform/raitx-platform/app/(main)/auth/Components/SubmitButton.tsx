"use client";

import React from "react";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  disabled = false,
  ...rest
}) => (
  <button
    type="submit"
    className="w-full cursor-pointer bg-[#ff5538] text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);

export default SubmitButton;
