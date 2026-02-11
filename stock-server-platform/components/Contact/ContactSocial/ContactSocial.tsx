import Link from "next/link";
import { FaWhatsapp, FaTelegram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function ContactSocial() {
  return (
    <div className="flex flex-col justify-center h-full">
      <h3 className="text-base font-bold text-foreground mb-2">
        ما را در شبکه‌های اجتماعی دنبال کنید
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        برای اخبار، تخفیف‌ها و پشتیبانی سریع‌تر به کانال‌ها و صفحات ما بپیوندید.
      </p>
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
        <Link
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="واتساپ"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all hover:border-[var(--primary-hover)] hover:bg-[var(--primary-hover)] hover:text-white"
        >
          <FaWhatsapp className="text-xl sm:text-2xl" />
        </Link>
        <Link
          href="https://t.me/stock-server"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تلگرام"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all hover:border-[var(--primary-hover)] hover:bg-[var(--primary-hover)] hover:text-white"
        >
          <FaTelegram className="text-xl sm:text-2xl" />
        </Link>
        <Link
          href="https://youtube.com/your-channel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="یوتیوب"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all hover:border-[var(--primary-hover)] hover:bg-[var(--primary-hover)] hover:text-white"
        >
          <FaYoutube className="text-xl sm:text-2xl" />
        </Link>
        <Link
          href="https://facebook.com/your-page"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="فیسبوک"
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all hover:border-[var(--primary-hover)] hover:bg-[var(--primary-hover)] hover:text-white"
        >
          <FaFacebook className="text-xl sm:text-2xl" />
        </Link>
      </div>
      <Link
        href="https://t.me/stock-server"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full sm:w-auto justify-center items-center rounded-xl border-2 border-[var(--primary-hover)] bg-transparent py-3 px-5 text-sm font-semibold text-[var(--primary-hover)] transition-all hover:bg-[var(--primary-hover)] hover:text-white"
      >
        عضویت در کانال تلگرام
      </Link>
    </div>
  );
}
