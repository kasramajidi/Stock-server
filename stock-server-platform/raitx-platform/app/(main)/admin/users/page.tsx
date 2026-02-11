"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";

export interface RegistrationUser {
  name: string;
  email: string;
  phone: string;
  at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<RegistrationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/register-log");
      const data = await res.json();
      if (data.error) {
        setUsers([]);
        return;
      }
      setUsers(data.registrations ?? []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (index: number, user: RegistrationUser) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index: number) => {
    if (!confirm("آیا از حذف این کاربر اطمینان دارید؟")) return;
    try {
      const res = await fetch(`/api/register-log?index=${index}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        await fetchUsers();
      }
    } catch {
      // ignore
    }
  };

  const handleClearAll = async () => {
    if (!confirm("آیا می‌خواهید همهٔ کاربران پاک شوند؟")) return;
    try {
      const res = await fetch("/api/register-log", { method: "DELETE" });
      const data = await res.json();
      if (data.ok) {
        setUsers([]);
        setShowForm(false);
        setEditingIndex(null);
      }
    } catch {
      // ignore
    }
  };

  const handleSave = async (formData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (editingIndex === null) return;
    try {
      const res = await fetch("/api/register-log", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: editingIndex,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setUsers(data.registrations ?? []);
        setShowForm(false);
        setEditingIndex(null);
      }
    } catch {
      // ignore
    }
  };

  const usersWithIndex = users.map((user, i) => ({ ...user, index: i }));
  const filteredUsers = usersWithIndex.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const userStats = [
    { title: "کل کاربران", value: users.length, icon: "👥", color: "bg-blue-50 text-blue-600" },
    { title: "دارای ایمیل", value: users.filter((u) => u.email?.trim()).length, icon: "📧", color: "bg-emerald-50 text-emerald-600" },
    { title: "دارای تلفن", value: users.filter((u) => u.phone?.trim()).length, icon: "📱", color: "bg-violet-50 text-violet-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              مدیریت کاربران
            </h1>
            <p className="text-sm text-gray-600">
              مشاهده و مدیریت کاربران ثبت‌نام‌شده ({users.length} نفر)
            </p>
          </div>
          <div className="flex items-center gap-2">
            {users.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2.5 text-sm font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors"
              >
                پاک کردن همه
              </button>
            )}
          </div>
        </div>

        <AdminStatsCards items={userStats} />

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در نام، ایمیل یا شماره..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        {loading ? (
          <p className="text-gray-500 py-8 text-center">در حال بارگذاری…</p>
        ) : (
          <UsersTable
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {showForm && editingIndex !== null && users[editingIndex] && (
          <UserForm
            user={users[editingIndex]}
            onClose={() => {
              setShowForm(false);
              setEditingIndex(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
