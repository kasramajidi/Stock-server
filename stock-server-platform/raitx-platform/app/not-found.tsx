import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-gray-50/80 to-white overflow-hidden"
      dir="rtl"
    >
      <div className="max-w-md w-full">
        <p
          className="text-[#ff5538] text-6xl sm:text-8xl font-bold tracking-tight leading-none select-none drop-shadow-sm animate-notfound-scale-in"
          style={{ animationDelay: "0.1s" }}
          aria-hidden
        >
          404
        </p>
        <div
          className="mt-2 h-1 w-16 rounded-full bg-[#ff5538]/40 mx-auto animate-notfound-line origin-center"
          style={{ animationDelay: "0.4s" }}
        />
        <h1
          className="mt-5 text-xl sm:text-2xl font-semibold text-gray-900 animate-notfound-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          صفحه‌ای که دنبالش هستید پیدا نشد
        </h1>
        <p
          className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed animate-notfound-fade-up"
          style={{ animationDelay: "0.65s" }}
        >
          آدرس وارد شده اشتباه است یا این صفحه حذف یا جابه‌جا شده است.
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-notfound-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white bg-[#ff5538] rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff5538] focus:ring-offset-2 shadow-lg shadow-[#ff5538]/20"
          >
            بازگشت به صفحهٔ اصلی
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#ff5538]/30 hover:text-[#ff5538] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            تماس با پشتیبانی
          </Link>
        </div>
        <p
          className="mt-10 text-xs text-gray-400 animate-notfound-fade-up"
          style={{ animationDelay: "1s" }}
        >
          ريتكس | RAITX
        </p>
      </div>
    </section>
  );
}
