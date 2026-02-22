"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/lib/cookie";
import { useAdminTheme } from "@/components/Admin/AdminThemeContext";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  MessageSquare,
  MessageCircle,
  FileText,
  Package,
  LogOut,
  Shield,
  PackagePlus,
  Newspaper,
  Sun,
  Moon,
  X,
} from "lucide-react";

const items: { path: string; label: string; icon: React.ElementType }[] = [
  { path: "/admin", label: "پیشخوان", icon: LayoutDashboard },
  { path: "/admin/users", label: "کاربران", icon: Users },
  { path: "/admin/cart-requests", label: "درخواست‌های سبد", icon: ShoppingCart },
  { path: "/admin/support", label: "چت پشتیبانی", icon: MessageCircle },
  { path: "/admin/contact", label: "انتقادات و پیشنهادات", icon: MessageSquare },
  { path: "/admin/articles", label: "مقالات", icon: Newspaper },
  { path: "/admin/comments", label: "کامنت مقالات", icon: FileText },
  { path: "/admin/product-comments", label: "کامنت محصولات", icon: Package },
  { path: "/admin/products", label: "محصولات", icon: PackagePlus },
];

type AdminSidebarProps = { open?: boolean; onClose?: () => void };

export default function AdminSidebar({ open = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useAdminTheme();

  const handleLogout = () => {
    clearAuth();
    router.push("/auth", { scroll: false });
  };

  const handleNavClick = () => {
    onClose?.();
  };

  const sidebarContent = (
    <>
      <div className="p-4 md:p-5 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between">
        <Link
          href="/admin"
          onClick={handleNavClick}
          className="flex items-center gap-3 text-slate-800 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-semibold">پنل ادمین</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
          aria-label="بستن منو"
        >
          <X className="h-5 w-5" />
        </button>
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
              onClick={handleNavClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-300/80 dark:hover:bg-slate-800/80 hover:text-slate-800 dark:hover:text-slate-200"
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
      <div className="p-3 border-t border-slate-300 dark:border-slate-800 space-y-1">
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-300/80 dark:hover:bg-slate-800/80 transition-colors"
          title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "حالت روشن" : "حالت تاریک"}
        </button>
        <Link
          href="/"
          onClick={handleNavClick}
          className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-300/80 dark:hover:bg-slate-800/80 transition-colors"
        >
          بازگشت به سایت
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400/90 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          خروج
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* پس‌زمینه برای بستن در موبایل */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden
          onClick={onClose}
        />
      )}
      <aside
        className={`
          w-64 shrink-0 border-l border-slate-300 dark:border-slate-800 bg-slate-200/80 dark:bg-slate-900/50 flex flex-col
          fixed md:static inset-y-0 right-0 z-50 md:z-auto
          transform transition-transform duration-300 ease-out md:transform-none
          ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
        style={{ animation: "adminSlideIn 0.35s ease-out" }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
