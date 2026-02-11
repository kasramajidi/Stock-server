import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import { Service } from "../../components/servicesData";

interface ServiceDetailHeaderProps {
  service: Service;
}

export default function ServiceDetailHeader({ service }: ServiceDetailHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
        <Link href="/" className="hover:text-[#ff5538] transition-colors">
          صفحه اصلی
        </Link>
        <span>/</span>
        <Link href="/currency-payment" className="hover:text-[#ff5538] transition-colors">
          پرداخت ارزی
        </Link>
        <span>/</span>
        <span className="text-gray-800">{service.label}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#ff5538]/10 flex items-center justify-center shrink-0">
          <div className="text-[#ff5538]">
            {service.icon}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-right leading-tight mb-1">
            <span style={{ color: '#ff5538' }}>{service.label}</span>
            {service.labelEn && (
              <span className="text-gray-500 text-sm sm:text-base mr-2">
                ({service.labelEn})
              </span>
            )}
          </h1>
          <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm text-right">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

