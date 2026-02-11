"use client";

import React from "react";

function StockStatusBadge({
  stock,
  inCart = 0,
}: {
  stock: number;
  inCart?: number;
}) {
  const available = Math.max(0, stock - inCart);
  const isAvailable = available > 0;
  const statusText = isAvailable ? "موجود" : "ناموجود";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
        isAvailable
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
          : "bg-red-50 text-red-700 ring-1 ring-red-100"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isAvailable ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {statusText}
    </span>
  );
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void | Promise<void>;
  onDelete: (id: string) => void;
  deletingId?: string | null;
  editLoading?: boolean;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  deletingId = null,
  editLoading = false,
}: ProductsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                نام محصول
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                دسته‌بندی محصول
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                قیمت محصول
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                موجودی انبار
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                تعداد در سبد خرید
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                وضعیت موجودی
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                عملیات محصول
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center text-gray-500 bg-gray-50/50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8 4-8-4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <p>محصولی در لیست یافت نشد</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b border-gray-50 transition-colors duration-150 hover:bg-[#ff5538]/5 ${
                    index % 2 === 1 ? "bg-gray-50/30" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-5">
                    <p className="text-gray-900 font-medium truncate max-w-[180px]">
                      {product.name}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gray-600 truncate block max-w-[120px]">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gray-900 font-medium tabular-nums">
                      {product.price}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gray-600 font-medium tabular-nums">
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-gray-600 tabular-nums">
                      {product.sales}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <StockStatusBadge stock={product.stock} inCart={product.sales} />
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        disabled={editLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#ff5538] bg-[#ff5538]/10 hover:bg-[#ff5538]/20 font-medium text-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        ویرایش
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 font-medium text-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {deletingId === product.id ? (
                          <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                        {deletingId === product.id ? "در حال حذف..." : "حذف"}
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
