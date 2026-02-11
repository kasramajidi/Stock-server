'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedMainCategoryId: string | null;
  searchQuery: string;
  priceRange: [number, number];
  appliedFilters: {
    categories: string[];
    brands: string[];
    mainCategoryId: string | null;
    search: string;
    price: [number, number];
  };
  updateCategory: (category: string) => void;
  updateBrand: (brand: string) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedMainCategoryId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  applyFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    mainCategoryId: null as string | null,
    search: "",
    price: [0, 50000000] as [number, number],
  });

  const updateCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const updateBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const setSelectedBrandsList = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const applyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories,
      brands: selectedBrands,
      mainCategoryId: selectedMainCategoryId,
      search: searchQuery,
      price: priceRange,
    });
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategories,
        selectedBrands,
        selectedMainCategoryId,
        searchQuery,
        priceRange,
        updateCategory,
        updateBrand,
        setSelectedBrands: setSelectedBrandsList,
        setSelectedMainCategoryId,
        setSearchQuery,
        setPriceRange,
        applyFilters,
        appliedFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

