"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import CommentsTable from "./components/CommentsTable";
import { getComments, deleteComment, type CommentItem } from "./lib/comments-api";

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getComments();
      setComments(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت انتقادات و پیشنهادات");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = (id: string) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, status: "تایید شده" } : c
      )
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این مورد اطمینان دارید؟")) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در حذف نظر");
    } finally {
      setDeletingId(null);
    }
  };

  const approvedCount = comments.filter((c) => c.status === "تایید شده").length;
  const pendingCount = comments.length - approvedCount;
  const commentStats = [
    { title: "کل انتقادات و پیشنهادات", value: comments.length, icon: "💬", color: "bg-violet-50 text-violet-600" },
    { title: "تایید شده", value: approvedCount, icon: "✅", color: "bg-emerald-50 text-emerald-600" },
    { title: "در انتظار", value: pendingCount, icon: "⏳", color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            مدیریت انتقادات و پیشنهادات
          </h1>
          <p className="text-sm text-gray-600">
            مشاهده و مدیریت انتقادات و پیشنهادات کاربران
          </p>
        </div>

        <AdminStatsCards items={commentStats} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
          </div>
        ) : (
          <CommentsTable
            comments={comments}
            onApprove={handleApprove}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </AdminLayout>
  );
}
