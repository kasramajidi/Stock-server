"use client";

import { useState } from "react";
import { FAQHeader, FAQSidebar, FAQContent, faqCategories } from "./components";

export default function FAQPageClient() {
  const [activeCategory, setActiveCategory] = useState("general");

  const currentCategory = faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0];

  return (
    <>
      <FAQHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FAQSidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 md:p-6">
            <FAQContent faqs={currentCategory.faqs} />
          </div>
        </div>
      </div>
    </>
  );
}

