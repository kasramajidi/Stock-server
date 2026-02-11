"use client";

import React from "react";

interface Tab {
  id: string;
  title: string;
}

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      className={`px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
        isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-800"
      }`}
    >
      {tab.title}
    </button>
  );
}
