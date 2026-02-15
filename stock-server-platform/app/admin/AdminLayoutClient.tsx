"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, type MeResponse } from "@/lib/admin-api";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminLoginForm from "@/components/Admin/AdminLoginForm";

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"
            aria-hidden
          />
          <p className="text-sm text-slate-400">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  if (status === "forbidden") {
    return <AdminLoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
