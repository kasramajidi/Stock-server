import Link from "next/link";
import { FaWhatsapp, FaTelegram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function ContactSocial() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm flex flex-col justify-center items-center text-center">
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-5 max-w-sm">
        برای اخبار، تخفیف‌ها و پشتیبانی سریع‌تر به کانال‌ها و صفحات ما بپیوندید.
      </p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" aria-label="واتساپ" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#17e2fe] hover:bg-[#14c8e0] flex items-center justify-center transition-colors shadow-sm">
          <FaWhatsapp className="text-white text-xl sm:text-2xl md:text-3xl" />
        </Link>
        <Link href="https://t.me/stock-server" target="_blank" rel="noopener noreferrer" aria-label="تلگرام" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#17e2fe] hover:bg-[#14c8e0] flex items-center justify-center transition-colors shadow-sm">
          <FaTelegram className="text-white text-xl sm:text-2xl md:text-3xl" />
        </Link>
        <Link href="https://youtube.com/your-channel" target="_blank" rel="noopener noreferrer" aria-label="یوتیوب" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#17e2fe] hover:bg-[#14c8e0] flex items-center justify-center transition-colors shadow-sm">
          <FaYoutube className="text-white text-xl sm:text-2xl md:text-3xl" />
        </Link>
        <Link href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer" aria-label="فیسبوک" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-[#17e2fe] hover:bg-[#14c8e0] flex items-center justify-center transition-colors shadow-sm">
          <FaFacebook className="text-white text-xl sm:text-2xl md:text-3xl" />
        </Link>
      </div>
      <Link href="https://t.me/stock-server" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center py-2.5 sm:py-3 px-5 sm:px-6 bg-[#17e2fe] hover:bg-[#14c8e0] text-white text-xs sm:text-sm font-medium rounded-xl transition-colors">
        عضویت در کانال تلگرام
      </Link>
    </div>
  );
}
