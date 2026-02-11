import { Service } from "../../components/servicesData";

const UAE_AMOUNTS = [5, 10, 15, 20, 50, 100];
const USA_AMOUNTS = [10, 20, 30, 40, 50, 60, 75, 100];
const XBOX_AMOUNTS = [5, 10, 15, 20, 50, 100];
const STEAM_AMOUNTS = [1.2, 2.4, 3.8, 5, 10, 20, 50, 100];
const BATTLENET_AMOUNTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const VISA_VIRTUAL_AMOUNTS = [1, 25, 50, 100];
const MASTERCARD_US_VIRTUAL_AMOUNTS = [5, 10, 20, 50, 100, 300];
const MASTERCARD_VIRTUAL_AMOUNTS = [5, 10, 15, 20, 50, 100, 200];
const GIFT_CARD_VISA_AMOUNTS = [10, 20, 25, 50, 100, 200, 500];
const AMAZON_AMOUNTS = [5, 10, 15, 25, 50, 100];
const APPLE_AMOUNTS = [5, 10, 15, 25, 50, 100, 300];
const SPOTIFY_AMOUNTS = [10, 30, 60];
const NETFLIX_AMOUNTS = [25, 30, 60, 100];

const UPGRADE_MESSAGE =
  "مبلغ نمایش‌داده‌شده معادل ۵ دلار می‌باشد؛ جهت افزایش مبلغ، می‌توانید از طریق سبد خرید نسبت به ارتقا اقدام فرمایید.";
const UPGRADE_MESSAGE_1 =
  "مبلغ نمایش‌داده‌شده معادل ۱ دلار می‌باشد؛ جهت افزایش مبلغ، می‌توانید از طریق سبد خرید نسبت به ارتقا اقدام فرمایید.";
const UPGRADE_MESSAGE_1_2 =
  "مبلغ نمایش‌داده‌شده معادل ۱٫۲ دلار می‌باشد؛ جهت افزایش مبلغ، می‌توانید از طریق سبد خرید نسبت به ارتقا اقدام فرمایید.";
const UPGRADE_MESSAGE_10 =
  "مبلغ نمایش‌داده‌شده معادل ۱۰ دلار می‌باشد؛ جهت افزایش مبلغ، می‌توانید از طریق سبد خرید نسبت به ارتقا اقدام فرمایید.";
const UPGRADE_MESSAGE_25 =
  "مبلغ نمایش‌داده‌شده معادل ۲۵ دلار می‌باشد؛ جهت افزایش مبلغ، می‌توانید از طریق سبد خرید نسبت به ارتقا اقدام فرمایید.";

interface PlayStationDenominationsBoxProps {
  service: Service;
}

function AmountList({ amounts }: { amounts: number[] }) {
  return (
    <ul className="space-y-2 text-right">
      {amounts.map((amount) => (
        <li
          key={amount}
          className="text-xs sm:text-sm text-gray-700 py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-[#ff5538]/5 border border-transparent hover:border-[#ff5538]/20 transition-colors"
        >
          {amount.toLocaleString("fa-IR")} دلار
        </li>
      ))}
    </ul>
  );
}

export default function PlayStationDenominationsBox({
  service,
}: PlayStationDenominationsBoxProps) {
  if (service.id === "playstation") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت پلی استیشن
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4 text-right">
              گیفت کارت پلی استیشن امارات (UAE)
            </h3>
            <AmountList amounts={UAE_AMOUNTS} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4 text-right">
              گیفت کارت پلی استیشن آمریکا (USA)
            </h3>
            <AmountList amounts={USA_AMOUNTS} />
          </div>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "xbox") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت ایکس باکس
        </h2>
        <AmountList amounts={XBOX_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "steam") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت استیم
        </h2>
        <AmountList amounts={STEAM_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_1_2}
        </p>
      </div>
    );
  }

  if (service.id === "battlenet") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت بتل نت
        </h2>
        <AmountList amounts={BATTLENET_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_10}
        </p>
      </div>
    );
  }

  if (service.id === "visa-virtual") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ ویزا کارت مجازی
        </h2>
        <AmountList amounts={VISA_VIRTUAL_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_1}
        </p>
      </div>
    );
  }

  if (service.id === "mastercard-us-virtual") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ مسترکارت مجازی آمریکا
        </h2>
        <AmountList amounts={MASTERCARD_US_VIRTUAL_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "mastercard-virtual") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ مسترکارت مجازی
        </h2>
        <AmountList amounts={MASTERCARD_VIRTUAL_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "gift-card-visa") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت ویزا
        </h2>
        <AmountList amounts={GIFT_CARD_VISA_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_10}
        </p>
      </div>
    );
  }

  if (service.id === "amazon") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت آمازون
        </h2>
        <AmountList amounts={AMAZON_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "apple") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت اپل
        </h2>
        <AmountList amounts={APPLE_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE}
        </p>
      </div>
    );
  }

  if (service.id === "spotify") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت اسپاتیفای
        </h2>
        <AmountList amounts={SPOTIFY_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_10}
        </p>
      </div>
    );
  }

  if (service.id === "netflix") {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded" />
          مبالغ گیفت کارت نتفلیکس
        </h2>
        <AmountList amounts={NETFLIX_AMOUNTS} />
        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 text-right">
          برای ثبت سفارش مبلغ مورد نظر از باکس سمت چپ استفاده کنید.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-2 text-right bg-[#ff5538]/5 border-r-4 border-[#ff5538] py-2 px-3 rounded">
          {UPGRADE_MESSAGE_25}
        </p>
      </div>
    );
  }

  return null;
}
