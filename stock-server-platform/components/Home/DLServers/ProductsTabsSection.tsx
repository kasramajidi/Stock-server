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

      {/* Tabs - pill شکل مثل تب سرور DL/ML */}
      <div className="flex justify-center gap-3 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                isActive
                  ? "bg-[#00DDFF] text-white shadow-sm hover:bg-[#00c4e6]"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

    </section>
  );
}
