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

const TabNavigation = React.memo<TabNavigationProps>(
  ({ tabs, activeTab, onTabChange }) => (
    <nav
      className="w-full bg-white border border-b-0 border-gray-200/80 rounded-tr-2xl rounded-tl-2xl p-3 sm:p-4 mb-0 shadow-sm"
      role="tablist"
      aria-label="تب های محصول"
    >
      <div className="flex justify-start gap-2 sm:gap-4 lg:gap-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
    </nav>
  )
);

TabNavigation.displayName = "TabNavigation";

export default TabNavigation;
