/**
 * ساختار دسته‌بندی فروشگاه مطابق منوی سایدبار (تایتل + زیرمجموعه با کلیک)
 * برای «انواع گیفت کارت» زیرمجموعه‌ها بر اساس برند فیلتر می‌کنند.
 */

export interface SubItemLink {
  label: string;
  href: string;
}

/** زیرمجموعه‌ای که در فروشگاه فیلتر برند اعمال می‌کند */
export interface SubItemGiftCard {
  label: string;
  brandFilter: string; // مطابق product.brand در productsData
}

export interface MainCategory {
  id: string;
  label: string;
  icon: "currency" | "exams" | "embassy" | "apply" | "giftcards";
  /** لینک «همه خدمات» بالای محتوا */
  allServicesHref?: string;
  /** زیرمجموعه به صورت لیست ساده (لینک به صفحات دیگر) */
  childrenLinks?: SubItemLink[];
  /** زیرمجموعه به صورت گروه‌ها (مثل TOEFL، GRE، سایر) */
  childrenGroups?: { groupLabel: string; items: SubItemLink[] }[];
  /** زیرمجموعه گیفت کارت: هر آیتم = فیلتر برند در فروشگاه */
  childrenGiftCards?: SubItemGiftCard[];
}

export const shopMainCategories: MainCategory[] = [
  {
    id: "currency",
    label: "پرداخت ارزی",
    icon: "currency",
    allServicesHref: "/currency-payment",
    childrenLinks: [
      { label: "پرداخت ارزی با ویزا کارت/مسترکارت", href: "/currency-payment/visa-card" },
      { label: "پرداخت با پی پال (Paypal)", href: "/currency-payment/paypal" },
      { label: "خرید بلیط پرواز خارجی", href: "/shop/product/11" },
      { label: "کنسل کردن/تغییر پرواز خارجی", href: "/currency-payment/flight-change" },
      { label: "اکانت Grammarly Premium", href: "/currency-payment/grammarly" },
      { label: "سایت مگوش (Magoosh)", href: "/currency-payment/magoosh" },
      { label: "سایت زوم (Zoom.us)", href: "/currency-payment/zoom" },
      { label: "اکانت تریدینگ ویو", href: "/currency-payment/tradingview" },
      { label: "رزرو خانه در AirBnb", href: "/currency-payment/airbnb" },
      { label: "رزرو هتل با اکانت Booking.com", href: "/currency-payment/booking" },
      { label: "خرید اکانت کورسرا (Coursera)", href: "/currency-payment/coursera" },
      { label: "خرید اکانت ChatGPT", href: "/currency-payment/chatgpt" },
      { label: "خرید سرور و خدمات هتزنر", href: "/currency-payment/hetzner" },
    ],
  },
  {
    id: "exams",
    label: "آزمون ها",
    icon: "exams",
    allServicesHref: "/currency-payment/international-exam",
    childrenGroups: [
      {
        groupLabel: "TOEFL",
        items: [
          { label: "ثبت نام تافل iBT", href: "/currency-payment/international-exam" },
          { label: "تغییر (Reschedule) آزمون تافل iBT", href: "/currency-payment/international-exam" },
          { label: "ثبت نام تافل iBT هوم ادیشن", href: "/currency-payment/international-exam" },
          { label: "ریپورت نمره تافل iBT", href: "/currency-payment/international-exam" },
          { label: "اعتراض به نمره تافل iBT", href: "/currency-payment/international-exam" },
        ],
      },
      {
        groupLabel: "GRE",
        items: [
          { label: "تغییر زمان/مرکز GRE", href: "/currency-payment/international-exam" },
          { label: "ثبت نام GRE General", href: "/currency-payment/international-exam" },
          { label: "ثبت نام GRE Subject", href: "/currency-payment/international-exam" },
          { label: "اعتراض به نمره GRE", href: "/currency-payment/international-exam" },
          { label: "ثبت نام GRE General Home Edition", href: "/currency-payment/international-exam" },
          { label: "ریپورت نمره GRE", href: "/currency-payment/international-exam" },
        ],
      },
      {
        groupLabel: "سایر",
        items: [
          { label: "ثبت نام CFA", href: "/currency-payment/international-exam" },
          { label: "ثبت نام آیلتس (IELTS) در خارج از کشور", href: "/currency-payment/international-exam" },
          { label: "ثبت نام/عضویت ACCA", href: "/currency-payment/international-exam" },
          { label: "ثبت نام USMLE", href: "/currency-payment/international-exam" },
          { label: "ثبت نام PMP", href: "/currency-payment/international-exam" },
          { label: "ثبت نام IMAT", href: "/currency-payment/international-exam" },
          { label: "ثبت نام آزمون TOLC", href: "/currency-payment/international-exam" },
          { label: "ثبت نام OET", href: "/currency-payment/international-exam" },
          { label: "آزمون پرومتریک (Prometric)", href: "/currency-payment/international-exam" },
          { label: "پرداخت هزینه شرکت در کنفرانس های خارجی", href: "/currency-payment/international-exam" },
          { label: "پرداخت هزینه آزمون ناتی NAATI CCL", href: "/currency-payment/international-exam" },
        ],
      },
      {
        groupLabel: "Duolingo",
        items: [{ label: "ثبت نام دولینگو (Duolingo)", href: "/currency-payment/international-exam" }],
      },
      {
        groupLabel: "GMAT",
        items: [{ label: "ثبت نام GMAT", href: "/currency-payment/international-exam" }],
      },
      {
        groupLabel: "PTE",
        items: [
          { label: "تغییر زمان/مرکز PTE", href: "/currency-payment/international-exam" },
          { label: "ثبت نام PTE", href: "/currency-payment/international-exam" },
          { label: "سایت PTE Practice", href: "/currency-payment/international-exam" },
        ],
      },
    ],
  },
  {
    id: "embassy",
    label: "سفارت ها",
    icon: "embassy",
    allServicesHref: "/currency-payment",
    childrenGroups: [
      {
        groupLabel: "سفارت آمریکا",
        items: [
          { label: "سویس فی (SEVIS Fee)", href: "/currency-payment" },
          { label: "وقت سفارت آمریکا (MRV Fee)", href: "/currency-payment" },
          { label: "هزینه گرین کارت آمریکا", href: "/currency-payment" },
        ],
      },
      {
        groupLabel: "سفارت کانادا",
        items: [
          { label: "لندینگ فی کانادا (RPRF)", href: "/currency-payment" },
          { label: "ارزیابی مدارک پرستاری کانادا (NNAS)", href: "/currency-payment" },
          { label: "اپلیکیشن فی ویزای کانادا (My CIC)", href: "/currency-payment" },
          { label: "هزینه پذیرش کبک (CAQ) کانادا", href: "/currency-payment" },
          { label: "اپلیکیشن فی اسکیل ورکر کانادا", href: "/currency-payment" },
        ],
      },
      {
        groupLabel: "سایر سفارت ها",
        items: [
          { label: "پرداخت ویزای استرالیا", href: "/currency-payment" },
          { label: "وقت مصاحبه ویزای انگلستان", href: "/currency-payment" },
          { label: "اقامت (گرین کارت) دانمارک", href: "/currency-payment" },
          { label: "لاج (Lodge) استرالیا", href: "/currency-payment" },
          { label: "پرداخت ویزای نیوزیلند", href: "/currency-payment" },
          { label: "ویزای آذربایجان (e-visa)", href: "/currency-payment" },
          { label: "وقت سفارت سوئد", href: "/currency-payment" },
          { label: "ویزای الکترونیکی هند", href: "/currency-payment" },
          { label: "بیمه سفارت انگلیس (IHS)", href: "/currency-payment" },
          { label: "ویزای نروژ از VFS", href: "/currency-payment" },
          { label: "پرداخت هزینه مهاجرت فنلاند", href: "/currency-payment" },
        ],
      },
    ],
  },
  {
    id: "apply",
    label: "اپلای",
    icon: "apply",
    allServicesHref: "/currency-payment",
    childrenGroups: [
      {
        groupLabel: "دانشجویی",
        items: [
          { label: "اپلیکیشن فی (Application Fee) دانشگاه", href: "/currency-payment/student-payment" },
          { label: "اپلیکیشن فی دانشگاه های سوئد", href: "/currency-payment/student-payment" },
          { label: "دیپازیت فی (Deposit Fee) دانشگاه", href: "/currency-payment/student-payment" },
          { label: "پرداخت uni-assist آلمان", href: "/currency-payment/student-payment" },
          { label: "پرداخت پست eShipGlobal", href: "/currency-payment/student-payment" },
          { label: "اجاره خوابگاه دانشجویی", href: "/currency-payment/student-payment" },
          { label: "اپلیکیشن فی دانشگاههای انتاریو کانادا", href: "/currency-payment/student-payment" },
          { label: "پرداخت شهریه دانشگاه های خارجی", href: "/currency-payment/student-payment" },
          { label: "پرداخت هزینه اپلیکیشن فی دانشگاه های کانادا", href: "/currency-payment/student-payment" },
        ],
      },
      {
        groupLabel: "سایر",
        items: [
          { label: "عضویت/تمدید IEEE", href: "/currency-payment" },
          { label: "ارزیابی مدارک تحصیلی WES", href: "/currency-payment" },
          { label: "ارزیابی مدارک مهندسین استرالیا", href: "/currency-payment" },
          { label: "عضویت/تمدید عضویت در PMI", href: "/currency-payment" },
          { label: "حق عضویت APEGS", href: "/currency-payment" },
          { label: "پرداخت هزینه ارزیابی مدارک پزشکی استرالیا (AMC)", href: "/currency-payment" },
          { label: "پرداخت اداره بهداشت دبی DHA", href: "/currency-payment" },
        ],
      },
    ],
  },
  {
    id: "giftcards",
    label: "انواع گیفت کارت",
    icon: "giftcards",
    allServicesHref: "/shop",
    childrenGiftCards: [
      { label: "گیفت کارت پلی استیشن", brandFilter: "پلی‌استیشن" },
      { label: "گیفت کارت گوگل پلی", brandFilter: "گوگل پلی" },
      { label: "گیفت کارت اسپاتیفای", brandFilter: "اسپاتیفای" },
      { label: "گیفت کارت ایکس باکس", brandFilter: "ایکس‌باکس" },
      { label: "گیفت کارت مایکروسافت", brandFilter: "مایکروسافت" },
      { label: "گیفت کارت اپل (Apple) آیتونز", brandFilter: "اپل" },
      { label: "گیفت کارت استیم", brandFilter: "استیم" },
      { label: "گیفت کارت نتفلیکس (Netflix)", brandFilter: "نتفلیکس" },
      { label: "گیفت کارت آمازون", brandFilter: "آمازون" },
      { label: "گیفت کارت روبلاکس", brandFilter: "روبلاکس" },
      { label: "خرید تلگرام پرمیوم، شارژ ...", brandFilter: "" },
      { label: "گیفت کارت پابجی (PUBG)", brandFilter: "" },
      { label: "گیفت کارت نینتندو", brandFilter: "" },
      { label: "گیفت کارت دیسکورد", brandFilter: "دیسکورد" },
    ],
  },
];
