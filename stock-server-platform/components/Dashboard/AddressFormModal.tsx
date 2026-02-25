"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MapPicker from "./MapPicker";
import InputField from "@/components/Auth/ui/InputField";

export interface AddressFormData {
  title: string;
  addressText: string;
  latitude: number | null;
  longitude: number | null;
}

interface AddressFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => Promise<void>;
  initialData?: Partial<AddressFormData> | null;
  isLoading?: boolean;
}

const emptyForm: AddressFormData = {
  title: "",
  addressText: "",
  latitude: null,
  longitude: null,
};

export default function AddressFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: AddressFormModalProps) {
  const [title, setTitle] = useState("");
  const [addressText, setAddressText] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title ?? "");
      setAddressText(initialData?.addressText ?? "");
      setLatitude(initialData?.latitude ?? null);
      setLongitude(initialData?.longitude ?? null);
      setError(null);
    }
  }, [open, initialData]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedTitle = title.trim();
    const trimmedAddress = addressText.trim();
    if (!trimmedTitle) {
      setError("عنوان آدرس الزامی است.");
      return;
    }
    if (!trimmedAddress) {
      setError("متن آدرس الزامی است.");
      return;
    }
    try {
      await onSubmit({
        title: trimmedTitle,
        addressText: trimmedAddress,
        latitude,
        longitude,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ذخیره.");
    }
  };

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between shrink-0 p-4 border-b">
          <h2 className="font-bold text-slate-800">
            {initialData ? "ویرایش آدرس" : "افزودن آدرس"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="بستن"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <InputField
            label="عنوان آدرس (مثلاً منزل، محل کار)"
            id="address-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="منزل"
          />
          <div className="space-y-1.5">
            <label
              htmlFor="address-text"
              className="block text-xs font-medium text-slate-600 text-right"
            >
              متن آدرس
            </label>
            <textarea
              id="address-text"
              value={addressText}
              onChange={(e) => setAddressText(e.target.value)}
              placeholder="استان، شهر، خیابان، کوچه، پلاک..."
              rows={3}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#17e2fe]/40 focus:border-[#17e2fe] transition-colors resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-600 text-right">
              موقعیت روی نقشه (اختیاری)
            </label>
            <p className="text-xs text-muted-foreground">
              روی نقشه کلیک کنید تا موقعیت ثبت شود.
            </p>
            <MapPicker
              latitude={latitude}
              longitude={longitude}
              onLocationSelect={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
