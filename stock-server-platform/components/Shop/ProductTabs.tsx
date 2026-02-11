"use client";

import React, { useState } from "react";
import TabNavigation from "./tabs/TabNavigation";
import ProductIntroduction from "./tabs/ProductIntroduction";
import SpecificationsSection from "./tabs/SpecificationsSection";
import ReviewsSection from "./tabs/ReviewsSection";
import type { ShopProduct } from "@/lib/shop-api";

const TABS = [
  { id: "introduction", title: "معرفی محصول" },
  { id: "specifications", title: "مشخصات فنی" },
  { id: "reviews", title: "نظرات" },
];

interface ProductTabsProps {
  product: ShopProduct;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [active, setActive] = useState("introduction");

  return (
    <div className="mt-10">
      <TabNavigation tabs={TABS} activeTab={active} onTabChange={setActive} />
      <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200/80 p-6 sm:p-8 min-h-[240px]">
        {active === "introduction" && <ProductIntroduction product={product} />}
        {active === "specifications" && <SpecificationsSection product={product} />}
        {active === "reviews" && <ReviewsSection product={product} />}
      </div>
    </div>
  );
}
