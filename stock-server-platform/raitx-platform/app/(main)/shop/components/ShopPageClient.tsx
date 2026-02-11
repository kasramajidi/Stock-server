"use client";

import { FilterProvider } from "../../context/FilterContext";
import { ShopProductsProvider } from "../context/ShopProductsContext";
import type { ShopProduct } from "../lib/shop-api";
import ShopSection from "./ShopSection";

interface ShopPageClientProps {
  initialProducts?: ShopProduct[];
}

export default function ShopPageClient({ initialProducts = [] }: ShopPageClientProps) {
  return (
    <ShopProductsProvider initialProducts={initialProducts}>
      <FilterProvider>
        <main className="min-h-screen bg-gray-50">
          <ShopSection />
        </main>
      </FilterProvider>
    </ShopProductsProvider>
  );
}

