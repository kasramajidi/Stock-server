"use client";

import React from "react";
import { Address } from "./types";

interface AddressDisplayProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressDisplay({ address, onEdit, onDelete }: AddressDisplayProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-900">
        <p className="font-medium mb-1">{address.fullName}</p>
        <p className="text-gray-600 mb-1">{address.phone}</p>
        <p className="text-gray-600 mb-1">
          {address.province}، {address.city}
        </p>
        <p className="text-gray-600 mb-1">کد پستی: {address.postalCode}</p>
        <p className="text-gray-600">{address.address}</p>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-xs text-[#ff5538] hover:bg-[#ff5538]/10 rounded-lg transition-colors font-medium"
        >
          ویرایش
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          حذف
        </button>
      </div>
    </div>
  );
}

