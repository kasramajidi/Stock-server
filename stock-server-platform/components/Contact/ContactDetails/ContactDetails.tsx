"use client";

import {
  HiPhone,
  HiClock,
  HiMail,
  HiLocationMarker,
} from "react-icons/hi";
import { HiHashtag } from "react-icons/hi2";

const iconClass = "w-5 h-5 sm:w-6 sm:h-6 text-[#17e2fe] shrink-0";

const items = [
  {
    icon: <HiPhone className={iconClass} />,
    label: "تلفن",
    value: "۰۲۱۲۸۵۳ | ۰۲۱۲۷۶۸۴۰۰۰",
  },
  {
    icon: <HiClock className={iconClass} />,
    label: "ساعات کاری",
    value: "از ساعت ۸ صبح تا ۱۲ شب",
  },
  {
    icon: <HiMail className={iconClass} />,
    label: "ایمیل",
    value: "info@stock-server.ir",
  },
  {
    icon: <HiHashtag className={iconClass} />,
    label: "کد پستی",
    value: "۱۴۵۸۸۳۴۹۵۴",
  },
  {
    icon: <HiLocationMarker className={iconClass} />,
    label: "آدرس",
    value: "تهران، خیابان آزادی، ناحیه نوآوری شریف، بلوار اکبری، ابتدای کوچه اتکا (ناهید)، پلاک ۷، برج فناوری، طبقه پنجم، شرکت استوک سرور",
  },
];

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50/60 border border-gray-100 text-start"
        >
          <span className="mt-0.5">{item.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-500 mb-0.5">{item.label}</p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-words">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
