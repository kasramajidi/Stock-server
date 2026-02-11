"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  alt?: string;
}

export default function Logo({ 
  alt = "لوگو شرکت"
}: LogoProps) {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center justify-center group transition-opacity hover:opacity-90 cursor-pointer h-full"
      aria-label="صفحه اصلی"
    >
      <div className="relative max-sm:h-18 min-[500px]:max-sm:h-20 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto flex items-center justify-center min-w-[180px] min-[500px]:max-sm:min-w-[200px] sm:min-w-[180px] md:min-w-[220px]">
        <Image
          src="/Images/Logo/Raitx%20international%20payments%20logo%20design%20(1).png"
          alt={alt}
          width={720}
          height={200}
          className="h-full w-auto object-contain object-center"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 300px, (max-width: 1024px) 360px, 440px"
          quality={92}
          priority
        />
      </div>
    </Link>
  );
}

