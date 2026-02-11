"use client";

import Image from "next/image";

export default function TrustBanner() {
  return (
    <section className="w-full py-8 bg-no-repeat bg-center">
      <h2 className="text-center text-red-600 font-semibold text-lg mb-6">
        مفتخریم به اعتماد شما
      </h2>

      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div
          className="flex items-center gap-10 px-12 overflow-x-auto md:overflow-visible scrollbar-hide"
        >
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
          <Image src="/Images/Category/CPU.png" alt="logo" width={90} height={50} />
        </div>
      </div>
    </section>
  );
}
