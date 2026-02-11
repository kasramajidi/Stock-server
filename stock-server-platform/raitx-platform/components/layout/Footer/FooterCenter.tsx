"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "کارت های اعتباری", href: "/valid-cards" },
  { label: "پرداخت ارزی", href: "/currency-payment" },
  { label: "اخبار و مقالات", href: "/news" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "درباره ما", href: "/about" },
  { label: "ارتباط با ما", href: "/contact" },
];

export default function FooterCenter() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center space-y-2 md:space-y-3" aria-label="لینک‌های فوتر">
      {footerLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            prefetch={false}
            className={`text-sm md:text-base transition-colors duration-200 ${
              isActive
                ? "text-white font-semibold"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

