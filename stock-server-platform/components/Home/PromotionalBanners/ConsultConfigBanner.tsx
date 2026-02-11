import Image from "next/image";

export default function ConsultConfigBanner() {
  return (
    <section className="mx-[20px] sm:mx-[30px] md:mx-[50px] my-10">
      <div className="bg-[#062C3D] rounded-xl overflow-hidden flex flex-col md:flex-row items-center">

        {/* Image - Left */}
        <div className="w-full md:w-[40%] flex justify-center">
          <Image
            src="/Images/Baner/Layer 5.png"
            alt="استعلام کانفیگ سرور"
            width={420}
            height={320}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>

        {/* Content - Right */}
        <div className="w-full md:w-[60%] px-6 py-8 text-right">
          <h3 className="text-xl font-semibold text-[#00DDFF] mb-4">
            برای کانفیگ و استعلام قیمت به راهنمایی نیاز دارید؟
          </h3>

          <p className="text-sm text-gray-200 leading-7 mb-6">
            در صورتی که می‌خواهید کانفیگ سرور مناسبی برای نیاز خود دریافت کنید،
            می‌توانید به‌صورت رایگان با کارشناسان فروش ما در تماس باشید.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-2 rounded-lg bg-[#00DDFF] text-[#062C3D] text-sm font-medium hover:bg-[#00c4e6] transition">
              ثبت درخواست
            </button>

            <button className="px-6 py-2 rounded-lg border border-[#00DDFF] text-[#00DDFF] text-sm hover:bg-[#00DDFF]/10 transition">
              تماس با کارشناس
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
