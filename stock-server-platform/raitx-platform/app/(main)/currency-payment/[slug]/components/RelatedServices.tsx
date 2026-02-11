import Link from "next/link";
import { services, Service } from "../../components/servicesData";

interface RelatedServicesProps {
  currentService: Service;
}

export default function RelatedServices({ currentService }: RelatedServicesProps) {
  const relatedServices = services
    .filter((s) => s.category === currentService.category && s.id !== currentService.id);

  if (relatedServices.length === 0) return null;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
        <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
        خدمات مرتبط
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {relatedServices.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-[#ff5538] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="text-gray-600 group-hover:text-[#ff5538] transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#ff5538] transition-colors">
                {service.label}
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 text-right leading-4 sm:leading-5">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

