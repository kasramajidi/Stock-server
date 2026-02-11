"use client";

import type { ShopProduct } from "@/app/(main)/shop/lib/shop-api";
import { useInternationalSimSelection } from "../context/InternationalSimSelectionContext";

interface DomainExtensionItem {
  id: string;
  ext: string;
  priceFallback: string;
  description: string;
}

const domainExtensionList: DomainExtensionItem[] = [
  { id: "com", ext: "com.", priceFallback: "از 10.99$", description: "محبوب‌ترین پسوند دامنه" },
  { id: "net", ext: "net.", priceFallback: "از 12.99$", description: "مناسب برای شبکه ها" },
  { id: "org", ext: "org.", priceFallback: "از 11.99$", description: "برای سازمانها" },
  { id: "info", ext: "info.", priceFallback: "از 9.99$", description: "برای اطلاعات عمومی" },
  { id: "biz", ext: "biz.", priceFallback: "از 13.99$", description: "برای کسب و کار" },
  { id: "co", ext: "co.", priceFallback: "از 24.99$", description: "جایگزین مدرن .com" },
];

function findProductForDomainExt(
  extId: string,
  products: ShopProduct[]
): ShopProduct | undefined {
  const n = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const ext = extId.toLowerCase();
  const dotExt = `.${ext}`;
  const extDot = `${ext}.`;
  return products.find((p) => {
    const name = n(p.name);
    return (
      name.includes(dotExt) ||
      name.includes(extDot) ||
      name === ext ||
      name.endsWith(` ${ext}`) ||
      name.endsWith(` ${dotExt}`) ||
      name.includes(`دامنه ${ext}`) ||
      name.includes(`دامنه ${dotExt}`) ||
      name.includes(`domain ${ext}`)
    );
  });
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

interface DomainExtensionsProps {
  initialProducts?: ShopProduct[];
}

export default function DomainExtensions({
  initialProducts = [],
}: DomainExtensionsProps) {
  const selection = useInternationalSimSelection();
  const selectedProduct = selection?.selectedProduct ?? null;
  const setSelectedProduct = selection?.setSelectedProduct;

  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        انواع پسوند دامنه
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        پسوند مناسب برای کسب و کار خود انتخاب کنید
      </p>
      {initialProducts.length > 0 && (
        <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-4">
          روی هر پسوند کلیک کنید تا در باکس ثبت سفارش سمت چپ قیمت و گزینه ثبت سفارش نمایش داده شود.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {domainExtensionList.map((item) => {
          const matched = findProductForDomainExt(item.id, initialProducts);
          const isSelected = matched && selectedProduct?.id === matched.id;
          const priceText = matched
            ? formatPrice(matched.price)
            : item.priceFallback;

          if (matched && setSelectedProduct) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedProduct(isSelected ? null : matched);
                  if (typeof window !== "undefined" && window.innerWidth < 768 && matched) {
                    setTimeout(
                      () =>
                        document.getElementById("order-box")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      150
                    );
                  }
                }}
                className={`bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border-2 text-right w-full transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? "border-[#ff5538] ring-2 ring-[#ff5538]/30"
                    : "border-gray-100 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    {item.ext}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 shrink-0 tabular-nums">
                    {priceText}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-5">
                  {item.description}
                </p>
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {item.ext}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 shrink-0">
                  {item.priceFallback}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-5">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
