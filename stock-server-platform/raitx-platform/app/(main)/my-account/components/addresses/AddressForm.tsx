"use client";

import React from "react";
import { X, Save } from "lucide-react";
import FormInput from "../shared/FormInput";
import LoadingSpinner from "../shared/LoadingSpinner";

interface AddressFormData {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

interface AddressFormProps {
  formData: AddressFormData;
  onFormDataChange: (data: AddressFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function AddressForm({
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isSaving,
}: AddressFormProps) {
  const updateField = (field: keyof AddressFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInput
        label="نام و نام خانوادگی"
        value={formData.fullName}
        onChange={(value) => updateField("fullName", value)}
        placeholder="نام و نام خانوادگی"
        required
      />

      <FormInput
        label="شماره تماس"
        value={formData.phone}
        onChange={(value) => updateField("phone", value)}
        placeholder="09123456789"
        type="tel"
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <FormInput
          label="استان"
          value={formData.province}
          onChange={(value) => updateField("province", value)}
          placeholder="تهران"
          required
        />
        <FormInput
          label="شهر"
          value={formData.city}
          onChange={(value) => updateField("city", value)}
          placeholder="تهران"
          required
        />
      </div>

      <FormInput
        label="کد پستی"
        value={formData.postalCode}
        onChange={(value) => updateField("postalCode", value)}
        placeholder="1234567890"
        required
      />

      <FormInput
        label="آدرس کامل"
        value={formData.address}
        onChange={(value) => updateField("address", value)}
        placeholder="آدرس کامل را وارد کنید"
        rows={3}
        required
      />

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 px-4 py-2 bg-[#ff5538] hover:bg-[#e6452e] text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <LoadingSpinner size={4} />
              در حال ذخیره...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              ذخیره
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

