"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

type FloatingMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** تأخیر بستن (برای وقتی ماوس از هدر می‌ره؛ با ورود ماوس به منوی شناور لغو می‌شه) */
  scheduleClose: (delayMs: number) => void;
  cancelScheduledClose: () => void;
};

const FloatingMenuContext = createContext<FloatingMenuContextValue | null>(null);

const HOVER_CLOSE_DELAY = 200;

export function FloatingMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancelScheduledClose();
    setIsOpen(false);
  }, [cancelScheduledClose]);

  const open = useCallback(() => {
    cancelScheduledClose();
    setIsOpen(true);
  }, [cancelScheduledClose]);

  const scheduleClose = useCallback((delayMs: number = HOVER_CLOSE_DELAY) => {
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), delayMs);
  }, [cancelScheduledClose]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <FloatingMenuContext.Provider value={{ isOpen, open, close, toggle, scheduleClose, cancelScheduledClose }}>
      {children}
    </FloatingMenuContext.Provider>
  );
}

export function useFloatingMenu() {
  const ctx = useContext(FloatingMenuContext);
  if (!ctx) throw new Error("useFloatingMenu must be used within FloatingMenuProvider");
  return ctx;
}
