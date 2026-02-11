"use client";

import React from "react";
import type { ArticleCommentItem } from "../lib/article-comments-api";

interface ArticleCommentsTableProps {
  comments: ArticleCommentItem[];
  onDelete: (idarticle: number | string, id: number | string) => Promise<void>;
  deletingId: string | null;
}

export default function ArticleCommentsTable({
  comments,
  onDelete,
  deletingId,
}: ArticleCommentsTableProps) {
  const rowKey = (c: ArticleCommentItem) => `${c.idarticle}-${c.id}`;

  const handleDelete = async (c: ArticleCommentItem) => {
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return;
    await onDelete(c.idarticle, c.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-right py-3 px-4 font-medium text-gray-700">مقاله (idarticle)</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">نام</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">ایمیل</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">امتیاز</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">متن نظر</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">وضعیت</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  نظری ثبت نشده است.
                </td>
              </tr>
            ) : (
              comments.map((c) => {
                const key = rowKey(c);
                const isDeleting = deletingId === key;
                const isPublished =
                  (c.status ?? "").toLowerCase() === "published" || c.status === "1";
                return (
                  <tr key={key} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-gray-700">
                      {c.articleTitle ? `${c.articleTitle} (${c.idarticle})` : c.idarticle}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{c.userName}</td>
                    <td className="py-3 px-4 text-gray-600">{c.userEmail}</td>
                    <td className="py-3 px-4">{c.rating ?? "—"}</td>
                    <td className="py-3 px-4 text-gray-700 max-w-xs truncate">{c.commentText}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                          isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {isPublished ? "منتشر شده" : "در انتظار"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(c)}
                        disabled={isDeleting}
                        className="text-xs text-red-600 hover:underline disabled:opacity-50"
                      >
                        {isDeleting ? "در حال حذف..." : "حذف"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
