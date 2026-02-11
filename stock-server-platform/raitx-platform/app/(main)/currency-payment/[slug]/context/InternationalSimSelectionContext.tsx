"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";

type ContextValue = {
  selectedProduct: ShopProduct | null;
  setSelectedProduct: (p: ShopProduct | null) => void;
};

const InternationalSimSelectionContext = createContext<ContextValue | null>(
  null
);

export function InternationalSimSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(
    null
  );
  const value: ContextValue = {
    selectedProduct,
    setSelectedProduct: useCallback((p: ShopProduct | null) => {
      setSelectedProduct(p);
    }, []),
  };
  return (
    <InternationalSimSelectionContext.Provider value={value}>
      {children}
    </InternationalSimSelectionContext.Provider>
  );
}

export function useInternationalSimSelection(): ContextValue | null {
  return useContext(InternationalSimSelectionContext);
}
