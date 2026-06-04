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
    <div className="header-strip bg-white border-b rounded-2xl sm:rounded-3xl border-gray-200 z-0 relative mx-4 min-[400px]:mx-5 sm:mx-8 md:mx-10 lg:mx-14 header-strip-1080 xl:mx-16 2xl:mx-20 min-[1700px]:mx-24 min-[1920px]:mx-28 header-strip-4k mt-3 sm:mt-4 md:mt-4 flex items-center">
      <div className="container mx-auto px-3 min-[400px]:px-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 min-[1700px]:px-14 min-[1920px]:px-16 w-full py-2.5 sm:py-2.5 md:py-2.5">
        <div className="flex items-center justify-center sm:justify-between gap-2 sm:gap-4 min-h-[2rem] sm:min-h-0">
          <div className="hidden sm:block text-[10px] sm:text-xs md:text-sm text-[#8d8583] text-right flex-1 mr-2 sm:mr-0 leading-relaxed">
            <span>
              کلیه سفارش ها در اولین روز کاری بعد از ثبت سفارش تحویل پست داده می
              شوند.
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-2.5 md:gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-[#535455] hover:text-[#17e2fe] transition-colors text-base sm:text-base md:text-lg"
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
