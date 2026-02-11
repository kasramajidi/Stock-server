"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getRecentOrders, type OrderItem } from "../lib/dashboard-api";

export default function RecentOrders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">سفارشات اخیر</h3>
        </div>
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">سفارشات اخیر</h3>
        <Link
          href="/admin/orders"
          className="text-xs sm:text-sm text-[#ff5538] hover:underline font-medium"
        >
          مشاهده همه
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                شماره
              </th>
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                مشتری
              </th>
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                محصول
              </th>
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                مبلغ
              </th>
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                وضعیت
              </th>
              <th className="text-right py-3 px-3 sm:px-4 font-medium text-gray-500 text-xs">
                تاریخ
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-3 sm:px-4 text-gray-900 font-medium">
                  {order.id}
                </td>
                <td className="py-3 px-3 sm:px-4 text-gray-600">
                  {order.customer}
                </td>
                <td className="py-3 px-3 sm:px-4 text-gray-600">
                  {order.product}
                </td>
                <td className="py-3 px-3 sm:px-4 text-gray-900 font-medium">
                  {order.amount}
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3 sm:px-4 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
