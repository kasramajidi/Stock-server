"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Entry {
  name: string;
  email: string;
  phone: string;
  at: string;
}

interface ApiResponse {
  count: number;
  registrations: Entry[];
}

export default function RegistrationsPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/register-log")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setData({ count: json.count, registrations: json.registrations ?? [] });
      })
      .catch(() => setError("خطا در بارگذاری"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-8 pb-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <p className="text-gray-500">در حال بارگذاری…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-8 pb-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <p className="text-red-600">{error}</p>
          <Link href="/auth" className="text-[#ff5538] mt-4 inline-block">
            بازگشت به ورود
          </Link>
        </div>
      </main>
    );
  }

  const list = data?.registrations ?? [];
  const count = data?.count ?? 0;

  return (
    <main className="min-h-screen bg-white pt-8 pb-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            لیست ثبت‌نام‌ها (فقط برای خودت)
          </h1>
          <Link
            href="/auth"
            className="text-sm text-[#ff5538] hover:opacity-80"
          >
            بازگشت به ورود
          </Link>
        </div>
        <p className="text-gray-600 mb-4">
          تعداد: <strong>{count}</strong> نفر
        </p>
        {list.length === 0 ? (
          <p className="text-gray-500">هنوز کسی از این سایت ثبت‌نام نکرده.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 font-medium text-gray-700">ردیف</th>
                  <th className="p-3 font-medium text-gray-700">نام</th>
                  <th className="p-3 font-medium text-gray-700">ایمیل</th>
                  <th className="p-3 font-medium text-gray-700">شماره تماس</th>
                  <th className="p-3 font-medium text-gray-700">زمان</th>
                </tr>
              </thead>
              <tbody>
                {list.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50/50"
                  >
                    <td className="p-3 text-gray-600">{i + 1}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.email}</td>
                    <td className="p-3 font-mono">{row.phone}</td>
                    <td className="p-3 text-gray-500 text-xs">
                      {row.at
                        ? new Date(row.at).toLocaleString("fa-IR")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
