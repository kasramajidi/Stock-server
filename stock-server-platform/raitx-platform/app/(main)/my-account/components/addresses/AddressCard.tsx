"use client";

import React from "react";
import { MapPin, Edit2, Plus } from "lucide-react";
import { Address } from "./types";
import AddressForm from "./AddressForm";
import AddressDisplay from "./AddressDisplay";

interface AddressFormData {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

interface AddressCardProps {
  address: Address | null;
  type: "shipping" | "billing";
  isFormOpen: boolean;
  formData: AddressFormData;
  onFormDataChange: (data: AddressFormData) => void;
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function AddressCard({
  address,
  type,
  isFormOpen,
  formData,
  onFormDataChange,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onSubmit,
  onCancel,
  isSaving,
}: AddressCardProps) {
  const title = type === "shipping" ? "آدرس حمل و نقل" : "آدرس صورتحساب";

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff5538]/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#ff5538]" />
          </div>
          <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        </div>
        {address && !isFormOpen && (
          <button
            onClick={onEditClick}
            className="p-2 text-gray-400 hover:text-[#ff5538] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isFormOpen ? (
        <AddressForm
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isSaving={isSaving}
        />
      ) : address ? (
        <AddressDisplay
          address={address}
          onEdit={onEditClick}
          onDelete={onDeleteClick}
        />
      ) : (
        <div>
          <p className="text-gray-500 text-sm mb-4">
            شما هنوز این آدرس را ثبت نکرده‌اید.
          </p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff5538] hover:bg-[#e6452e] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            افزودن آدرس
          </button>
        </div>
      )}
    </div>
  );
}
