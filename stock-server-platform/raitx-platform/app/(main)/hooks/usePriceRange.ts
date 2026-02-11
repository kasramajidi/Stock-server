'use client';

import { useState, useCallback } from 'react';

export function usePriceRange() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);

  const updatePrice = useCallback((index: 0 | 1, value: number) => {
    setPriceRange((prev) => {
      const newRange: [number, number] = [...prev];
      newRange[index] = value;
      return newRange;
    });
  }, []);

  const formatPrice = useCallback((price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  }, []);

  const parsePrice = useCallback((priceString: string): number => {
    const cleaned = priceString.replace(/,/g, '');
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  return {
    priceRange,
    updatePrice,
    formatPrice,
    parsePrice,
  };
}

