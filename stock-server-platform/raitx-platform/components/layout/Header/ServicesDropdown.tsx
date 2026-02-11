"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";

interface ServiceItem {
  label: string;
  labelEn?: string;
  href: string;
  icon?: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    label: "کارت های اعتباری",
    href: "/valid-cards",
  },
  {
    label: "پرداخت ارزی",
    href: "/currency-payment",
  },
];

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isActive =
    pathname?.startsWith("/valid-cards") ||
    pathname?.startsWith("/currency-payment");

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center gap-1 text-xs min-[500px]:text-xs md:text-sm lg:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap px-1 md:px-2
          ${
            isActive
              ? "text-[#ff5538] font-bold"
              : "text-gray-700 hover:text-[#ff5538]"
          }
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#ff5538] after:transition-all after:duration-200
          hover:after:w-full
          ${isActive ? "after:w-full" : ""}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        خدمات
        <HiChevronDown
          className={`text-base transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && services.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {services.map((service) => {
            const isServiceActive =
                pathname === service.href ||
                pathname?.startsWith(service.href + "/");
            return (
              <Link
                key={service.href}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-2.5 text-sm transition-colors duration-150
                  ${
                    isServiceActive
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {service.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
