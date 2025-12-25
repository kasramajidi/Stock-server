import Link from "next/link";

export default function TopBar() {
  const socialLinks = [
    { name: "telegram", href: "#", icon: "📱" },
    { name: "linkedin", href: "#", icon: "💼" },
    { name: "pinterest", href: "#", icon: "📌" },
    { name: "twitter", href: "#", icon: "𝕏" },
    { name: "facebook", href: "#", icon: "📘" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-2 md:py-2.5 z-0 relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-600 hover:text-purple-600 transition-colors text-base sm:text-lg"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-gray-600 text-right flex-1 mr-2 sm:mr-0">
            <span className="hidden sm:inline">
              کلیه سفارش ها در اولین روز کاری بعد از ثبت سفارش تحویل پست داده می
              شوند.
            </span>
            <span className="sm:hidden">تحویل در اولین روز کاری</span>
          </div>
        </div>
      </div>
    </div>
  );
}
