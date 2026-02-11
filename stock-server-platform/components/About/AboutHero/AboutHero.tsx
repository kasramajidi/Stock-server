import Image from "next/image";
import Link from "next/link";
import { HiPlay } from "react-icons/hi";

export default function AboutHero() {
  return (
    <section className="relative">
      <div className="relative w-full h-[200px] min-[400px]:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
        <Image src="/Images/Baner/Layer 5.png" alt="درباره استوک سرور" fill className="object-cover object-center" quality={90} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-3 sm:px-4 md:px-6">
          <p className="text-[#17e2fe] text-[10px] min-[400px]:text-xs sm:text-sm md:text-base font-medium tracking-wide mb-1.5 sm:mb-2">فروش سرور و تجهیزات شبکه</p>
          <h1 className="text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow leading-tight">همه‌چیز درباره استوک سرور</h1>
        </div>
      </div>
      <div className="relative -mt-5 sm:-mt-6 md:-mt-8 mx-3 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 md:p-6 lg:p-8">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-center sm:text-right mb-4 sm:mb-5 md:mb-6 max-w-3xl mx-auto sm:ms-auto sm:me-0">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است. استوک سرور سال‌هاست در حوزه فروش سرور و قطعات سرور فعالیت می‌کند.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
          <button type="button" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[#17e2fe] hover:bg-[#14c8e0] text-white rounded-xl text-xs sm:text-sm md:text-base font-medium transition-colors">
            <HiPlay className="text-sm sm:text-base" />
            ویدئو معرفی
          </button>
          <Link href="/contact" className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border-2 border-[#17e2fe] text-[#17e2fe] rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all hover:bg-[#17e2fe] hover:text-white">
            تماس با ما
          </Link>
        </div>
      </div>
    </section>
  );
}
