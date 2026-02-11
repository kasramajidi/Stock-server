"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Save, Check } from "lucide-react";

const PROFILE_STORAGE_KEY = "user";
const PROFILE_EXPIRY_KEY = "userProfileExpiry";
const PROFILE_EXPIRY_DAYS = 30;

/** فقط مقدار شبیه شماره تلفن را برمی‌گرداند؛ اگر ایمیل بود خالی برمی‌گرداند تا "—" نشان داده شود */
function asPhoneOnly(value: string | undefined | null): string {
  if (value == null || typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.includes("@") ? "" : trimmed;
}

interface UserData {
  id: string;
  email: string;
  userType: string;
  fullName: string;
  phone: string;
}

function getStoredProfile(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  try {
    const expiry = localStorage.getItem(PROFILE_EXPIRY_KEY);
    if (expiry && Date.now() > Number(expiry)) return null;
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function saveProfileFor30Days(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const expiry = Date.now() + PROFILE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(PROFILE_EXPIRY_KEY, String(expiry));
}

export default function AccountDetailsSection() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    email: "",
    userType: "عادی",
    fullName: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    const applyFromApi = (profile: { name?: string; username?: string; email?: string; phone?: string }) => {
      if (!mounted) return;
      const name = (profile.name ?? profile.username ?? "").trim();
      const phoneValue = asPhoneOnly(profile.phone);
      setUserData((prev) => ({
        ...prev,
        fullName: prev.fullName || name,
        email: prev.email || profile.email || "",
        phone: prev.phone || phoneValue || "",
      }));
    };
    const applyFromStorage = (user: Record<string, unknown>) => {
      if (!mounted) return;
      const fullName =
        (user.fullName as string) ||
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        (user.name as string) ||
        (user.username as string) ||
        "";
      const storedPhone = asPhoneOnly((user.phone as string) || (user.mobile as string));
      setUserData((prev) => ({
        ...prev,
        id: (user.id as string)?.toString() || prev.id,
        email: (user.email as string) || prev.email,
        userType: (user.userType as string) || prev.userType,
        fullName: fullName || prev.fullName,
        phone: prev.phone || storedPhone || "",
      }));
    };

    import("../lib/my-account-api").then(({ fetchUserProfileFallback, LOGIN_PHONE_KEY }) => {
      fetchUserProfileFallback().then((profile) => {
        if (!mounted) return;
        if (profile) applyFromApi(profile);
        const stored = getStoredProfile();
        if (stored && (stored.email || stored.fullName || stored.name || stored.username))
          applyFromStorage(stored);
        if (!mounted) return;
        const loginPhone = typeof localStorage !== "undefined" ? localStorage.getItem(LOGIN_PHONE_KEY) : null;
        if (loginPhone && asPhoneOnly(loginPhone)) {
          setUserData((prev) => ({
            ...prev,
            phone: prev.phone || asPhoneOnly(loginPhone) || "",
          }));
        }
      });
    });
    return () => { mounted = false; };
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (typeof window !== "undefined") {
      const toStore = {
        id: userData.id,
        email: userData.email,
        userType: userData.userType,
        fullName: userData.fullName,
        name: userData.fullName,
        username: userData.fullName,
        phone: asPhoneOnly(userData.phone),
      };
      saveProfileFor30Days(toStore);
    }
    setIsSaving(false);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const cancelEdit = () => {
    const stored = getStoredProfile();
    if (stored) {
      const fullName = ((stored.fullName as string) || (stored.name as string) || (stored.username as string) || "").trim();
      setUserData((prev) => ({
        ...prev,
        email: (stored.email as string) ?? prev.email,
        fullName: fullName || prev.fullName,
        userType: (stored.userType as string) ?? prev.userType,
        id: (stored.id as string)?.toString() ?? prev.id,
        // شماره تماس از API می‌آید و قابل ویرایش نیست — مقدار فعلی را نگه می‌داریم
      }));
    }
    setIsEditing(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">مشخصات فردی</h3>
          <p className="mt-0.5 text-sm text-gray-500">اطلاعات شخصی و تماس</p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-hover"
          >
            <Pencil size={16} />
            ویرایش
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-green-700">تغییرات با موفقیت ذخیره شد.</p>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره کاربری</label>
                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  {userData.id || "-"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="ایمیل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">نوع کاربری</label>
                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  {userData.userType}
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={userData.fullName}
                  onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="نام و نام خانوادگی"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره تلفن</label>
                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  {asPhoneOnly(userData.phone) || "—"}
                </div>
                <p className="mt-0.5 text-xs text-gray-400">شماره تماس قابل ویرایش نیست</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Save size={16} />
                )}
                ذخیره تغییرات
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { label: "شماره کاربری", value: userData.id || "-" },
              { label: "ایمیل", value: userData.email || "-" },
              { label: "نوع کاربری", value: userData.userType },
              { label: "نام و نام خانوادگی", value: userData.fullName || "-" },
              { label: "شماره تلفن", value: asPhoneOnly(userData.phone) || "—" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-500">{label}</label>
                <p className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
