"use client";

import React, { useState, useMemo } from "react";
import TabNavigation from "./tabs/TabNavigation";
import ProductIntroduction from "./tabs/ProductIntroduction";
import SpecificationsSection from "./tabs/SpecificationsSection";
import ReviewsSection from "./tabs/ReviewsSection";
import type { Product } from "./productsData";

interface TabContentProps {
  activeTab: string;
  product: Product | null;
}

const TabContent = React.memo<TabContentProps>(({ activeTab, product }) => {
  if (activeTab === "introduction") {
    return <ProductIntroduction product={product} />;
  }
  if (activeTab === "specifications") {
    return <SpecificationsSection product={product} />;
  }
  if (activeTab === "reviews") {
    return <ReviewsSection product={product} />;
  }
  return null;
});

TabContent.displayName = "TabContent";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("introduction");

  const isServiceOrGiftCard =
    product?.productType === "service" || product?.productType === "gift_card";

  const tabs = useMemo(
    () =>
      isServiceOrGiftCard
        ? [
            { id: "introduction", title: "معرفی محصول" },
            { id: "reviews", title: "نظرات کاربران" },
          ]
        : [
            { id: "introduction", title: "معرفی محصول" },
            { id: "specifications", title: "مشخصات فنی" },
            { id: "reviews", title: "نظرات کاربران" },
          ],
    [isServiceOrGiftCard]
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="mt-20">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <div className="rounded-br-2xl rounded-bl-2xl px-4 py-6 sm:px-8 sm:py-10 border border-t-0 border-gray-200/80 shadow-sm min-h-[280px] bg-gradient-to-b from-gray-50/90 to-white">
        <TabContent activeTab={activeTab} product={product} />
      </div>
    </div>
  );
}
