import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { href: "https://www.linkedin.com/company/stock-server", icon: FaLinkedinIn, label: "لینکدین" },
  { href: "https://instagram.com/stock-server", icon: FaInstagram, label: "اینستاگرام" },
  { href: "https://x.com/stock-server", icon: FaXTwitter, label: "ایکس" },
  { href: "https://t.me/stock-server", icon: FaTelegram, label: "تلگرام" },
];

export default function ContactSocial() {
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
      <p className="text-sm text-gray-600 mb-4">
        ما را در شبکه‌های اجتماعی دنبال کنید
      </p>
      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
        {socials.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-[#17e2fe]/10 hover:border-[#17e2fe]/40 hover:text-[#14c8e0] transition-colors"
          >
            <Icon className="text-lg" />
          </Link>
        ))}
      </div>
    </div>
  );
}
