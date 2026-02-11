"use client";

import { HiCheckCircle } from "react-icons/hi";

const providers = [
  {
    id: "name-com",
    name: "Name.com",
    features: ["رابط مدرن", "ابزارهای مفید", "پشتیبانی فنی"],
  },
  {
    id: "joker",
    name: "Joker.com",
    features: ["تجربه طولانی", "خدمات متنوع", "قابلیت اعتماد"],
  },
  {
    id: "namebounce",
    name: "NameBounce",
    features: ["قیمت مناسب", "تنوع پسوند", "رابط کاربری ساده"],
  },
  {
    id: "google-domains",
    name: "Google Domains",
    features: ["مدیریت آسان", "امنیت بالا", "پشتیبانی 24/7"],
  },
];

export default function DomainProviders() {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6 border border-gray-100">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
        ارائه دهندگان دامنه
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6">
        از معتبرترین سایت‌های دنیا دامنه خریداری کنید
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 text-center">
              {provider.name}
            </h3>
            <ul className="space-y-2">
              {provider.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 justify-start text-xs sm:text-sm text-gray-700"
                >
                  <HiCheckCircle className="text-[#ff5538] shrink-0 text-base" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
