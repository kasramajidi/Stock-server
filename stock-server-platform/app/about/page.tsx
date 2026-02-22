import type { Metadata } from "next";
import Link from "next/link";
import AboutHero from "@/components/About/AboutHero/AboutHero";
import AboutStats from "@/components/About/AboutStats/AboutStats";
import AboutTrust from "@/components/About/AboutTrust/AboutTrust";
import AboutTeam from "@/components/About/AboutTeam/AboutTeam";
import AboutTestimonials from "@/components/About/AboutTestimonials/AboutTestimonials";
import AboutArticles from "@/components/About/AboutArticles/AboutArticles";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "استوک سرور — شرکت ماهان شبکه ایرانیان. فروش سرور استوک HP و HPE، قطعات سرور و تجهیزات شبکه با گارانتی و پشتیبانی فنی. درباره ما و خدماتمان بیشتر بدانید.",
  openGraph: { title: "درباره ما | استوک سرور", url: "/about" },
  alternates: { canonical: "/about" },
};

const pageMargin =
  "mx-3 min-[400px]:mx-4 sm:mx-[30px] md:mx-[50px] lg:mx-[50px] header-1080 xl:mx-[50px] header-4k";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={`${pageMargin} pt-6 pb-12 md:pb-20`}>
        <nav className="mb-8 md:mb-10" aria-label="مسیر صفحه">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 flex-wrap">
            <Link
              href="/"
              className="text-slate-600 hover:text-[#0e7490] transition-colors font-medium"
            >
              خانه
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">درباره ما</span>
          </div>
        </nav>

        <AboutHero />

        <div className="mt-16 sm:mt-20 md:mt-24 space-y-20 sm:space-y-24 md:space-y-28">
          <AboutStats />
          <AboutTrust />
          <AboutTeam />
          <AboutTestimonials />
          <AboutArticles />
        </div>
      </div>
    </main>
  );
}
