 "use client";

import React from "react";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 px-6 py-7 sm:px-8 sm:py-8">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative w-24 h-10 mb-3">
          <Image
            src="/Images/Logo/logo stock copy 2.png"
            alt="استوک سرور"
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

