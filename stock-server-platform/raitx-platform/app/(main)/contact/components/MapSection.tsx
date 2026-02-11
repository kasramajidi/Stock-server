import Link from "next/link";
import { FaWhatsapp, FaTelegram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function MapSection() {
  return (
    <div className="order-2 lg:order-2 min-h-[300px] sm:min-h-[300px] md:h-[350px] flex flex-col justify-between gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 flex-wrap mb-2 sm:mb-3">
        <h2 className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600 text-right w-full sm:w-auto">
          ما را در شبکه های اجتماعی دنبال کنید
        </h2>
        <div className="flex gap-1.5 flex-wrap">
          <Link
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaWhatsapp className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://t.me/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaTelegram className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://youtube.com/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaYoutube className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://facebook.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaFacebook className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
        </div>
      </div>

        <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-0 flex flex-col">
        {/* آدرس و لینک نقشه — اگر iframe لود نشد، این بخش همیشه قابل استفاده است */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <p className="text-sm font-medium text-gray-800 text-right mb-1">آدرس</p>
          <p className="text-xs text-gray-600 text-right leading-relaxed">
            تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم
          </p>
        </div>
        {/* نقشه: تهران، کارگر شمالی، نبش جلال آل احمد، کوچه چهارم، پلاک ۴۰ */}
        <div className="relative flex-1 min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
          <iframe
            title="نقشه آدرس ريتكس - تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰"
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.382%2C35.728%2C51.392%2C35.736&layer=mapnik&marker=35.732%2C51.387"
            width="100%"
            height="100%"
            style={{ border: 0, position: "absolute", inset: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[200px]"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=35.732%2C51.387"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-3 text-sm font-medium text-white bg-[#ff5538] hover:bg-[#ff5538]/90 transition-colors"
        >
          باز کردن در نقشه و مسیریابی
        </a>
      </div>
    </div>
  );
}

