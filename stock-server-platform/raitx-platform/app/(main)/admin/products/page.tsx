"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import ProductsTable from "./components/ProductsTable";
import ProductForm, { ShopApiPayload } from "./components/ProductForm";
import { useCart } from "../../context/CartContext";

const API_URL = "https://mrpremiumhub.org/api.ashx?action=shop";
const EXCHANGE_RATE_API = "https://mrpremiumhub.org/api.ashx?action=change";
const PAGE_SIZE = 11;

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
  status: string;
  description?: string;
}

type ApiProduct = Record<string, unknown>;

/** قیمت در API به‌صورت تومان ذخیره می‌شود — بدون ضرب در نرخ ارز */
function mapApiToProduct(item: ApiProduct, index: number): Product {
  const id = String(item.id ?? item.ID ?? index + 1);
  const name = String(item.title ?? item.name ?? item.Name ?? "—");
  const category = String(item.groups ?? item.category ?? item.Category ?? "—");
  const priceIRR = Math.round(Number(item.price ?? item.Price ?? 0));
  const price =
    priceIRR > 0
      ? new Intl.NumberFormat("fa-IR").format(priceIRR) + " تومان"
      : "—";
  const stock = Math.max(0, Number(item.value ?? item.stock ?? item.Stock ?? 0));
  const sales = Math.max(0, Number(item.sales ?? item.Sales ?? item.NumberOfComments ?? 0));
  const status = stock > 0 ? "موجود" : "ناموجود";
  const description = item.text ? String(item.text) : undefined;
  return {
    id,
    name,
    category,
    price,
    stock,
    sales,
    status,
    description,
  };
}

function parseApiProducts(data: unknown): Product[] {
  if (!data || typeof data !== "object") return [];
  const obj = data as Record<string, unknown>;
  const raw =
    (obj.data as ApiProduct[] | undefined) ??
    (obj.list as ApiProduct[] | undefined) ??
    (obj.items as ApiProduct[] | undefined) ??
    (Array.isArray(data) ? data : []);
  if (!Array.isArray(raw)) return [];
  return raw.map((item, i) => mapApiToProduct(item as ApiProduct, i));
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(API_URL, { method: "GET" });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      const obj = data as Record<string, unknown>;
      if (!res.ok) {
        const msg =
          (typeof obj.error === "string" && obj.error) ||
          (typeof obj.message === "string" && obj.message) ||
          `خطای سرور (کد: ${res.status})`;
        throw new Error(msg);
      }
      const list = parseApiProducts(data);
      setProducts(list);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "خطا در دریافت لیست محصولات";
      setFetchError(msg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<import("./components/ProductForm").ApiProductForEdit | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setEditingProduct(null);
    setEditError(null);
    setShowForm(true);
  };

  const handleEdit = async (product: Product) => {
    setEditError(null);
    setEditLoading(true);
    try {
      const res = await fetch(`${API_URL}&id=${product.id}`, { method: "GET" });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      const obj = data as Record<string, unknown>;
      if (!res.ok) {
        const msg =
          (typeof obj.error === "string" && obj.error) ||
          (typeof obj.message === "string" && obj.message) ||
          "خطا در دریافت اطلاعات محصول";
        throw new Error(msg);
      }
      const apiProduct = obj as unknown as import("./components/ProductForm").ApiProductForEdit;
      setEditingProduct({
        id: apiProduct.id ?? product.id,
        title: apiProduct.title,
        groups: apiProduct.groups,
        brand: apiProduct.brand,
        price: apiProduct.price,
        value: apiProduct.value,
        img: apiProduct.img,
        video: apiProduct.video,
        text: apiProduct.text,
        Specifications: apiProduct.Specifications,
        Score: apiProduct.Score,
        NumberOfComments: apiProduct.NumberOfComments,
        UserComments: apiProduct.UserComments,
        search: apiProduct.search,
        RelatedProducts: apiProduct.RelatedProducts,
        inPersonDelivery: apiProduct.inPersonDelivery,
      });
      setShowForm(true);
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "خطا در بارگذاری محصول برای ویرایش"
      );
    } finally {
      setEditLoading(false);
    }
  };

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [bulkPriceInput, setBulkPriceInput] = useState("");
  const [bulkPriceLoading, setBulkPriceLoading] = useState(false);
  const [bulkPriceError, setBulkPriceError] = useState<string | null>(null);
  const [bulkPriceProgress, setBulkPriceProgress] = useState<{ current: number; total: number } | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این محصول اطمینان دارید؟")) return;
    setDeleteError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}&id=${id}`, { method: "DELETE" });
      let data: Record<string, unknown> = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      const isFailed = !res.ok || data.statu === 0;
      if (isFailed) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          (typeof data.message === "string" && data.message) ||
          "حذف ناموفق بود. لطفاً دوباره تلاش کنید.";
        throw new Error(msg);
      }
      await fetchProducts();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "خطا در حذف محصول"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = (_data?: ShopApiPayload) => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleBulkPriceOpen = async () => {
    setBulkPriceError(null);
    setBulkPriceInput("");
    setBulkPriceProgress(null);
    setShowBulkPriceModal(true);
    try {
      const res = await fetch(EXCHANGE_RATE_API);
      const data = await res.json();
      if (data?.buy != null) setExchangeRate(Number(data.buy));
      else setExchangeRate(0);
    } catch {
      setExchangeRate(0);
    }
  };

  const handleBulkPriceSubmit = async () => {
    const priceDollar = parseFloat(bulkPriceInput);
    if (!Number.isFinite(priceDollar) || priceDollar < 0) {
      setBulkPriceError("قیمت را به‌صورت عدد معتبر (دلار) وارد کنید.");
      return;
    }
    if (exchangeRate <= 0) {
      setBulkPriceError("نرخ ارز در دسترس نیست. لطفاً چند ثانیه صبر کنید و دوباره امتحان کنید.");
      return;
    }
    if (products.length === 0) {
      setBulkPriceError("محصولی برای به‌روزرسانی وجود ندارد.");
      return;
    }
    const priceNum = Math.round(priceDollar * exchangeRate);
    setBulkPriceError(null);
    setBulkPriceLoading(true);
    setBulkPriceProgress({ current: 0, total: products.length });
    let failed = 0;
    try {
      for (let i = 0; i < products.length; i++) {
        setBulkPriceProgress({ current: i + 1, total: products.length });
        const id = products[i].id;
        let getRes: Response;
        try {
          getRes = await fetch(`${API_URL}&id=${id}`, { method: "GET" });
        } catch {
          failed++;
          continue;
        }
        let raw: Record<string, unknown> = {};
        try {
          const parsed = await getRes.json();
          raw = typeof parsed === "object" && parsed != null ? (parsed as Record<string, unknown>) : {};
        } catch {
          failed++;
          continue;
        }
        if (!getRes.ok) {
          failed++;
          continue;
        }
        const idValue =
          typeof raw.id === "number" || typeof raw.id === "string"
            ? raw.id
            : id;
        const payload: ShopApiPayload = { id: idValue, price: priceNum };
        if (raw.title != null && raw.title !== "") payload.title = String(raw.title);
        if (raw.groups != null && raw.groups !== "") payload.groups = String(raw.groups);
        if (raw.img != null && raw.img !== "") payload.img = String(raw.img);
        if (raw.video != null && raw.video !== "") payload.video = String(raw.video);
        if (typeof raw.value === "number" && raw.value >= 0) payload.value = raw.value;
        if (raw.text != null && raw.text !== "") payload.text = String(raw.text);
        if (raw.search != null && raw.search !== "") payload.search = String(raw.search);
        if (raw.RelatedProducts != null && raw.RelatedProducts !== "") payload.RelatedProducts = String(raw.RelatedProducts);
        const patchRes = await fetch(`${API_URL}&id=${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        let patchData: Record<string, unknown> = {};
        try {
          patchData = (await patchRes.json()) as Record<string, unknown>;
        } catch {
          patchData = {};
        }
        if (!patchRes.ok || patchData.statu === 0) failed++;
      }
      await fetchProducts();
      setShowBulkPriceModal(false);
      setBulkPriceInput("");
      setBulkPriceProgress(null);
      if (failed > 0) {
        setBulkPriceError(`قیمت ${products.length - failed} محصول به‌روز شد. ${failed} مورد خطا داشت.`);
        setShowBulkPriceModal(true);
      }
    } catch (err) {
      setBulkPriceError(err instanceof Error ? err.message : "خطا در به‌روزرسانی قیمت‌ها");
    } finally {
      setBulkPriceLoading(false);
      setBulkPriceProgress(null);
    }
  };

  const { items: cartItems } = useCart();

  const cartQuantityByProductId = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cartItems) {
      const id = String(item.product.id);
      map[id] = (map[id] ?? 0) + item.quantity;
    }
    return map;
  }, [cartItems]);

  /** دسته‌بندی‌های یکتا از محصولات (همان‌طور که ادمین اضافه کرده) */
  const uniqueCategories = useMemo(() => {
    const cats = products.map((p) => p.category).filter((c) => c && c !== "—");
    return [...new Set(cats)].sort((a, b) => a.localeCompare(b, "fa"));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const withCart = products.map((p) => ({
      ...p,
      stock: Math.max(0, p.stock),
      sales: Math.max(0, cartQuantityByProductId[p.id] ?? 0),
    }));
    const bySearch = searchTerm.trim()
      ? withCart.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : withCart;
    const byCategory = categoryFilter.trim()
      ? bySearch.filter((product) => product.category === categoryFilter)
      : bySearch;
    return byCategory;
  }, [products, searchTerm, categoryFilter, cartQuantityByProductId]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const inStockCount = products.filter((p) => p.stock > 0).length;
  const outOfStockCount = products.length - inStockCount;
  const productStats = [
    { title: "تعداد محصولات", value: products.length, icon: "🛍️", color: "bg-emerald-50 text-emerald-600" },
    { title: "موجود در انبار", value: inStockCount, icon: "✅", color: "bg-green-50 text-green-600" },
    { title: "ناموجود", value: outOfStockCount, icon: "⏳", color: "bg-amber-50 text-amber-600" },
  ];
  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
      ),
    [filteredProducts, safePage]
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);
  }, [currentPage, totalPages]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              مدیریت محصولات فروشگاه
            </h1>
            <p className="text-sm text-gray-500">
              افزودن محصول جدید، ویرایش و حذف محصولات موجود
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleBulkPriceOpen}
              disabled={products.length === 0}
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 text-sm font-medium rounded-xl hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              یکسان‌سازی قیمت همه
            </button>
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium rounded-xl hover:bg-[#ff6b52] hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-200 shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              افزودن محصول جدید
            </button>
          </div>
        </div>

        <AdminStatsCards items={productStats} />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو در لیست محصولات (نام یا دسته‌بندی)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 bg-white rounded-xl border border-gray-200 pl-12 pr-12 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/20 focus:border-[#ff5538] transition-all text-sm shadow-sm"
            />
            <svg
              className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-0">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap shrink-0">
              دسته‌بندی:
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-12 w-full sm:w-[220px] bg-white rounded-xl border border-gray-200 px-4 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/20 focus:border-[#ff5538] transition-all text-sm shadow-sm cursor-pointer"
            >
              <option value="">همه دسته‌ها</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {editError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white text-lg">!</span>
            <div className="flex-1">
              <p className="font-medium mb-0.5">علت خطا در بارگذاری محصول برای ویرایش:</p>
              <p>{editError}</p>
              <button
                onClick={() => setEditError(null)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        )}

        {deleteError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white text-lg">!</span>
            <div className="flex-1">
              <p className="font-medium mb-0.5">علت خطا در حذف محصول:</p>
              <p>{deleteError}</p>
              <button
                onClick={() => setDeleteError(null)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        )}

        {fetchError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white text-lg">!</span>
            <div className="flex-1">
              <p className="font-medium mb-0.5">علت خطا در دریافت لیست محصولات:</p>
              <p>{fetchError}</p>
              <button
                onClick={fetchProducts}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium text-sm transition-colors"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
              <p className="text-sm text-gray-500">در حال بارگذاری لیست محصولات از سرور...</p>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <ProductsTable
              products={paginatedProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
              editLoading={editLoading}
            />
            {filteredProducts.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-2">
                <p className="text-sm text-gray-600">
                  نمایش {(safePage - 1) * PAGE_SIZE + 1} تا {Math.min(safePage * PAGE_SIZE, filteredProducts.length)} از {filteredProducts.length} محصول
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    قبلی
                  </button>
                  <span className="text-sm text-gray-600 px-2">
                    صفحه {safePage} از {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {showForm && (
          <ProductForm
            product={editingProduct ?? undefined}
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            onSave={handleSave}
          />
        )}

        {showBulkPriceModal && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                یکسان‌سازی قیمت همه محصولات
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                قیمت تمام {products.length} محصول بر اساس مبلغ دلاری واردشده و نرخ ارز API به تومان تبدیل و ذخیره می‌شود.
              </p>
              {exchangeRate > 0 && (
                <p className="text-xs text-gray-500 mb-2">نرخ ارز فعلی: {new Intl.NumberFormat("fa-IR").format(exchangeRate)} تومان</p>
              )}
              <input
                type="number"
                min={0}
                step="0.01"
                value={bulkPriceInput}
                onChange={(e) => {
                  setBulkPriceInput(e.target.value);
                  setBulkPriceError(null);
                }}
                placeholder="قیمت جدید (دلار)"
                disabled={bulkPriceLoading}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm mb-2"
              />
              {exchangeRate > 0 && bulkPriceInput.trim() !== "" && !Number.isNaN(parseFloat(bulkPriceInput)) && parseFloat(bulkPriceInput) >= 0 && (
                <p className="text-xs text-amber-600 mb-4">
                  معادل: {new Intl.NumberFormat("fa-IR").format(Math.round(parseFloat(bulkPriceInput) * exchangeRate))} تومان (در API ذخیره می‌شود)
                </p>
              )}
              {bulkPriceProgress && (
                <p className="text-sm text-amber-600 mb-4">
                  در حال به‌روزرسانی {bulkPriceProgress.current} از {bulkPriceProgress.total}...
                </p>
              )}
              {bulkPriceError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
                  {bulkPriceError}
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!bulkPriceLoading) {
                      setShowBulkPriceModal(false);
                      setBulkPriceError(null);
                      setBulkPriceProgress(null);
                    }
                  }}
                  disabled={bulkPriceLoading}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl disabled:opacity-50"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleBulkPriceSubmit}
                  disabled={bulkPriceLoading}
                  className="px-5 py-2.5 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bulkPriceLoading ? "در حال اعمال..." : "اعمال قیمت برای همه"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
