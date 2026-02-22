"use client";

import Link from "next/link";

/**
 * دکمه شناور چت پشتیبانی — دایره فیروزه‌ای با آیکون حباب گفتگو.
 * با کلیک به صفحه چت (/support) می‌رود.
 */
export default function FloatingChatButton() {
  return (
    <Link
      href="/support"
      aria-label="چت پشتیبانی"
      title="چت پشتیبانی"
      className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-cyan-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
    >
      {/* حباب گفتگو با سه نقطه و دم */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden
      >
        <path d="M20 2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2.4l1.6 3.4 1.6-3.4H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H7.6L6 17.4 4.4 14H4V4h16v10z" />
        <circle cx="8.5" cy="9" r="1.15" />
        <circle cx="12" cy="9" r="1.15" />
        <circle cx="15.5" cy="9" r="1.15" />
      </svg>
    </Link>
  );
}
