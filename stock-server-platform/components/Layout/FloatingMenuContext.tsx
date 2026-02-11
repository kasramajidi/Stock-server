"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type FloatingMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const FloatingMenuContext = createContext<FloatingMenuContextValue | null>(null);

export function FloatingMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <FloatingMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </FloatingMenuContext.Provider>
  );
}

export function useFloatingMenu() {
  const ctx = useContext(FloatingMenuContext);
  if (!ctx) throw new Error("useFloatingMenu must be used within FloatingMenuProvider");
  return ctx;
}
