"use client";

import React from "react";

export interface RegistrationUserRow {
  name: string;
  email: string;
  phone: string;
  at: string;
  index: number;
}

interface UsersTableProps {
  users: RegistrationUserRow[];
  onEdit: (index: number, user: RegistrationUserRow) => void;
  onDelete: (index: number) => void;
}

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                ردیف
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نام
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                ایمیل
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                شماره تماس
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تاریخ عضویت
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  کاربری یافت نشد
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-600">{user.index + 1}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{user.email}</td>
                  <td className="py-3 px-4 text-gray-700 font-mono">
                    {user.phone}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {user.at
                      ? new Date(user.at).toLocaleDateString("fa-IR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(user.index, user)}
                        className="text-[#ff5538] hover:underline text-xs"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => onDelete(user.index)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
