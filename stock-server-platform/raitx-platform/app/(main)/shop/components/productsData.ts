export interface Denomination {
  id: string;
  label: string;
  price: number;
}

/** شناسه دسته‌بندی اصلی فروشگاه (مطابق shopCategoriesData یا از API) */
export type MainCategoryId = "currency" | "exams" | "embassy" | "apply" | "giftcards" | "other";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount?: number;
  category: string;
  brand: string;
  createdAt: string | Date;
  sales: number;
  description: string;
  /** دسته‌بندی اصلی برای فیلتر در فروشگاه */
  mainCategoryId: MainCategoryId;
  /** گیفت کارت = انتخاب مبلغ؛ سرویس = فقط تعداد و افزودن به سبد */
  productType?: "gift_card" | "service";
  denominations?: Denomination[];
  /** عکس‌های بخش معرفی محصول (تب معرفی محصول) */
  introductionImages?: string[];
  /** پاراگراف‌های اضافه برای معرفی (در کنار description) */
  introductionParagraphs?: string[];
  /** سوالات و جواب‌های متداول */
  faq?: { question: string; answer: string }[];
  /** در تب معرفی محصول، محتوای مخصوص بلیط پرواز (لیست سایت‌ها + سوالات) نمایش داده شود */
  useFlightTicketIntro?: boolean;
}

export const categories: string[] = [
  "پرداخت ارزی",
  "آزمون ها",
  "سفارت ها",
  "اپلای",
  "انواع گیفت کارت",
];

export const brands: string[] = ["استیم", "گوگل پلی"];

export const products: Product[] = [
  {
    id: 1,
    name: "پرداخت با ویزا کارت / مسترکارت",
    price: 0,
    image: "/Images/Shop/product-pic1.jpg",
    rating: 5,
    reviews: 120,
    isNew: true,
    category: "پرداخت ارزی",
    brand: "ویزا / مسترکارت",
    mainCategoryId: "currency",
    createdAt: "2024-01-15",
    sales: 450,
    description: "پرداخت ارزی با ویزا کارت و مسترکارت برای خریدهای بین‌المللی. از طریق ريتكس.",
    productType: "service",
  },
  {
    id: 2,
    name: "پرداخت با پی پال (PayPal)",
    price: 0,
    image: "/Images/Shop/product-pic2.jpg",
    rating: 5,
    reviews: 98,
    isNew: false,
    category: "پرداخت ارزی",
    brand: "پی پال",
    mainCategoryId: "currency",
    createdAt: "2024-01-10",
    sales: 320,
    description: "پرداخت با پی پال برای سرویس‌های آنلاین و خرید از سایت‌های خارجی. پشتیبانی ۲۴/۷.",
    productType: "service",
  },
  {
    id: 3,
    name: "ثبت نام تافل iBT",
    price: 0,
    image: "/Images/Shop/product-pic3.jpg",
    rating: 5,
    reviews: 210,
    isNew: true,
    category: "آزمون ها",
    brand: "تافل",
    mainCategoryId: "exams",
    createdAt: "2024-01-08",
    sales: 580,
    description: "ثبت نام و پرداخت هزینه آزمون تافل iBT. تحویل فوری و پشتیبانی تخصصی آزمون‌های زبان.",
    productType: "service",
    introductionImages: ["/Images/Shop/product-pic3.jpg"],
    introductionParagraphs: [
      "آزمون تافل iBT یکی از معتبرترین آزمون‌های زبان انگلیسی برای تحصیل و مهاجرت است. از طریق ريتكس می‌توانید ثبت‌نام و پرداخت هزینه آزمون را به‌صورت آنلاین انجام دهید.",
      "پس از ثبت سفارش، اطلاعات و راهنمای لازم برای تکمیل ثبت‌نام در سایت ETS به شما ارائه می‌شود. پشتیبانی ما تا روز آزمون در کنار شماست.",
    ],
    faq: [
      { question: "چقدر طول می‌کشد تا ثبت‌نام تافل تکمیل شود؟", answer: "معمولاً ظرف ۲۴ تا ۴۸ ساعت پس از پرداخت، راهنمای تکمیل ثبت‌نام و لینک ETS برای شما ارسال می‌شود." },
      { question: "آیا می‌توانم تاریخ آزمون را خودم انتخاب کنم؟", answer: "بله. پس از دریافت دسترسی، از طریق پنل ETS می‌توانید مرکز و تاریخ مورد نظر خود را انتخاب کنید." },
      { question: "پشتیبانی چگونه انجام می‌شود؟", answer: "پشتیبانی از طریق تیکت و واتساپ به‌صورت ۲۴/۷ در دسترس است." },
    ],
  },
  {
    id: 4,
    name: "ثبت نام آیلتس",
    price: 0,
    image: "/Images/Shop/product-pic4.jpg",
    rating: 5,
    reviews: 185,
    isNew: false,
    category: "آزمون ها",
    brand: "آیلتس",
    mainCategoryId: "exams",
    createdAt: "2024-01-05",
    sales: 420,
    description: "ثبت نام و پرداخت هزینه آزمون آیلتس در ایران و خارج از کشور. از طریق ريتكس.",
    productType: "service",
  },
  {
    id: 5,
    name: "وقت سفارت آمریکا (MRV Fee)",
    price: 0,
    image: "/Images/Shop/product-pic5.jpg",
    rating: 5,
    reviews: 156,
    isNew: false,
    category: "سفارت ها",
    brand: "سفارت آمریکا",
    mainCategoryId: "embassy",
    createdAt: "2024-01-03",
    sales: 290,
    description: "پرداخت هزینه وقت مصاحبه ویزای آمریکا (MRV). همراه با راهنمایی و پشتیبانی.",
    productType: "service",
  },
  {
    id: 6,
    name: "وقت سفارت کانادا",
    price: 0,
    image: "/Images/Shop/product-pic6.jpg",
    rating: 5,
    reviews: 134,
    isNew: true,
    category: "سفارت ها",
    brand: "سفارت کانادا",
    mainCategoryId: "embassy",
    createdAt: "2024-01-12",
    sales: 210,
    description: "پرداخت هزینه وقت مصاحبه ویزای کانادا و اپلیکیشن فی. خدمات مرتبط با مهاجرت.",
    productType: "service",
  },
  {
    id: 7,
    name: "اپلیکیشن فی دانشگاه",
    price: 0,
    image: "/Images/Shop/product-pic10.png",
    rating: 5,
    reviews: 178,
    isNew: false,
    category: "اپلای",
    brand: "دانشجویی",
    mainCategoryId: "apply",
    createdAt: "2024-01-01",
    sales: 380,
    description: "پرداخت اپلیکیشن فی دانشگاه‌های خارجی. اپلای و پذیرش دانشجویی با پشتیبانی تخصصی.",
    productType: "service",
  },
  {
    id: 8,
    name: "ارزیابی مدارک WES",
    price: 0,
    image: "/Images/Shop/product-pic11.png",
    rating: 5,
    reviews: 95,
    isNew: true,
    category: "اپلای",
    brand: "WES",
    mainCategoryId: "apply",
    createdAt: "2024-01-18",
    sales: 165,
    description: "پرداخت هزینه ارزیابی مدارک تحصیلی WES برای اپلای و مهاجرت تحصیلی.",
    productType: "service",
  },
  {
    id: 9,
    name: "گیفت کارت استیم",
    price: 500000,
    image: "/Images/Shop/product-pic1.jpg",
    rating: 5,
    reviews: 324,
    isNew: true,
    category: "انواع گیفت کارت",
    brand: "استیم",
    mainCategoryId: "giftcards",
    createdAt: "2024-01-15",
    sales: 890,
    description: "گیفت کارت معتبر استیم برای خرید بازی و نرم‌افزار از استور استیم. تحویل فوری پس از پرداخت.",
    productType: "gift_card",
    denominations: [
      { id: "5", label: "۵ دلار", price: 500000 },
      { id: "10", label: "۱۰ دلار", price: 980000 },
      { id: "25", label: "۲۵ دلار", price: 2350000 },
      { id: "50", label: "۵۰ دلار", price: 4600000 },
    ],
  },
  {
    id: 10,
    name: "گیفت کارت گوگل پلی",
    price: 300000,
    image: "/Images/Shop/product-pic2.jpg",
    rating: 5,
    reviews: 512,
    isNew: false,
    category: "انواع گیفت کارت",
    brand: "گوگل پلی",
    mainCategoryId: "giftcards",
    createdAt: "2024-01-10",
    sales: 1200,
    description: "گیفت کارت گوگل پلی برای خرید اپ، بازی و محتوای دیجیتال از پلی استور. تحویل فوری.",
    productType: "gift_card",
    denominations: [
      { id: "10", label: "۱۰ دلار", price: 980000 },
      { id: "25", label: "۲۵ دلار", price: 2350000 },
      { id: "50", label: "۵۰ دلار", price: 4600000 },
    ],
  },
  {
    id: 11,
    name: "خرید بلیط پرواز خارجی",
    price: 0,
    image: "",
    rating: 5,
    reviews: 156,
    isNew: true,
    category: "پرداخت ارزی",
    brand: "بلیط پرواز",
    mainCategoryId: "currency",
    createdAt: "2024-01-20",
    sales: 180,
    description: "رزرو و خرید بلیط هواپیما خارجی از وبسایت‌های معتبر؛ لیست سایت‌ها، نحوه خرید آنلاین و ریفاند. ريتكس.",
    productType: "service",
    useFlightTicketIntro: true,
  },
];
