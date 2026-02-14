"use client";

export default function ContactForm() {
  return (
    <form
      className="space-y-4 sm:space-y-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            ایمیل
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="ایمیل شما"
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#17e2fe] focus:ring-2 focus:ring-[#17e2fe]/20 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="نام و نام خانوادگی"
            required
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#17e2fe] focus:ring-2 focus:ring-[#17e2fe]/20 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          نظر شما
        </label>
        <textarea
          id="contact-message"
          placeholder="متن نظر"
          required
          rows={5}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#17e2fe] focus:ring-2 focus:ring-[#17e2fe]/20 focus:outline-none resize-none transition-colors"
        />
      </div>
      <div className="flex justify-center pt-1">
        <button
          type="submit"
          className="px-8 py-3.5 rounded-2xl bg-[#17e2fe] hover:bg-[#14c8e0] text-white font-semibold text-sm transition-colors"
        >
          ارسال
        </button>
      </div>
    </form>
  );
}
