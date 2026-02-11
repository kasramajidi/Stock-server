"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiAcademicCap, HiHome, HiDocumentText, HiCurrencyDollar } from "react-icons/hi";
import { FaFlag, FaBook, FaUniversity } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { useCart, type CartItem } from "@/app/(main)/context/CartContext";
import {
  createInvoice,
  getLoginPhoneFromStorage,
  normalizePhoneForComparison,
} from "@/app/(main)/my-account/lib/my-account-api";

/** شناسهٔ محصول سفارشی پرداخت دانشجویی در سبد و API (در بک‌اند یک محصول با این id برای «پرداخت دانشجویی با مبلغ دلخواه» تعریف شود) */
const STUDENT_PAYMENT_CUSTOM_SHOP_ID = 999000;

interface StudentPayment {
  id: string;
  title: string;
  description: string;
  titleEn: string;
  bgColor: string;
  iconBg: string;
  icon: React.ReactNode;
  iconColor: string;
}

const studentPayments: StudentPayment[] = [
  {
    id: "dormitory",
    title: "پرداخت خوابگاه دانشجویی",
    description: "پرداخت هزینه اجاره خوابگاه‌های دانشجویی",
    titleEn: "Student Dormitory Payment",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    icon: <HiHome className="text-3xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "application-fee",
    title: "پرداخت اپلیکیشن فی",
    description: "پرداخت هزینه‌های اپلیکیشن دانشگاه‌ها",
    titleEn: "Application Fee Payment",
    bgColor: "bg-gray-50",
    iconBg: "bg-gray-100",
    icon: <HiDocumentText className="text-3xl" />,
    iconColor: "text-gray-700",
  },
  {
    id: "canada-university",
    title: "اپلای دانشگاه‌های کانادا",
    description: "پرداخت هزینه‌های اپلای دانشگاه‌های کانادا",
    titleEn: "Canada University Application",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    icon: <FaFlag className="text-2xl" />,
    iconColor: "text-red-600",
  },
  {
    id: "foreign-books",
    title: "خرید PDF کتاب خارجی",
    description: "خرید کتاب‌های درسی و مراجع خارجی",
    titleEn: "Foreign Book PDF Purchase",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    icon: <FaBook className="text-2xl" />,
    iconColor: "text-green-700",
  },
  {
    id: "wes-payment",
    title: "پرداخت هزینه WES",
    description: "پرداخت هزینه ارزیابی مدارک تحصیلی WES",
    titleEn: "WES Payment",
    bgColor: "bg-gray-50",
    iconBg: "bg-gray-100",
    icon: <MdAssessment className="text-3xl" />,
    iconColor: "text-gray-700",
  },
  {
    id: "tuition-payment",
    title: "پرداخت شهریه دانشگاه",
    description: "پرداخت شهریه دانشگاه‌های خارجی",
    titleEn: "University Tuition Payment",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    icon: <FaUniversity className="text-2xl" />,
    iconColor: "text-blue-700",
  },
];

function makeSyntheticProduct(title: string, price: number): CartItem["product"] {
  return {
    id: STUDENT_PAYMENT_CUSTOM_SHOP_ID,
    name: title,
    price,
    image: "",
    rating: 0,
    reviews: 0,
    isNew: false,
    category: "پرداخت دانشجویی",
    brand: "",
    createdAt: new Date().toISOString().slice(0, 10),
    sales: 0,
    description: "",
  };
}

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "پرداخت هزینه‌های دانشجویی",
  description: "پرداخت تمامی هزینه‌های دانشجویی و تحصیل در خارج از کشور با ريتكس",
  numberOfItems: 6,
  itemListElement: studentPayments.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

export default function StudentPaymentTypes() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async (item: StudentPayment) => {
    const raw = amounts[item.id]?.replace(/\D/g, "") || "0";
    const amount = parseInt(raw, 10);
    if (!amount || amount < 1) {
      setError("لطفاً مبلغ را به دلار وارد کنید.");
      return;
    }
    setError(null);
    setSubmittingId(item.id);
    try {
      const loginPhone = getLoginPhoneFromStorage();
      if (!loginPhone?.trim()) {
        router.push("/auth?next=/currency-payment/student-payment");
        return;
      }
      const userid = normalizePhoneForComparison(loginPhone);
      if (!userid) {
        setError("شماره تماس معتبر یافت نشد.");
        return;
      }
      const ok = await createInvoice([
        {
          shopid: STUDENT_PAYMENT_CUSTOM_SHOP_ID,
          userid,
          quantity: 1,
          isPaid: false,
          paymentStatus: "not payed",
          price: amount,
        },
      ]);
      if (!ok) {
        setError("ثبت سفارش در سامانه انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }
      const product = makeSyntheticProduct(item.title, amount);
      const cartItem: CartItem = {
        product,
        quantity: 1,
        selectedColor: "",
        selectedWarranty: "",
        finalPrice: amount,
      };
      addToCart(cartItem);
      router.push("/cart");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <section
      aria-labelledby="student-payment-types-heading"
      className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h2
        id="student-payment-types-heading"
        className="text-base md:text-lg font-bold text-gray-900 mb-2 text-center"
      >
        پرداخت هزینه‌های دانشجویی
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
        پرداخت تمامی هزینه‌های دانشجویی و تحصیل در خارج از کشور با ريتكس
      </p>
      <p className="text-xs text-gray-500 text-center mb-4">
        برای هر مورد مبلغ (دلار) را وارد کنید و با زدن «افزودن به سبد خرید» به سبد خرید منتقل شوید.
      </p>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
          {error}
        </div>
      )}
      <div
        aria-label="انواع پرداخت‌های دانشجویی"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {studentPayments.map((item) => (
          <div
            key={item.id}
            className={`${item.bgColor} rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col`}
          >
            <div className="flex items-center justify-center mb-5">
              <div
                className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center`}
                aria-hidden
              >
                <span className={item.iconColor}>{item.icon}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 text-center min-h-[48px] flex items-center justify-center">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3 leading-relaxed min-h-[42px]">
              {item.description}
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              {item.titleEn}
            </p>
            <div className="mt-auto pt-3 border-t border-gray-200 space-y-3">
              <label className="block text-xs font-medium text-gray-700 text-right">
                مبلغ (دلار)
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="مثال: ۵۰ یا ۱۰۰"
                value={amounts[item.id] ?? ""}
                onChange={(e) =>
                  setAmounts((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg text-left placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                disabled={submittingId === item.id}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-[#ff5538] hover:bg-[#e54d32] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submittingId === item.id ? "در حال ثبت…" : "افزودن به سبد خرید"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
