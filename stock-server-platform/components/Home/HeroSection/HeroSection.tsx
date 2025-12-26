import Image from "next/image";

interface HeroSectionProps {
  bannerImage?: string | null;
  bannerAlt?: string;
}

export default function HeroSection({
  bannerImage,
  bannerAlt = "بنر استوک سرور - فروش سرور و تجهیزات شبکه",
}: HeroSectionProps) {
  const defaultBanner = "/Images/Baner/Layer 5.png";
  const imageSrc = bannerImage || defaultBanner;

  return (
    <section
      className="relative overflow-hidden rounded-3xl mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k mt-4"
      aria-label="بخش اصلی - بنر استوک سرور"
    >
      <div className="relative w-full h-[100px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[309px]">
        <Image
          src={imageSrc}
          alt={bannerAlt}
          fill
          priority
          quality={95}
          sizes="(max-width: 640px) calc(100vw - 60px), (max-width: 768px) calc(100vw - 100px), (max-width: 1080px) calc(100vw - 100px), (max-width: 1440px) calc(100vw - 100px), 2400px"
        />
      </div>
    </section>
  );
}
