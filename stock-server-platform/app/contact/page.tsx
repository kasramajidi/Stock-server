import type { Metadata } from "next";
import ContactIntro from "@/components/Contact/ContactIntro/ContactIntro";
import ContactFeatures from "@/components/Contact/ContactFeatures/ContactFeatures";
import ContactFormSection from "@/components/Contact/ContactFormSection/ContactFormSection";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "تماس با استوک سرور — فروش سرور و تجهیزات شبکه. شماره تماس، ایمیل، آدرس و فرم تماس.",
  openGraph: { title: "تماس با ما | استوک سرور", url: "/contact" },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div id="contact-us" className="mx-[30px] md:mx-[50px] lg:mx-[50px] xl:mx-[50px] header-1080 header-4k mt-6 mb-12 md:mb-16 space-y-14 sm:space-y-16 md:space-y-20">
        <ContactIntro />
        <ContactFeatures />
        <ContactFormSection />
      </div>
    </main>
  );
}
