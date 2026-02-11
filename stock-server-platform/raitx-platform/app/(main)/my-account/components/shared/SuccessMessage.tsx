"use client";

import React from "react";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-5 h-5 text-green-600" />
      </div>
      <p className="text-green-700 text-sm font-medium">{message}</p>
    </div>
  );
}

