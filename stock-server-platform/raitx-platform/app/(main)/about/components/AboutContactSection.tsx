import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

const PHONE = "02191320700";
const EMAIL = "support@mrpremiumhub.org";
const ADDRESS =
  "تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم";

export default function AboutContactSection() {
  return (
    <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full mb-3 sm:mb-4">
          <div className="w-1 h-1 rounded-full bg-orange-500" />
          <span className="text-[10px] sm:text-xs text-orange-600 font-medium">
            راه‌های ارتباطی
          </span>
        </div>
        <h2
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-right"
          style={{ color: "#1a3760" }}
        >
          اطلاعات تماس ريتكس
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white rounded-lg md:rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-3 text-right">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#ff5538" }}
            >
              <HiPhone className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">
                شماره تماس
              </h3>
              <a
                href={`tel:${PHONE}`}
                className="text-gray-600 text-sm hover:text-[#ff5538]"
              >
                ۰۲۱-۹۱۳۲۰۷۰۰
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 text-right">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#ff5538" }}
            >
              <HiMail className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">
                ایمیل پشتیبانی
              </h3>
              <a
                href={`mailto:${EMAIL}`}
                className="text-gray-600 text-sm hover:text-[#ff5538] break-all"
              >
                {EMAIL}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 text-right">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#ff5538" }}
            >
              <HiLocationMarker className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">آدرس</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{ADDRESS}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm min-h-[250px] sm:min-h-[300px]">
          <iframe
            title="نقشه آدرس ريتكس - تهران، کارگر شمالی، جلال آل احمد"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.178!2d51.387!3d35.732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQzJzU1LjIiTiA1McKwMjInMTIuMCJF!5e0!3m2!1sfa!2sir!4v1700000000000!5m2!1sfa!2sir"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "250px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[250px] sm:min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
