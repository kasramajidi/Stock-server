import MemorySlider from "./MemorySlider";

export default function MemorySection() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-3 sm:mx-[30px] md:mx-[50px] mt-10 mb-10 p-4 sm:p-6">

      {/* Header */}
      <div className="flex items-center mb-6">
        <h2 className="text-base font-semibold text-gray-800 border-b-2 border-b-[#00DDFF] pb-1">
          حافظه رم
        </h2>
      </div>

      {/* Slider */}
      <MemorySlider />
    </section>
  );
}
