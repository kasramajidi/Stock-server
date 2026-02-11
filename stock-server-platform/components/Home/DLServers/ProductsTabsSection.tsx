"use client";

import { useState } from "react";

const tabs = [
  { id: "cpu", label: "پردازنده سرور" },
  { id: "ram", label: "رم سرور" },
  { id: "memory", label: "حافظه سرور" },
  { id: "hdd", label: "هارد سرور" },
];

export default function ProductsTabsSection() {
  const [activeTab, setActiveTab] = useState("ram");

  return (
    <section className="bg-white mx-[20px] sm:mx-[30px] md:mx-[50px] mt-8 mb-10">

      {/* Title */}
      <h2 className="text-center text-base font-semibold text-gray-800 mb-6">
        محصولات
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-3 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-5 py-2 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-[#4F46E5] text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

    </section>
  );
}
