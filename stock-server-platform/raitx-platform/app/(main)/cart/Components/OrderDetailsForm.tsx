"use client";

import React from "react";

export interface ProductSummary {
  name: string;
  price: number;
  quantity: number;
}

export interface ContactInfo {
  name: string;
  phone: string;
}

export interface OrderDetailsData {
  amount: string;
  currencyType: string;
  destinationUrl: string;
  loginRequired: string;
  fastOrder: boolean;
  stepsDescription: string;
  attachmentFile: File | null;
}

export const defaultOrderDetails: OrderDetailsData = {
  amount: "",
  currencyType: "",
  destinationUrl: "",
  loginRequired: "",
  fastOrder: false,
  stepsDescription: "",
  attachmentFile: null,
};

interface OrderDetailsFormProps {
  data: OrderDetailsData;
  onChange: (data: OrderDetailsData) => void;
  productSummary?: ProductSummary;
  /** اطلاعات تماس کاربر (از سبد خرید) برای نمایش در همین فرم */
  contact?: ContactInfo;
}

export default function OrderDetailsForm({ data, onChange, productSummary, contact }: OrderDetailsFormProps) {
  const update = (part: Partial<OrderDetailsData>) => {
    onChange({ ...data, ...part });
  };

  return (
    <div className="space-y-6 text-right">
      {/* اطلاعات تماس کاربر */}
      {(contact?.name || contact?.phone) && (
        <section className="border border-gray-100 rounded-xl p-4 bg-sky-50/50">
          <h4 className="font-medium text-gray-900 mb-3">اطلاعات تماس</h4>
          <div className="space-y-2 text-sm">
            {contact.name && (
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">نام و نام خانوادگی:</span>
                <span className="font-medium text-gray-900">{contact.name}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">شماره تماس:</span>
                <span className="font-medium text-gray-900" dir="ltr">{contact.phone}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* خلاصه محصول */}
      {productSummary && (
        <section className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
          <h4 className="font-medium text-gray-900 mb-3">خلاصه محصول</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-gray-600">نام محصول:</span>
              <span className="font-medium text-gray-900">{productSummary.name}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-gray-600">قیمت واحد:</span>
              <span className="font-medium text-gray-900">
                {new Intl.NumberFormat("fa-IR").format(productSummary.price)} تومان
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-gray-600">تعداد:</span>
              <span className="font-medium text-gray-900">{new Intl.NumberFormat("fa-IR").format(productSummary.quantity)}</span>
            </div>
            <div className="flex justify-between gap-2 pt-2 border-t border-gray-200">
              <span className="text-gray-600">جمع:</span>
              <span className="font-bold text-[#ff5538]">
                {new Intl.NumberFormat("fa-IR").format(productSummary.price * productSummary.quantity)} تومان
              </span>
            </div>
          </div>
        </section>
      )}

      {/* سفارش سریع */}
      <section className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-0.5">سفارش سریع</h4>
            <p className="text-xs text-gray-600">
              با فعال کردن این گزینه، سفارش شما حداکثر تا ۱ ساعت انجام شده و ۱٪ کارمزد بیشتر به مبلغ نهایی اضافه می‌شود.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.fastOrder}
            aria-label={data.fastOrder ? "سفارش سریع فعال است" : "سفارش سریع غیرفعال است"}
            onClick={() => update({ fastOrder: !data.fastOrder })}
            className={`shrink-0 w-14 h-8 rounded-full border-2 overflow-hidden transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff5538] focus:ring-offset-2 flex items-center ${
              data.fastOrder
                ? "bg-[#ff5538] border-[#ff5538]"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <span
              className={`block w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 shrink-0 transition-transform duration-200 ${
                data.fastOrder ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </section>

      {/* مراحل رسیدن به درگاه پرداخت */}
      <section className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
        <h4 className="font-medium text-gray-900 mb-1">مراحل رسیدن به درگاه پرداخت سایت مقصد</h4>
        <p className="text-xs text-gray-600 mb-3">
          مراحلی که تا رسیدن به درگاه پرداخت سایت مقصد باید انجام شود را بنویسید
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
          <textarea
            placeholder="توضیحات سفارش خود را بنویسید"
            value={data.stepsDescription}
            onChange={(e) => update({ stepsDescription: e.target.value })}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-right resize-none focus:ring-2 focus:ring-[#ff5538] focus:border-transparent"
          />
        </div>
      </section>
    </div>
  );
}
