"use client";

import React, { useState, useEffect } from "react";
import { adminFetch, getAuthHeaders } from "@/lib/admin-api";
import { Users as UsersIcon, Shield, RefreshCw, Trash2 } from "lucide-react";

interface UserRow {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [list, setList] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const isSuperAdmin = currentUserRole === "super_admin";

  useEffect(() => {
    adminFetch<{ user?: { role: string } }>("/api/auth/me").then(({ data }) => {
      if (data?.user?.role) setCurrentUserRole(data.user.role);
    });
  }, []);

  const load = () => {
    setLoading(true);
    setError(null);
    adminFetch<{ users?: UserRow[] }>("/api/users")
      .then(({ data, ok }) => {
        if (ok && data?.users) setList(data.users);
        else setError("خطا در بارگذاری کاربران.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setRole = async (mobile: string, role: "user" | "admin" | "super_admin") => {
    setActionLoading(mobile);
    const res = await fetch(`/api/users/${encodeURIComponent(mobile)}/role`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) load();
    else alert(json?.errors?.[0] || "خطا در تغییر نقش.");
  };

  const setBan = async (mobile: string, banned: boolean) => {
    setActionLoading(mobile);
    const res = await fetch(`/api/users/${encodeURIComponent(mobile)}/ban`, {
      method: "PATCH",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ banned }),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) load();
    else alert(json?.errors?.[0] || "خطا در تغییر وضعیت.");
  };

  const deleteUser = async (mobile: string, fullName: string) => {
    if (!confirm(`آیا از حذف کاربر «${fullName}» مطمئن هستید؟ این عمل قابل بازگشت نیست.`)) return;
    setActionLoading(mobile);
    const res = await fetch(`/api/users/${encodeURIComponent(mobile)}`, {
      method: "DELETE",
      credentials: "include",
      headers: getAuthHeaders(),
    });
    const json = await res.json().catch(() => ({}));
    setActionLoading(null);
    if (res.ok && json.success) load();
    else alert(json?.errors?.[0] || "خطا در حذف کاربر.");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
      <div className="max-w-5xl mx-auto w-full min-w-0" style={{ animation: "adminFadeIn 0.4s ease-out" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">کاربران</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">مدیریت نقش و وضعیت کاربران</p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-slate-300 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            بروزرسانی
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading && list.length === 0 ? (
          <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 overflow-hidden">
            <div className="h-12 border-b border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800/50" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 border-b border-slate-300/50 dark:border-slate-700/50 animate-pulse bg-slate-100 dark:bg-slate-800/20" />
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/30 overflow-hidden"
            style={{ animation: "adminCardIn 0.35s ease-out" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-right">
                    <th className="p-3 font-medium">نام</th>
                    <th className="p-3 font-medium">موبایل</th>
                    <th className="p-3 font-medium">ایمیل</th>
                    <th className="p-3 font-medium">نقش</th>
                    <th className="p-3 font-medium">وضعیت</th>
                    <th className="p-3 font-medium">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((user, i) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-300/50 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700/40 transition-colors duration-150"
                      style={{
                        animation: "adminFadeIn 0.3s ease-out backwards",
                        animationDelay: `${i * 30}ms`,
                      }}
                    >
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-100">{user.fullName}</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">{user.mobile}</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                            user.role === "super_admin"
                              ? "bg-violet-500/20 text-violet-400"
                              : user.role === "admin"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-slate-400/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {user.role === "super_admin" || user.role === "admin" ? (
                            <Shield className="h-3 w-3" />
                          ) : (
                            <UsersIcon className="h-3 w-3" />
                          )}
                          {user.role === "super_admin" ? "ادمین کل" : user.role === "admin" ? "ادمین" : "کاربر"}
                        </span>
                      </td>
                      <td className="p-3">
                        {user.isBanned ? (
                          <span className="text-red-400 text-xs font-medium">مسدود</span>
                        ) : (
                          <span className="text-emerald-400/90 text-xs">فعال</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {isSuperAdmin && (
                            <>
                              {user.role !== "admin" && user.role !== "super_admin" && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setRole(user.mobile, "admin")}
                                    disabled={!!actionLoading}
                                    className="rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                                  >
                                    {actionLoading === user.mobile ? "..." : "ادمین"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setRole(user.mobile, "super_admin")}
                                    disabled={!!actionLoading}
                                    className="rounded-lg bg-violet-500/20 px-2.5 py-1 text-xs font-medium text-violet-400 hover:bg-violet-500/30 transition-colors disabled:opacity-50"
                                  >
                                    {actionLoading === user.mobile ? "..." : "ادمین کل"}
                                  </button>
                                </>
                              )}
                              {(user.role === "admin" || user.role === "super_admin") && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setRole(user.mobile, "user")}
                                    disabled={!!actionLoading}
                                    className="rounded-lg bg-slate-400/50 dark:bg-slate-600/50 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-500 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                                  >
                                    {actionLoading === user.mobile ? "..." : "کاربر"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setRole(user.mobile, "admin")}
                                    disabled={!!actionLoading}
                                    className="rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                                  >
                                    {actionLoading === user.mobile ? "..." : "ادمین"}
                                  </button>
                                  {user.role === "admin" && (
                                    <button
                                      type="button"
                                      onClick={() => setRole(user.mobile, "super_admin")}
                                      disabled={!!actionLoading}
                                      className="rounded-lg bg-violet-500/20 px-2.5 py-1 text-xs font-medium text-violet-400 hover:bg-violet-500/30 transition-colors disabled:opacity-50"
                                    >
                                      {actionLoading === user.mobile ? "..." : "ادمین کل"}
                                    </button>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {!user.isBanned ? (
                            <button
                              type="button"
                              onClick={() => setBan(user.mobile, true)}
                              disabled={!!actionLoading}
                              className="rounded-lg bg-red-500/20 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                            >
                              بن
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setBan(user.mobile, false)}
                              disabled={!!actionLoading}
                              className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-400 hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
                            >
                              آنبن
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteUser(user.mobile, user.fullName)}
                            disabled={!!actionLoading}
                            className="rounded-lg bg-slate-400/50 dark:bg-slate-600/50 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50 inline-flex items-center gap-1"
                            title="حذف کاربر"
                          >
                            <Trash2 className="h-3 w-3" />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {list.length === 0 && !loading && (
              <div className="p-8 text-center text-slate-500">کاربری یافت نشد.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
