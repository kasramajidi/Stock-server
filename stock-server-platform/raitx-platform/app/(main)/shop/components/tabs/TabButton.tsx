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

const TabButton = React.memo<TabButtonProps>(({ tab, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-selected={isActive}
    aria-controls={`tabpanel-${tab.id}`}
    id={`tab-${tab.id}`}
    role="tab"
    tabIndex={isActive ? 0 : -1}
    className={`relative px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all cursor-pointer ${
      isActive ? "text-[#ff5538]" : "text-gray-600 hover:text-[#ff5538]"
    }`}
  >
    {tab.title}
    {isActive && (
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5538]"
        aria-hidden="true"
      ></div>
    )}
  </button>
));

TabButton.displayName = "TabButton";

export default TabButton;
