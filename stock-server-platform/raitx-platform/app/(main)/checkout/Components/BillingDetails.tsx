"use client";

import React from "react";

export type BillingInitialContact = { name: string; phone: string };

interface BillingDetailsProps {
  initialContact?: BillingInitialContact;
}

export default function BillingDetails({ initialContact }: BillingDetailsProps) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-medium text-gray-900 text-right mb-6">
          جزئیات صورتحساب
        </h3>

        <form className="space-y-5" aria-label="فرم اطلاعات صورتحساب">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="first-name"
              >
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                id="first-name"
                name="billing-name"
                type="text"
                placeholder="نام و نام خانوادگی"
                defaultValue={initialContact?.name ?? ""}
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 text-right mb-1.5"
                htmlFor="billing-phone"
              >
                شماره تماس <span className="text-red-500">*</span>
              </label>
              <input
                id="billing-phone"
                name="billing-phone"
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                defaultValue={initialContact?.phone ?? ""}
                className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 text-right mb-1.5"
              htmlFor="company"
            >
              نام شرکت (اختیاری)
            </label>
            <input
              id="company"
              name="billing-company"
              type="text"
              placeholder="نام شرکت"
              className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 text-right mb-2">
              توضیحات سفارش
            </h4>
            <textarea
              id="order-notes"
              name="order-notes"
              placeholder="توضیحات اضافی برای سفارش خود بنویسید (اختیاری)"
              className="w-full h-20 bg-white border-b border-gray-300 px-3 py-2 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors resize-none text-sm"
              rows={3}
              aria-label="توضیحات سفارش"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
