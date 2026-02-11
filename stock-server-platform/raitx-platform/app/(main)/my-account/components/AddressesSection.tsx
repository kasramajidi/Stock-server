"use client";

import React, { useState, useCallback } from "react";
import { useAddresses } from "./addresses/useAddresses";
import { Address, AddressFormData } from "./addresses/types";
import AddressCard from "./addresses/AddressCard";
import SuccessMessage from "./shared/SuccessMessage";

const initialFormData: AddressFormData = {
  fullName: "",
  phone: "",
  province: "",
  city: "",
  postalCode: "",
  address: "",
};

export default function AddressesSection() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddresses();
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const shippingAddress = addresses.find((addr) => addr.type === "shipping");
  const billingAddress = addresses.find((addr) => addr.type === "billing");

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setEditingAddressId(null);
    setShowShippingForm(false);
    setShowBillingForm(false);
  }, []);

  const handleAddAddress = useCallback((type: "shipping" | "billing") => {
    resetForm();
    if (type === "shipping") {
      setShowShippingForm(true);
    } else {
      setShowBillingForm(true);
    }
  }, [resetForm]);

  const handleEditAddress = useCallback((address: Address) => {
    setEditingAddressId(address.id);
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      province: address.province,
      city: address.city,
      postalCode: address.postalCode,
      address: address.address,
    });
    if (address.type === "shipping") {
      setShowShippingForm(true);
      setShowBillingForm(false);
    } else {
      setShowBillingForm(true);
      setShowShippingForm(false);
    }
  }, []);

  const handleDeleteAddress = useCallback((id: string) => {
    if (confirm("آیا از حذف این آدرس اطمینان دارید؟")) {
      deleteAddress(id);
    }
  }, [deleteAddress]);

  const handleSubmit = useCallback(async (e: React.FormEvent, type: "shipping" | "billing") => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (editingAddressId) {
      updateAddress(editingAddressId, { ...formData, type });
    } else {
      const newAddress: Address = {
        id: `addr_${Date.now()}`,
        type,
        ...formData,
      };
      addAddress(newAddress);
    }

    setIsSaving(false);
    setSaveSuccess(true);
    resetForm();

    setTimeout(() => setSaveSuccess(false), 3000);
  }, [editingAddressId, formData, addAddress, updateAddress, resetForm]);

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">آدرس‌ها</h3>
        <p className="text-gray-500 text-sm">
          آدرس‌های زیر به طور پیش‌فرض در صفحه پرداخت مورد استفاده قرار می‌گیرند.
        </p>
      </div>

      {saveSuccess && <SuccessMessage message="آدرس با موفقیت ذخیره شد." />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressCard
          address={shippingAddress || null}
          type="shipping"
          isFormOpen={showShippingForm}
          formData={formData}
          onFormDataChange={setFormData}
          onAddClick={() => handleAddAddress("shipping")}
          onEditClick={() => shippingAddress && handleEditAddress(shippingAddress)}
          onDeleteClick={() => shippingAddress && handleDeleteAddress(shippingAddress.id)}
          onSubmit={(e) => handleSubmit(e, "shipping")}
          onCancel={resetForm}
          isSaving={isSaving}
        />

        <AddressCard
          address={billingAddress || null}
          type="billing"
          isFormOpen={showBillingForm}
          formData={formData}
          onFormDataChange={setFormData}
          onAddClick={() => handleAddAddress("billing")}
          onEditClick={() => billingAddress && handleEditAddress(billingAddress)}
          onDeleteClick={() => billingAddress && handleDeleteAddress(billingAddress.id)}
          onSubmit={(e) => handleSubmit(e, "billing")}
          onCancel={resetForm}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
