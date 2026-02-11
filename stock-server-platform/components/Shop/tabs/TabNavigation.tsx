"use client";

import React from "react";
import TabButton from "./TabButton";

interface Tab {
  id: string;
  title: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav
      className="flex gap-1 p-1 bg-slate-100 rounded-t-2xl border border-b-0 border-slate-200/80"
      role="tablist"
      aria-label="تب‌های محصول"
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </nav>
  );
}
