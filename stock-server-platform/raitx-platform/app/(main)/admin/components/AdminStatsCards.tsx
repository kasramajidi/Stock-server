"use client";

import React from "react";

export interface AdminStatItem {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

const formatNum = (n: number | string) =>
  typeof n === "number" ? new Intl.NumberFormat("fa-IR").format(n) : n;

export default function AdminStatsCards({ items }: { items: AdminStatItem[] }) {
  const displayItems = items.slice(0, 3);
  if (displayItems.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {displayItems.map(({ title, value, icon, color }, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-sm hover:shadow transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${color}`}
            >
              {icon}
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-0.5">{title}</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">
            {formatNum(value)}
          </p>
        </div>
      ))}
    </div>
  );
}
