"use client";

import React from "react";

export interface Article {
  id: string;
  title: string;
  category: string;
  views: number;
  status: string;
  date: string;
}

interface ArticlesTableProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
  editLoading?: boolean;
}

export default function ArticlesTable({
  articles,
  onEdit,
  onDelete,
  deletingId = null,
  editLoading = false,
}: ArticlesTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                عنوان
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                دسته‌بندی
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                بازدید
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                وضعیت
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                تاریخ
              </th>
              <th className="text-right py-4 px-5 font-semibold text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m4-4h-1.5V1a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-3.5"
                      />
                    </svg>
                    <p>مقاله‌ای در لیست یافت نشد</p>
                  </div>
                </td>
              </tr>
            ) : (
              articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`cursor-pointer border-b border-gray-50 transition-colors duration-150 hover:bg-[#ff5538]/5 ${
                    index % 2 === 1 ? "bg-gray-50/30" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-5 cursor-pointer">
                    <p className="text-gray-900 font-medium truncate max-w-[180px] cursor-pointer">
                      {article.title}
                    </p>
                  </td>
                  <td className="py-4 px-5 cursor-pointer">
                    <span className="text-gray-600 truncate block max-w-[120px] cursor-pointer">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 cursor-pointer">
                    <span className="text-gray-600 tabular-nums cursor-pointer">
                      {article.views}
                    </span>
                  </td>
                  <td className="py-4 px-5 cursor-pointer">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full cursor-pointer ${
                        article.status === "منتشر شده"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          article.status === "منتشر شده"
                            ? "bg-emerald-500"
                            : "bg-gray-500"
                        }`}
                      />
                      {article.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 cursor-pointer">
                    <span className="text-gray-600 cursor-pointer">{article.date}</span>
                  </td>
                  <td className="py-4 px-5 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(article)}
                        disabled={editLoading}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#ff5538] bg-[#ff5538]/10 hover:bg-[#ff5538]/20 font-medium text-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                        onClick={() => onDelete(article.id)}
                        disabled={deletingId === article.id}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 font-medium text-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {deletingId === article.id ? (
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
                        {deletingId === article.id ? "در حال حذف..." : "حذف"}
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
