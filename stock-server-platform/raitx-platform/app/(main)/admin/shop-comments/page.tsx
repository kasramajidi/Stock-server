"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import ShopCommentsTable from "./components/ShopCommentsTable";
import {
  getShopCommentsFromProducts,
  getShopProductsForFilter,
  deleteShopComment,
  type ShopCommentItem,
  type ShopProductOption,
} from "./lib/shop-comments-api";

export default function ShopCommentsPage() {
  const [comments, setComments] = useState<ShopCommentItem[]>([]);
  const [products, setProducts] = useState<ShopProductOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const list = await getShopProductsForFilter();
      setProducts(list);
    } catch {
      setProducts([]);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getShopCommentsFromProducts();
      setComments(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت نظرات");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const productNameById: Record<string, string> = {};
  products.forEach((p) => {
    productNameById[String(p.id)] = p.name ?? "";
  });
  const filteredComments = searchTerm.trim()
    ? comments.filter((c) => {
        const productName = c.productTitle ?? productNameById[String(c.idshop)] ?? "";
        const text = (c.commentText ?? "").toLowerCase();
        const user = (c.userName ?? "").toLowerCase();
        const q = searchTerm.toLowerCase();
        return productName.toLowerCase().includes(q) || text.includes(q) || user.includes(q);
      })
    : comments;

  const uniqueProducts = new Set(comments.map((c) => String(c.idshop))).size;
  const shopCommentStats = [
    { title: "کل نظرات فروشگاه", value: comments.length, icon: "🛒", color: "bg-blue-50 text-blue-600" },
    { title: "محصولات دارای نظر", value: uniqueProducts, icon: "📦", color: "bg-emerald-50 text-emerald-600" },
    { title: "نتیجه جستجو", value: filteredComments.length, icon: "🔍", color: "bg-violet-50 text-violet-600" },
  ];

  const handleDelete = async (idshop: number | string, id: number | string) => {
    setDeletingId(`${idshop}-${id}`);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteShopComment(idshop, id);
      setComments((prev) => prev.filter((c) => String(c.id) !== String(id) || String(c.idshop) !== String(idshop)));
      setSuccessMessage("نظر حذف شد.");
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در حذف");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            کامنت فروشگاه
          </h1>
          <p className="text-sm text-gray-600">
            نمایش UserComments محصولات؛ حذف نظر از اینجا
          </p>
        </div>

        <AdminStatsCards items={shopCommentStats} />

        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="جستجو (نام محصول، متن نظر، نام کاربر)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white rounded-xl border border-gray-200 pl-4 pr-12 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/20 focus:border-[#ff5538] transition-all text-sm shadow-sm"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
          </div>
        ) : (
          <ShopCommentsTable
            comments={filteredComments}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </AdminLayout>
  );
}
