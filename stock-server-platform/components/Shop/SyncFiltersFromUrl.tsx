"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFilters } from "./context/FilterContext";

/** همگام‌سازی پارامترهای URL با فیلترهای فروشگاه (برای جستجو از هدر) */
export default function SyncFiltersFromUrl() {
  const searchParams = useSearchParams();
  const { setSearchQuery, setSelectedMainCategoryId } = useFilters();

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "";
    setSearchQuery(search);
    setSelectedMainCategoryId(category || null);
  }, [searchParams, setSearchQuery, setSelectedMainCategoryId]);

  return null;
}
