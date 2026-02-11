"use client";

import Link from "next/link";

interface CardItem {
  title: string;
  description: string;
  href: string;
}

const premiumAccountItems: CardItem[] = [
  { title: "خرید اکانت هوش مصنوعی", description: "ChatGPT، Midjourney و ابزارهای AI", href: "/currency-payment/ai-account" },
  { title: "خرید اکانت ابزارهای سئو", description: "SEMrush، Ahrefs، MOZ و سایر ابزارها", href: "/currency-payment/seo-account" },
  { title: "خرید اکانت بازی", description: "Xbox، PlayStation، Steam، Epic Games", href: "/currency-payment/game-account" },
  { title: "خرید اکانت نرم‌افزار", description: "اکانت اورجینال نرم‌افزارها", href: "/currency-payment/software-account" },
];

export default function VisaPayments() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          اکانت‌های پریمیوم{" "}
          <Link
            href="/currency-payment"
            className="text-[#ff5538] hover:opacity-80 text-sm md:text-base"
          >
            (جزئیات بیشتر)
          </Link>
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">
          خرید اکانت‌های پریمیوم برای هوش مصنوعی، سئو، بازی و نرم‌افزار از طریق ريتكس با امنیت و بهترین نرخ.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {premiumAccountItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
