"use client";

import React from "react";
import AdminLayout from "./components/AdminLayout";
import StatsCards from "./components/StatsCards";
import RecentOrders from "./components/RecentOrders";
import QuickActions from "./components/QuickActions";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            داشبورد
          </h1>
          <p className="text-sm text-gray-500">
            خوش آمدید به پنل مدیریت ريتكس
          </p>
        </div>

        <StatsCards />

        <QuickActions />

        <RecentOrders />
      </div>
    </AdminLayout>
  );
}
