"use client";

import React, { useState } from "react";

interface Order {
  id: string;
  customer: string;
  products: string;
  amount: string;
  totalNumber: number;
  status: string;
  date: string;
}

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
  onDetails?: (order: Order) => void;
}

export default function OrdersTable({
  orders,
  onStatusChange,
  onDelete,
  onDetails,
}: OrdersTableProps) {
  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  const statusOptions = [
    "در حال پردازش",
    "ارسال شده",
    "تحویل داده شده",
    "لغو شده",
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                شماره سفارش
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                مشتری
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                محصولات
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                مبلغ
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                وضعیت
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  سفارشی یافت نشد
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-700">{order.products}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {order.amount}
                  </td>
                  <td className="py-3 px-4">
                    {editingStatus === order.id ? (
                      <select
                        value={order.status}
                        onChange={(e) => {
                          onStatusChange(order.id, e.target.value);
                          setEditingStatus(null);
                        }}
                        onBlur={() => setEditingStatus(null)}
                        autoFocus
                        className="px-2 py-1 text-xs font-medium bg-white border border-gray-300 rounded focus:outline-none focus:border-[#ff5538]"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200"
                        onClick={() => setEditingStatus(order.id)}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDetails?.(order)}
                      className="text-[#ff5538] hover:underline text-xs"
                    >
                      جزئیات
                    </button>
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(order.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        حذف
                      </button>
                    )}
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
