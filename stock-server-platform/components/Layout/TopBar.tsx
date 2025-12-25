import Link from "next/link";

import { FaTelegram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

export default function TopBar() {
  const socialLinks = [
    { name: "telegram", href: "#", icon: <FaTelegram /> },
    { name: "linkedin", href: "#", icon: <FaLinkedinIn /> },
    { name: "pinterest", href: "#", icon: <FaPinterest /> },
    { name: "twitter", href: "#", icon: <FaXTwitter /> },
    { name: "facebook", href: "#", icon: <FaFacebookF /> },
  ];

  return (
    <div className="bg-white border-b rounded-3xl border-gray-200 py-2 md:py-2.5 z-0 relative mx-[60px] md:mx-[80px] lg:mx-[80px] topbar-1080 xl:mx-[80px] topbar-4k md:mt-4">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="text-[10px] sm:text-xs md:text-sm text-[#8d8583] text-right flex-1 mr-2 sm:mr-0">
            <span className="hidden sm:inline">
              کلیه سفارش ها در اولین روز کاری بعد از ثبت سفارش تحویل پست داده می
              شوند.
            </span>
            <span className="sm:hidden">تحویل در اولین روز کاری</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-[#535455] hover:text-[#262728] transition-colors text-sm sm:text-base md:text-lg"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
