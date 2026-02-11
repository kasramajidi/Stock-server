import ContactBadge from "./ContactBadge";
import ContactCards from "./ContactCards";

export default function ContactHeader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16 items-start lg:items-center">
      <div className="order-1 lg:order-1">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-right leading-tight sm:leading-normal">
          <span style={{ color: '#ff5538' }}>ما اینجاییم تا شبانه روزی</span>{" "}
          <span className="text-brand">پاسخگوی شما باشیم ...</span>
        </h1>
        <div className="text-right text-gray-700 text-[11px] sm:text-xs md:text-sm leading-6 sm:leading-7 md:leading-8 mt-2 sm:mt-0">
          <p className="text-justify sm:text-right">
            ريتكس (RAITX) ارائه‌دهنده خدمات ارزی و پرداخت ارزی است. ما نقد کردن درآمد پی‌پال، پرداخت با مسترکارت، پرداخت هزینه ویزا و سفارت، ثبت نام آزمون‌های بین‌المللی، خرید بلیت هواپیما و هتل و سایر خدمات بین‌المللی را با بهترین نرخ و پشتیبانی ۲۴ ساعته انجام می‌دهیم. برای هر سوال یا درخواست با شماره ۰۲۱-۹۱۳۲۰۷۰۰ یا ایمیل support@mrpremiumhub.org با ما در ارتباط باشید. آدرس ما: تهران، خیابان کارگر شمالی، نبش بزرگراه جلال آل احمد، کوچه چهارم، پلاک ۴۰، طبقه سوم.
          </p>
        </div>
      </div>

      <div className="order-2 lg:order-2 w-full">
        <ContactBadge />
        <ContactCards />
      </div>
    </div>
  );
}

