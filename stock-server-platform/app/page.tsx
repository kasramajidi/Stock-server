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

export default async function Home() {
  const bannerImage = await getBannerImage();

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }} />
      <h1 className="sr-only">استوک سرور - فروش سرور و تجهیزات شبکه</h1>
      <HeroSection bannerImage={bannerImage} />
      <CategoryIcons />
      <SpecialOffers />
      <DLServersSection />
      <section className="bg-white rounded-[18px] mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] mt-6 mb-8 shadow-sm border border-gray-100">
         <DLServersSection />
      </section>
      <section className="mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] mt-6 mb-8">
      <Baner/>
      </section>
      <MemorySection/>
      <MemorySection/>
      <MemorySection/>
      <section className="bg-white rounded-[18px] mx-3 sm:mx-[30px] md:mx-[50px] xl:mx-[50px] mt-6 mb-8 shadow-sm border border-gray-100">
         <ProductsTabsSection/>
         <DLServersSection />

      </section>
      <ConsultConfigBanner />
      <BlogSection />
      <TrustBanner/>

    </main>
  );
}
