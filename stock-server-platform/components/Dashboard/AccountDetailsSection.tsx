"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/Auth/ui/InputField";
import { Pencil, Check, X } from "lucide-react";

interface UserData {
  fullName: string;
  mobile: string;
  email: string;
  createdAt?: string;
}

export default function AccountDetailsSection() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.user) {
          setUser({
            fullName: data.user.fullName ?? "",
            mobile: data.user.mobile ?? "",
            email: data.user.email ?? "",
            createdAt: data.user.createdAt,
          });
          setEditFullName(data.user.fullName ?? "");
          setEditEmail(data.user.email ?? "");
        } else {
          setError("خطا در دریافت اطلاعات.");
        }
      })
      .catch(() => setError("خطا در ارتباط با سرور."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!user?.mobile) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(user.mobile)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: editFullName.trim(), email: editEmail.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(Array.isArray(data.errors) ? data.errors.join(" ") : "خطا در بروزرسانی.");
        return;
      }
      if (data?.success && data?.user) {
        setUser({
          ...user,
          fullName: data.user.fullName ?? user.fullName,
          email: data.user.email ?? user.email,
        });
        setEditing(false);
      }
    } catch {
      setError("خطا در ارتباط با سرور.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditFullName(user?.fullName ?? "");
    setEditEmail(user?.email ?? "");
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            مشخصات فردی
          </p>
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        </section>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex flex-col gap-6">
        <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            مشخصات فردی
          </p>
          <p className="text-destructive">{error}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            مشخصات فردی
          </p>
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#17e2fe] hover:bg-[#17e2fe]/10 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              ویرایش
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-[#17e2fe] hover:bg-[#14c8e0] disabled:opacity-60 transition-colors"
              >
                <Check className="w-4 h-4" />
                {saving ? "در حال ذخیره…" : "ذخیره"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60 transition-colors"
              >
                <X className="w-4 h-4" />
                انصراف
              </button>
            </div>
          )}
        </div>

        {error && editing && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}

        {editing ? (
          <div className="space-y-4 max-w-md">
            <InputField
              id="edit-fullname"
              label="نام و نام خانوادگی"
              value={editFullName}
              onChange={(e) => setEditFullName(e.target.value)}
              placeholder="نام و نام خانوادگی"
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600 text-right">شماره موبایل</label>
              <p className="rounded-2xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-500">
                {user?.mobile}
              </p>
              <p className="text-[10px] text-muted-foreground text-right">شماره موبایل قابل تغییر نیست.</p>
            </div>
            <InputField
              id="edit-email"
              label="ایمیل"
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="example@mail.com"
            />
          </div>
        ) : (
          <dl className="space-y-4">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">نام و نام خانوادگی</dt>
              <dd className="text-base font-medium text-foreground">{user?.fullName || "—"}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">شماره موبایل</dt>
              <dd className="text-base font-medium text-foreground">{user?.mobile || "—"}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">ایمیل</dt>
              <dd className="text-base font-medium text-foreground">{user?.email || "—"}</dd>
            </div>
          </dl>
        )}
      </section>
    </div>
  );
}
