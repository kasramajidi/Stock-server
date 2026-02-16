"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, type MeResponse } from "@/lib/admin-api";
import { AdminThemeProvider } from "@/components/Admin/AdminThemeContext";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminLoginForm from "@/components/Admin/AdminLoginForm";
import { Menu } from "lucide-react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "allowed" | "forbidden">("loading");
  const [recheck, setRecheck] = useState(0);

  const hasAdminAccess = (role: string | undefined) =>
    role === "admin" || role === "super_admin";

  useEffect(() => {
    let cancelled = false;
    adminFetch<MeResponse>("/api/auth/me")
      .then(({ data, ok, status: resStatus }) => {
        if (cancelled) return;
        if (!ok || resStatus === 401) {
          setStatus("forbidden");
          return;
        }
        if (hasAdminAccess(data?.user?.role)) {
          setStatus("allowed");
        } else {
          setStatus("forbidden");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("forbidden");
      });
    return () => {
      cancelled = true;
    };
  }, [recheck]);

  const handleLoginSuccess = () => {
    setStatus("loading");
    setRecheck((n) => n + 1);
  };

  if (status === "loading") {
    return (
      <AdminThemeProvider>
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"
              aria-hidden
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">در حال بررسی دسترسی...</p>
          </div>
        </div>
      </AdminThemeProvider>
    );
  }

  if (status === "forbidden") {
    return (
      <AdminThemeProvider>
        <AdminLoginForm onSuccess={handleLoginSuccess} />
      </AdminThemeProvider>
    );
  }

  return (
    <AdminThemeProvider>
      <AdminLayoutWithSidebar>{children}</AdminLayoutWithSidebar>
    </AdminThemeProvider>
  );
}

function AdminLayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="md:hidden sticky top-0 z-40 flex items-center gap-3 px-4 py-3 border-b border-slate-300 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            aria-label="باز کردن منو"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-semibold text-slate-800 dark:text-slate-100">پنل ادمین</span>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
