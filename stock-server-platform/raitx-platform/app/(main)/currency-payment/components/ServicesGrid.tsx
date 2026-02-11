"use client";

import { useState } from "react";
import { services, serviceCategories, Service } from "./servicesData";

export default function ServicesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredServices: Service[] =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap gap-2 sm:gap-2.5 justify-center items-center">
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.value)}
            className={`
              px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium
              transition-all duration-200 cursor-pointer
              ${
                selectedCategory === category.value
                  ? "bg-[#ff5538] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-[#ff5538]/30"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Services Grid - بدون لینک به صفحه محصول/سرویس */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 text-center"
          >
            <div className="mb-4 sm:mb-5 flex items-center justify-center">
              <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
                {service.icon}
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2">
              {service.label}
            </h3>
            {service.labelEn && (
              <p className="text-[10px] sm:text-xs text-gray-400 mb-3 font-medium">
                {service.labelEn}
              </p>
            )}
            <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-gray-500">
            خدماتی در این دسته‌بندی یافت نشد.
          </p>
        </div>
      )}
    </div>
  );
}

