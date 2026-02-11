import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero/AboutHero";
import AboutStats from "@/components/About/AboutStats/AboutStats";
import AboutTrust from "@/components/About/AboutTrust/AboutTrust";
import AboutTeam from "@/components/About/AboutTeam/AboutTeam";
import AboutTestimonials from "@/components/About/AboutTestimonials/AboutTestimonials";
import AboutArticles from "@/components/About/AboutArticles/AboutArticles";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "استوک سرور — فروش سرور و تجهیزات شبکه با بهترین قیمت و کیفیت. درباره ما و خدماتمان بیشتر بدانید.",
  openGraph: { title: "درباره ما | استوک سرور", url: "/about" },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-[30px] md:mx-[50px] lg:mx-[50px] xl:mx-[50px] header-1080 header-4k mt-6 mb-12 md:mb-16 space-y-14 sm:space-y-16 md:space-y-20">
        <AboutHero />
        <AboutStats />
        <AboutTrust />
        <AboutTeam />
        <AboutTestimonials />
        <AboutArticles />
      </div>
    </main>
  );
}
