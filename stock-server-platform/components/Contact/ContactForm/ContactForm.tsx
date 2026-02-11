export default function ContactForm() {
  return (
    <form className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 shadow-sm space-y-3 sm:space-y-4 flex flex-col items-center [&_input:focus]:border-[#17e2fe] [&_input:focus]:ring-1 [&_input:focus]:ring-[#17e2fe] [&_textarea:focus]:border-[#17e2fe] [&_textarea:focus]:ring-1 [&_textarea:focus]:ring-[#17e2fe]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        <input type="text" placeholder="نام" required className="w-full px-3 py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
        <input type="email" placeholder="آدرس ایمیل" required className="w-full px-3 py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        <input type="text" placeholder="موضوع پیام" required className="w-full px-3 py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
        <input type="tel" placeholder="شماره تماس" required className="w-full px-3 py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none text-center" />
      </div>
      <div className="min-h-[100px] sm:min-h-[120px] md:min-h-[140px] w-full">
        <textarea placeholder="پیام شما" required className="w-full h-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px] px-3 py-2.5 text-xs sm:text-sm md:text-base bg-gray-50 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none resize-none text-center" />
      </div>
      <button type="submit" className="w-full max-w-xs py-2.5 sm:py-3 px-4 sm:px-5 bg-[#17e2fe] hover:bg-[#14c8e0] text-white text-xs sm:text-sm md:text-base font-medium rounded-xl transition-colors">
        ارسال پیام
      </button>
    </form>
  );
}
