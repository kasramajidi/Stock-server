"use client";

import { useState, useEffect } from "react";
import { useFilters } from "../context/FilterContext";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

const parsePrice = (priceString: string): number => {
  const cleaned = priceString.replace(/[^\d]/g, "");
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
};

const MAX_PRICE = 5000000000;

export default function PriceRangeFilter() {
  const { priceRange, setPriceRange } = useFilters();
  const [minValue, setMinValue] = useState(formatPrice(priceRange[0]));
  const [maxValue, setMaxValue] = useState(formatPrice(priceRange[1]));

  const updatePrice = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  useEffect(() => {
    if (document.activeElement?.id !== "price-min") {
      setMinValue(formatPrice(priceRange[0]));
    }
  }, [priceRange[0]]);

  useEffect(() => {
    if (document.activeElement?.id !== "price-max") {
      setMaxValue(formatPrice(priceRange[1]));
    }
  }, [priceRange[1]]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setMinValue(rawValue === "" ? "" : rawValue);
    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) updatePrice(0, value);
    if (rawValue === "") updatePrice(0, 0);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setMaxValue(rawValue === "" ? "" : rawValue);
    const value = parseInt(rawValue, 10);
    if (!isNaN(value) && value >= 0) updatePrice(1, value);
    if (rawValue === "") updatePrice(1, MAX_PRICE);
  };

  const handleMinBlur = () => {
    const value = parsePrice(minValue);
    if (isNaN(value) || value < 0) {
      setMinValue(formatPrice(0));
      updatePrice(0, 0);
    } else if (value > priceRange[1]) {
      setMinValue(formatPrice(priceRange[1]));
      updatePrice(0, priceRange[1]);
    } else {
      setMinValue(formatPrice(value));
    }
  };

  const handleMaxBlur = () => {
    const value = parsePrice(maxValue);
    if (isNaN(value) || value < priceRange[0]) {
      setMaxValue(formatPrice(priceRange[0]));
      updatePrice(1, priceRange[0]);
    } else {
      setMaxValue(formatPrice(value));
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">محدوده قیمت</span>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label htmlFor="price-min" className="sr-only">از</label>
          <input
            id="price-min"
            type="text"
            inputMode="numeric"
            value={minValue}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            aria-label="حداقل قیمت"
            placeholder="۰"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/20 focus:border-[#0e7490]"
          />
        </div>
        <span className="text-slate-400 text-sm">–</span>
        <div className="flex-1">
          <label htmlFor="price-max" className="sr-only">تا</label>
          <input
            id="price-max"
            type="text"
            inputMode="numeric"
            value={maxValue}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            aria-label="حداکثر قیمت"
            placeholder={formatPrice(MAX_PRICE)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-center text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/20 focus:border-[#0e7490]"
          />
        </div>
      </div>
    </div>
  );
}
