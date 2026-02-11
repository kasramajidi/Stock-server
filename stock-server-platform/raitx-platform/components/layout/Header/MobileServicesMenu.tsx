"use client";

import { useState } from "react";
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

interface MobileServicesMenuProps {
  onClose: () => void;
}

export default function MobileServicesMenu({
  onClose,
}: MobileServicesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive =
    pathname?.startsWith("/valid-cards") ||
    pathname?.startsWith("/currency-payment");

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-6 py-3 text-base font-medium transition-colors duration-200 relative cursor-pointer
          ${
            isActive
              ? "text-[#ff5538] bg-[#ff5538]/10 border-r-4 border-[#ff5538] font-bold"
              : "text-gray-700 hover:text-[#ff5538] hover:bg-[#ff5538]/10"
          }
        `}
      >
        <span>خدمات</span>
        <HiChevronDown
          className={`text-xl transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && services.length > 0 && (
        <div className="bg-gray-50">
          {services.map((service) => {
            const isServiceActive =
              pathname === service.href ||
              pathname?.startsWith(service.href + "/");
            return (
              <Link
                key={service.href}
                href={service.href}
                onClick={handleClose}
                className={`
                  block px-10 py-3 text-sm transition-colors duration-150
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
