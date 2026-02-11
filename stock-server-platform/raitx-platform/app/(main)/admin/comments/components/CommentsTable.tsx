"use client";

import React from "react";

interface Comment {
  id: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  date?: string;
}

interface CommentsTableProps {
  comments: Comment[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

export default function CommentsTable({
  comments,
  onDelete,
  deletingId = null,
}: CommentsTableProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عنوان
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                نام
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                ایمیل
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تماس
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                متن درخواست
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                تاریخ
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  موردی یافت نشد
                </td>
              </tr>
            ) : (
              comments.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {row.title}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{row.name}</td>
                  <td className="py-3 px-4 text-gray-700">{row.email}</td>
                  <td className="py-3 px-4 text-gray-600">{row.phone}</td>
                  <td className="py-3 px-4 text-gray-700 max-w-xs truncate">
                    {row.comment}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{row.date ?? "—"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onDelete(row.id)}
                      disabled={deletingId === row.id}
                      className="text-red-600 hover:underline text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === row.id ? "در حال حذف..." : "حذف"}
                    </button>
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
