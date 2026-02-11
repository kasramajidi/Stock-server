"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { fetchShopProducts, type ShopProduct } from "../lib/shop-api";

interface ShopProductsContextType {
  products: ShopProduct[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ShopProductsContext = createContext<ShopProductsContextType | undefined>(undefined);

interface ShopProductsProviderProps {
  children: React.ReactNode;
  initialProducts?: ShopProduct[];
}

export function ShopProductsProvider({ children, initialProducts = [] }: ShopProductsProviderProps) {
  const [products, setProducts] = useState<ShopProduct[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchShopProducts();
      setProducts(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در دریافت محصولات");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProducts.length > 0) return;
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter((c) => c && c !== "—");
    return [...new Set(cats)].sort((a, b) => a.localeCompare(b, "fa"));
  }, [products]);

  const value = useMemo(
    () => ({ products, categories, loading, error, refetch: fetchProducts }),
    [products, categories, loading, error]
  );

  return (
    <ShopProductsContext.Provider value={value}>
      {children}
    </ShopProductsContext.Provider>
  );
}

export function useShopProducts() {
  const ctx = useContext(ShopProductsContext);
  if (ctx === undefined) throw new Error("useShopProducts must be used within ShopProductsProvider");
  return ctx;
}
