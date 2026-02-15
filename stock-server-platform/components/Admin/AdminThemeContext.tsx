"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "admin-theme";

type Theme = "dark" | "light";

const AdminThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "dark", setTheme: () => {} });

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "dark" || stored === "light") setThemeState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  };

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme }}>
      <div className={mounted ? (theme === "dark" ? "dark" : "") : "dark"}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
