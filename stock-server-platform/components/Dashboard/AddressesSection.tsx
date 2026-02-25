"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import AccountEmptyState from "./AccountEmptyState";
import AddressFormModal, { type AddressFormData } from "./AddressFormModal";

interface Address {
  id: string;
  title: string;
  addressText: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

export default function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      if (data?.success && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
      }
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddClick = () => {
    setEditingAddress(null);
    setModalOpen(true);
  };

  const handleEditClick = (addr: Address) => {
    setEditingAddress(addr);
    setModalOpen(true);
  };

  const handleSubmit = async (formData: AddressFormData) => {
    setSubmitLoading(true);
    try {
      if (editingAddress) {
        const res = await fetch(`/api/addresses/${editingAddress.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(Array.isArray(data?.errors) ? data.errors.join(" ") : "خطا در ذخیره.");
        }
      } else {
        const res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(Array.isArray(data?.errors) ? data.errors.join(" ") : "خطا در ذخیره.");
        }
      }
      await fetchAddresses();
      setModalOpen(false);
    } catch (err) {
      throw err;
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این آدرس مطمئن هستید؟")) return;
    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(Array.isArray(data?.errors) ? data.errors.join(" ") : "خطا در حذف.");
      }
      await fetchAddresses();
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در حذف.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            آدرس‌ها
          </p>
          {addresses.length > 0 && (
            <button
              type="button"
              onClick={handleAddClick}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              افزودن آدرس
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">در حال بارگذاری...</div>
        ) : addresses.length === 0 ? (
          <AccountEmptyState
            message="هنوز آدرسی ثبت نکرده‌اید."
            buttonText="افزودن آدرس"
            onButtonClick={handleAddClick}
            icon={<MapPin size={24} className="text-muted-foreground" strokeWidth={1.8} />}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground">{addr.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                      {addr.addressText}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEditClick(addr)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="ویرایش"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(addr.id)}
                      disabled={deleteLoading === addr.id}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                      aria-label="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <AddressFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          editingAddress
            ? {
                title: editingAddress.title,
                addressText: editingAddress.addressText,
                latitude: editingAddress.latitude,
                longitude: editingAddress.longitude,
              }
            : null
        }
        isLoading={submitLoading}
      />
    </div>
  );
}
