import type { Metadata } from "next";
import HeroSection from "@/components/Home/HeroSection/HeroSection";
import CategoryIcons from "@/components/Home/CategoryIcons/CategoryIcons";
import SpecialOffers from "@/components/Home/SpecialOffers/SpecialOffers";
import DLServersSection from "@/components/Home/DLServers/DLServersSection";
import ProductsTabsSection from "@/components/Home/DLServers/ProductsTabsSection";
import ConsultConfigBanner from "@/components/Home/PromotionalBanners/ConsultConfigBanner";
import BlogSection from "@/components/Home/blog/BlogSection";
import TrustBanner from "@/components/Home/TrustBanner/TrustBanner";
import Baner from "@/components/Home/Baner/Baner";
import { webSiteStructuredData, organizationStructuredData } from "@/lib/seo";
import MemorySection from "@/components/Home/memory/MemorySection";
import ScrollArrow from "@/components/Layout/ScrollArrow";

async function getBannerImage() {
  try {
    return null;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت. خرید سرور، تجهیزات شبکه، رم سرور، هارد سرور و پردازنده با گارانتی معتبر.",
  openGraph: {
    title: "استوک سرور | Stock Server - فروش سرور و تجهیزات شبکه",
    description: "فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت",
    url: "/",
  },
  alternates: { canonical: "/" },
};

const sectionClass = "mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] xl:mx-[50px]";

export default async function Home() {
  const bannerImage = await getBannerImage();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }} />
      <h1 className="sr-only">استوک سرور - فروش سرور و تجهیزات شبکه</h1>
      <div className="bg-gray-100 relative mb-3 sm:mb-4 min-h-[260px] sm:min-h-[340px] md:h-[500px] rounded-b-2xl sm:rounded-b-3xl">
        <HeroSection bannerImage={bannerImage} />
        <div className="flex justify-center items-center absolute bottom-0 left-0 right-0 pb-2 sm:pb-3 md:-bottom-12">
          <ScrollArrow direction="down" className="py-0" />
        </div>
      </div>
      <CategoryIcons />
      <SpecialOffers />

      <section className={`${sectionClass} mt-4 mb-6 sm:mt-6 sm:mb-8`}>
        <DLServersSection />
      </section>

      <section className={`${sectionClass} mt-4 mb-6 sm:mt-6 sm:mb-8`}>
        <Baner />
      </section>

      <section className={`${sectionClass} mt-4 mb-6 sm:mt-6 sm:mb-8`}>
        <MemorySection />
      </section>

      <section className={`${sectionClass} mt-4 mb-6 sm:mt-6 sm:mb-8`}>
        <div className="bg-white rounded-2xl sm:rounded-[18px] shadow-sm border border-gray-100 overflow-hidden">
          <ProductsTabsSection />
          <DLServersSection />
        </div>
      </section>

      <ConsultConfigBanner />
      <section className={`${sectionClass} my-8 sm:my-10`}>
        <BlogSection />
      </section>
      <TrustBanner />
    </main>
  );
}
