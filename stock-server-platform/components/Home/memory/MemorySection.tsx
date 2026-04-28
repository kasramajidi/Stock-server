import MemorySlider from "./MemorySlider";

export default function MemorySection() {
  return (
    <section className="bg-white rounded-[18px] shadow-sm border border-gray-100 w-full p-4 sm:p-6 overflow-visible">

      {/* Header */}
      <div className="flex items-center mb-6">
        <h2 className="text-base font-semibold text-gray-800 border-b-2 border-b-[#00DDFF] pb-1">
          حافظه رم
        </h2>
      </div>

      {/* Slider - فاصله فلش‌ها از کارت در دسکتاپ بیشتر */}
      <div className="relative px-1 sm:px-3 md:px-6 lg:px-10">
        <MemorySlider />
      </div>
    </section>
  );
}
