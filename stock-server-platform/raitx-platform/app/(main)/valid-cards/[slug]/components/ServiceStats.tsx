"use client";

import { Service } from "../../components/servicesData";
import { HiUsers, HiCheckCircle, HiStar } from "react-icons/hi";

interface ServiceStatsProps {
  service: Service;
}

const stats = [
  {
    icon: <HiUsers className="text-xl sm:text-2xl" />,
    value: "5,000+",
    label: "مشتری راضی",
    color: "text-[#ff5538]",
    bgColor: "bg-[#ff5538]/10",
  },
  {
    icon: <HiCheckCircle className="text-xl sm:text-2xl" />,
    value: "98%",
    label: "رضایت مشتری",
    color: "text-white",
    bgColor: "bg-white/20",
  },
  {
    icon: <HiStar className="text-xl sm:text-2xl" />,
    value: "4.9",
    label: "امتیاز کاربران",
    color: "text-[#ff5538]",
    bgColor: "bg-[#ff5538]/10",
  },
];

export default function ServiceStats({ service }: ServiceStatsProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a3760] to-[#2a4a7a] rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 text-white">
      <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 text-right">
        آمار و ارقام {service.label}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center hover:bg-white/20 transition-all duration-200"
          >
            <div className={`${stat.bgColor} ${stat.color} w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-white/90">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

