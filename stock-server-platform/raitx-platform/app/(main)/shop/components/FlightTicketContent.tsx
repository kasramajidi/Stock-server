"use client";

import React, { useState } from "react";

const FLIGHT_WEBSITES = [
  "aa.com",
  "expedia.com",
  "ongroundshop.telekom.de",
  "airbook.nordwindairlines.ru",
  "book.flyuia.com",
  "booking.csa.cz",
  "butaairways.az",
  "cheapflights.com",
  "cheapOair.com",
  "easyjet.com",
  "Flybe.com",
  "flypgs.com",
  "flysas.com",
  "goeuro.com",
  "norwegian.no",
  "omio.com",
  "onurair.com",
  "qatarairways.com",
  "sita.aero",
  "Sunexpress.com",
  "transavia.com",
  "United.com",
  "utair.ru",
  "vayama.com",
  "vietjetair.com",
  "aegeanair.com",
  "Austrian.com",
  "alitalia.com",
  "airarabia.com",
  "AirAsia.com",
  "airastana.com",
  "aircanada.com",
  "airindia.in",
];

const SECTIONS = [
  {
    id: "websites",
    title: "وبسایت‌های رزرو و خرید بلیط هواپیما خارجی",
    type: "websites" as const,
    intro:
      "وبسایت‌های متعددی برای رزرو بلیط هواپیما وجود دارند که بسته به انتخاب خود می‌توانید یکی را برگزینید. لازم به ذکر است که ريتكس خرید بلیط هواپیما از تمام ایرلاین‌ها را انجام نمی‌دهد. از جمله وبسایت‌هایی که رزرو و خرید اینترنتی بلیط هواپیما خارجی از آن‌ها توسط ريتكس بررسی و انجام می‌شود، شامل موارد زیر است:",
  },
  {
    id: "tips",
    title: "نکات خرید بلیط پرواز خارجی",
    type: "text" as const,
    paragraphs: [
      "تعداد سایت‌هایی که در لیست بالا می‌بینیم و ريتكس می‌تواند از آن‌ها بلیط هواپیمای خارجی خریداری کند، ممکن است تغییر کند. به عنوان مثال ممکن است در یک برهه زمانی، خرید بلیط هواپیما از وبسایتی ممکن نباشد یا در آینده وبسایتی به لیست بالا اضافه شود.",
      "ریفاند مبلغ پرواز خارجی هنگام کنسلی یا تغییر زمان پرواز در شرایط خاصی امکان‌پذیر است که در مطلب لغو بلیط و تغییر زمان پروازهای خارجی در این‌باره بیشتر صحبت کرده‌ایم.",
    ],
  },
  {
    id: "online",
    title: "آیا می‌توانیم بلیط پرواز خارجی را به صورت آنلاین بخریم؟",
    type: "text" as const,
    paragraphs: [
      "بله، خرید اینترنتی بلیط هواپیما از طریق ريتكس امکان‌پذیر است. برای خرید بلیط هواپیما به صورت آنلاین کافی است به پنل کاربری خودتان در ريتكس مراجعه کنید و سفارش خرید بلیط پرواز خارجی را ثبت کنید.",
    ],
  },
  {
    id: "how",
    title: "نحوه خرید بلیط هواپیما از طریق ريتكس چگونه است؟",
    type: "text" as const,
    paragraphs: [
      "برای خرید بلیط پروازهای خارجی خود ابتدا در وبسایت ريتكس حساب کاربری بسازید و در ادامه با استفاده از پنل کاربری خود، سفارش خرید بلیط هواپیما را ثبت کنید. سفارش شما طی ۱ تا ۳ ساعت بررسی می‌شود و در صورت امکان انجام خواهد شد.",
    ],
  },
  {
    id: "refund",
    title: "آیا امکان ریفاند مبلغ بلیط هواپیما خارجی وجود دارد؟",
    type: "text" as const,
    paragraphs: [
      "بله، امکان ریفاند مبلغ پرواز خارجی هنگام کنسلی یا تغییر زمان پرواز در شرایط خاصی وجود دارد. برای استرداد هزینه کنسلی بلیط پرواز ابتدا از طریق پنل کاربری خود در ريتكس ثبت سفارش کنید تا کارشناسان ما سفارش شما را بررسی کنند.",
    ],
  },
];

export default function FlightTicketContent() {
  const [openId, setOpenId] = useState<string | null>("websites");

  return (
    <div className="space-y-3">
      {SECTIONS.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-right hover:bg-gray-50/80 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <h3 className="text-base sm:text-lg font-bold text-[#1a3760] flex-1">
                {section.title}
              </h3>
              <span
                className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#ff5538]/10 text-[#ff5538] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-4 sm:px-5 pb-4 pt-0 border-t border-gray-100">
                {section.type === "websites" && (
                  <>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {section.intro}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {FLIGHT_WEBSITES.map((site) => (
                        <span
                          key={site}
                          className="inline-block px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-200"
                        >
                          {site}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                {section.type === "text" &&
                  "paragraphs" in section &&
                  section.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-700 leading-relaxed mb-3 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
