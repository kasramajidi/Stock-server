"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ size = 4, className = "" }: LoadingSpinnerProps) {
  const sizeClass = size === 4 ? "h-4 w-4" : size === 5 ? "h-5 w-5" : "h-6 w-6";
  
  return (
    <svg className={`animate-spin ${sizeClass} ${className}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

