"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/lib/cookie";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  MessageSquare,
  FileText,
  Package,
  LogOut,
  Shield,
  PackagePlus,
} from "lucide-react";

const items: { path: string; label: string; icon: React.ElementType }[] = [
  { path: "/admin", label: "پیشخوان", icon: LayoutDashboard },
  { path: "/admin/users", label: "کاربران", icon: Users },
  { path: "/admin/cart-requests", label: "درخواست‌های سبد", icon: ShoppingCart },
  { path: "/admin/contact", label: "تماس‌ها", icon: MessageSquare },
  { path: "/admin/comments", label: "کامنت مقالات", icon: FileText },
  { path: "/admin/product-comments", label: "کامنت محصولات", icon: Package },
  { path: "/admin/products", label: "محصولات", icon: PackagePlus },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth", { scroll: false });
  };

  return (
    <aside
      className="w-64 shrink-0 border-l border-slate-800 bg-slate-900/50 flex flex-col"
      style={{ animation: "adminSlideIn 0.35s ease-out" }}
    >
      <div className="p-5 border-b border-slate-800">
        <Link
          href="/admin"
          className="flex items-center gap-3 text-slate-100 hover:text-cyan-400 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-semibold">پنل ادمین</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item, i) => {
          const isActive =
            item.path === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
              }`}
              style={{
                animation: "adminFadeIn 0.4s ease-out backwards",
                animationDelay: `${i * 40}ms`,
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-800">
        <Link
          href="/"
          className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 transition-colors"
        >
          بازگشت به سایت
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400/90 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          خروج
        </button>
      </div>
    </aside>
  );
}
