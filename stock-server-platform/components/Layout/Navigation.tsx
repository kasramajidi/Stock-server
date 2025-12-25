import Link from "next/link";

export default function Navigation() {
  const navItems = [
    { label: "دسته بندی محصولات", href: "/categories", icon: "☰" },
    { label: "صفحه اصلی", href: "/", icon: "🏠" },
    { label: "فروشگاه", href: "/shop", icon: "🏪" },
    { label: "وبلاگ", href: "/blog", icon: "📄" },
    { label: "تماس با ما", href: "/contact", icon: "👥" },
    { label: "درباره ما", href: "/about", icon: "ℹ️" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 z-0 relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <Link
            href="/harajestoon"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base text-center whitespace-nowrap"
          >
            حراجستون
          </Link>

          <div className="flex items-center justify-center sm:justify-end gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden">{item.label.split(" ")[0]}</span>
                </Link>
                {index < navItems.length - 1 && (
                  <span className="text-gray-300 hidden sm:inline">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
