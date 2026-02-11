"use client";

import Link from "next/link";

interface ExamCard {
  title: string;
  description: string;
}

const exams: ExamCard[] = [
  { title: "University", description: "ثبت مقاله و خوابگاه" },
  { title: "Application Fee", description: "اپلیکیشن فی" },
  { title: "GRE", description: "آزمون GRE" },
  { title: "TOEFL", description: "ثبت نام تافل" },
];

export default function ExamRegistration() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          ثبت نام آزمون‌های بین‌المللی
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">
          پرداخت و ثبت نام آزمون‌های GRE، TOEFL و سایر آزمون‌های بین‌المللی از طریق ريتكس.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {exams.map((exam, index) => (
            <Link
              key={index}
              href="/currency-payment"
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {exam.title}
              </h3>
              <p className="text-xs text-gray-600">{exam.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/currency-payment"
            className="inline-block px-6 py-2.5 bg-[#ff5538] text-white rounded-lg text-sm font-medium hover:opacity-90"
          >
            مشاهده خدمات آزمون و آموزش
          </Link>
        </div>
      </div>
    </section>
  );
}
