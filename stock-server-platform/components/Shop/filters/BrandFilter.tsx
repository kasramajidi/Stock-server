"use client";

import { useFilters } from "../context/FilterContext";
import { brands } from "../productsData";

export default function BrandFilter() {
  const { selectedBrands, updateBrand } = useFilters();

  return (
    <section className="space-y-2" aria-label="فیلتر برند">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">برند</span>
      <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب برند">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            onClick={() => updateBrand(brand)}
            aria-pressed={selectedBrands.includes(brand)}
            aria-label={`برند ${brand}`}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              selectedBrands.includes(brand)
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
}
