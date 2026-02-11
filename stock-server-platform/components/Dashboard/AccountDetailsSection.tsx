"use client";

import React, { useState, useEffect } from "react";
import { fetchUserProfileFallback, LOGIN_PHONE_KEY } from "@/lib/dashboard-api";

function asPhoneOnly(value: string | undefined | null): string {
  if (value == null || typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.includes("@") ? "" : trimmed;
}

interface UserData {
  fullName: string;
  email: string;
  phone: string;
}

export default function AccountDetailsSection() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchUserProfileFallback().then((profile) => {
      if (!mounted) return;
      if (profile) {
        setUserData((prev) => ({
          ...prev,
          fullName: prev.fullName || (profile.name ?? profile.username ?? ""),
          email: prev.email || (profile.email ?? ""),
          phone: prev.phone || asPhoneOnly(profile.phone ?? "") || "",
        }));
      }
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("user");
        if (stored) {
          try {
            const user = JSON.parse(stored) as Record<string, unknown>;
            setUserData((prev) => ({
              ...prev,
              fullName: (user.fullName as string) || (user.name as string) || (user.username as string) || prev.fullName,
              email: (user.email as string) || prev.email,
              phone: prev.phone || asPhoneOnly((user.phone as string) || (user.mobile as string)) || "",
            }));
          } catch {
            // ignore
          }
        }
        const loginPhone = localStorage.getItem(LOGIN_PHONE_KEY);
        if (loginPhone && asPhoneOnly(loginPhone)) {
          setUserData((prev) => ({ ...prev, phone: prev.phone || asPhoneOnly(loginPhone) || "" }));
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise((r) => setTimeout(r, 600));
    if (typeof window !== "undefined") {
      const prev = JSON.parse(localStorage.getItem("user") || "{}") as Record<string, unknown>;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...prev, name: userData.fullName, fullName: userData.fullName, email: userData.email, phone: userData.phone })
      );
    }
    setSaveSuccess(true);
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <div className="max-w-md rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        مشخصات فردی
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {saveSuccess && (
          <p className="rounded-lg border border-emerald-200/60 bg-emerald-50/50 px-3 py-2 text-[13px] text-emerald-800">
            ذخیره شد.
          </p>
        )}
        <div>
          <label htmlFor="fullName" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            نام و نام خانوادگی
          </label>
          <input
            id="fullName"
            type="text"
            value={userData.fullName}
            onChange={(e) => setUserData((p) => ({ ...p, fullName: e.target.value }))}
            disabled={!isEditing}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground disabled:bg-muted/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData((p) => ({ ...p, email: e.target.value }))}
            disabled={!isEditing}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground disabled:bg-muted/30"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
            شماره تماس
          </label>
          <input
            id="phone"
            type="text"
            inputMode="tel"
            value={userData.phone}
            onChange={(e) => setUserData((p) => ({ ...p, phone: e.target.value }))}
            disabled={!isEditing}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground disabled:bg-muted/30"
          />
        </div>
        <div className="flex gap-2 pt-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-border bg-transparent px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              ویرایش
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg border border-[var(--primary-hover)] bg-transparent px-4 py-2 text-[13px] font-medium text-[var(--primary-hover)] transition-colors hover:bg-[var(--primary-hover)] hover:text-white disabled:opacity-50"
              >
                {isSaving ? "در حال ذخیره…" : "ذخیره"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-border bg-transparent px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted/50"
              >
                انصراف
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
