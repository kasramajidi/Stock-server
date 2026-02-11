"use client";

import { useFilters } from "../../../context/FilterContext";
import { brands } from "../productsData";

export default function BrandFilter() {
  const { selectedBrands, updateBrand } = useFilters();

  return (
    <section className="space-y-3" aria-label="فیلتر برند">
      <h3 className="text-base font-medium text-gray-900">برندها</h3>
      <div
        className="grid grid-cols-2 gap-2"
        role="group"
        aria-label="انتخاب برند"
      >
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => updateBrand(brand)}
            aria-pressed={selectedBrands.includes(brand)}
            aria-label={`${
              selectedBrands.includes(brand) ? "حذف" : "انتخاب"
            } برند ${brand}`}
            className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
              selectedBrands.includes(brand)
                ? "bg-[#ff5538] cursor-pointer text-white border-[#ff5538] hover:opacity-90"
                : "bg-white cursor-pointer text-gray-700 border-gray-300 hover:border-[#ff5538] hover:text-[#ff5538]"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
}
