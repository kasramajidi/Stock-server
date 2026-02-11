"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "اخبار و مقالات", href: "/news" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "درباره ما", href: "/about" },
  { label: "ارتباط با ما", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 min-[500px]:gap-2.5 md:gap-3 lg:gap-5 xl:gap-6 flex-wrap justify-center overflow-visible" aria-label="منوی اصلی">
      {navLinks.map((link) => {
        if (link.href === "/services") {
          return <ServicesDropdown key={link.href} />;
        }
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative text-xs min-[500px]:text-xs md:text-sm lg:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap px-1 md:px-2
              ${isActive 
                ? "text-[#ff5538] font-bold" 
                : "text-gray-700 hover:text-[#ff5538]"
              }
              after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#ff5538] after:transition-all after:duration-200
              hover:after:w-full
              ${isActive ? "after:w-full" : ""}
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

