"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import MobileServicesMenu from "./MobileServicesMenu";

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

interface MobileMenuProps {
  cartCount?: number;
  isAuthenticated?: boolean;
}

export default function MobileMenu({
  cartCount = 0,
  isAuthenticated = false,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="max-[500px]:flex hidden items-center justify-center relative z-50 w-12 h-12 rounded-lg text-gray-800 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 cursor-pointer shrink-0"
        aria-label="منو"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <HiX className="text-[1.75rem] w-8 h-8" />
        ) : (
          <HiMenu className="text-[1.75rem] w-8 h-8" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 max-[500px]:block hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out max-[500px]:flex hidden flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-end p-4 border-b border-gray-200 shrink-0">
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="بستن منو"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        <nav className="flex flex-col py-4 flex-1 overflow-y-auto min-h-0">
          {navLinks.map((link) => {
            if (link.href === "/services") {
              return <MobileServicesMenu key={link.href} onClose={closeMenu} />;
            }
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`
                  px-6 py-3 text-base font-medium transition-colors duration-200 relative cursor-pointer shrink-0
                  ${
                    isActive
                      ? "text-[#ff5538] bg-[#ff5538]/10 border-r-4 border-[#ff5538] font-bold"
                      : "text-gray-700 hover:text-[#ff5538] hover:bg-[#ff5538]/10"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
          <div className="flex items-center justify-center gap-3">
            <CartIcon cartCount={cartCount} />
            <LoginButton isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </>
  );
}

