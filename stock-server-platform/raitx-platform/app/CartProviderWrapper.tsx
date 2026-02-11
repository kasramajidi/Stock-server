"use client";

import { CartProvider } from "./(main)/context/CartContext";
import { ReactNode } from "react";

interface CartProviderWrapperProps {
  children: ReactNode;
}

export default function CartProviderWrapper({
  children,
}: CartProviderWrapperProps) {
  return <CartProvider>{children}</CartProvider>;
}

